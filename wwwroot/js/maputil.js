// 起始照片
let page = 0;
let likes = {}
let collects = {}
let popoutpostdata = null;
//一個infowindow綁訂一個marker實現各自獨立開關  
let iWindow = [];
let marker = [];
let nowTime;
function getlocatemylocationexplore() {
	return new Promise(function(res, rej) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					console.log("success")
					res(pos);
				},
				() => {
					res({ lat: 24.1784573, lng: 120.6162033 });
					console.log("fail")
				}
			);
		} else {
			// Browser doesn't support Geolocation
			console.log("YOUR SYSTEM NOT SUPPORT LOCATION FUNCTION")
		}
	});
}


// 建立Script物件
$(".mapload").on("click", async function() {
	let mylocationexplore = await getlocatemylocationexplore();
	var script = document.createElement('script');
	script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD0DR7eU5D7IM-SVlE1MNk3QLdpSYgD77I&callback=initMap';
	script.async = true;


	// 將callbackfunction綁定
	let map
	window.initMap = async function() {

		const { Map } = await google.maps.importLibrary("maps");
		//用來找id="map"並初始化地圖
		map = await new Map(document.getElementById("map"), {
			//地圖中心位置
			center: {
				//緯度
				lat: mylocationexplore.lat,
				//經度
				lng: mylocationexplore.lng
			},
			//縮放比
			zoom: 14,
			// 移除左上地圖類型選擇
			mapTypeControl: false,
			// 添加客製style
			styles: [
				{
					"featureType": "road.arterial",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road.local",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},

			]

		});

		let datas = await $.get(`/morganexploremap/${mylocationexplore.lat}/${mylocationexplore.lng}/3`);
		if (datas.data.length != 0) {
			addMarker(datas.data, map);
		}
		$(".mapload").off("click");
		$(".mapswitch").on("click", function() {
			window.removeEventListener("scroll", loadnew);
		})
	}

	// 把script element貼到head區
	document.head.appendChild(script);
})


function addMarker(datas, map) {

	for (let i = 0; i < datas.length; i++) {

		//標記的座標
		let placeLoc = {
			lat: datas[i].lat,
			lng: datas[i].lng,
		};
		//繪製標記
		marker[i] = new google.maps.Marker({
			position: placeLoc, //座標
			map: map, //地圖DOM
			//icon: iconUrl, //標記圖
		});
		iWindow[i] = new google.maps.InfoWindow({ disableAutoPan: true });
		let content = `<div class='mappost' id="map${datas[i].postId}"><img style='width: 50px;border-radius: 50%;' src='${datas[i].img}'><p>@${datas[i].userAccount}</p></div>`
		iWindow[i].setContent(content);




		//使marker可以點擊 觸發infowindow 生成框 設定內容
		google.maps.event.addListener(marker[i], 'click', function() {
			iWindow[i].open(map, marker[i]);
		});

		// 使infowindow初始開啟

		iWindow[i].open({
			anchor: marker[i],
			shouldFocus: false,
		});


	};


	//	新增事件監聽
	google.maps.event.addListener(iWindow[datas.length - 1], 'domready', function() {

		$(".mappost").css("cursor", "pointer");
		$(".mappost").on("click", async function() {
			likes.postContextId = parseInt($(this).prop("id").substring($(this).prop("id").indexOf("p") + 1));

			collects.postID = likes.postContextId;
			let res = await $.get(`/morganpopout/${likes.postContextId}`);
			popoutpostdata = res.data;
			if (popoutpostdata.postimg.length > 1) {
				$("#poppostrightarr").css("visibility", "visible");
			}
			$("#postaccount").attr("href", `/personalPageForOthers-${popoutpostdata.accountname}`)
			$("#postblockimg").prop("src", popoutpostdata.postimg[page]);
			$("#poppostaccountimg").prop("src", popoutpostdata.acconticon);

			$("#poppostaccountname").text(`@${popoutpostdata.accountname}`);
			$("#popposterimg").prop("src", popoutpostdata.acconticon);
			$("#popposteraccount").text(`@${popoutpostdata.accountname}`);
			$("#poppostertext").html(`${popoutpostdata.posttext}`);
			let minbefore = (new Date() - new Date(popoutpostdata.posttime)) / (1000 * 60);
			$("#poppostertime").text(`${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
				Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
					Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
						Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
							Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
								Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}`);
			popoutpostdata.postMessage.map((ele) => {
				if (ele.commentuicon != null) {
					minbefore = (new Date() - new Date(ele.commenttime)) / (1000 * 60);
					$("#posttextblock").append(
						`<li class="posttextblockcontext dynamiccomments">
    <div class="posttextimgblock">
                            <img class="posttextimg"
                                src="${ele.commentuicon}">
                        </div>
                        <div class="posttextaccount">
                            <a href="#" role="link" tabindex="0">@${ele.commentaccount}</a>
                        </div>
                        <div class="posttextpost">
                            <span>${ele.comment}</span>
                            <br>
                            <span class="posttextposttime">${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
							Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
								Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
									Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
										Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
											Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}</span>
                            <hr>
                        </div>
    </li>    
    `
					)
				}

			})
			$("#poppostlike").addClass(popoutpostdata.liked ? "bi-heart-fill" : "bi-heart").removeClass(popoutpostdata.liked ? "bi-heart" : "bi-heart-fill");
			$("#poppostcollect").addClass(popoutpostdata.collected ? "bi-bookmark-fill" : "bi-bookmark").removeClass(popoutpostdata.collected ? "bi-bookmark" : "bi-bookmark-fill");
			$("#popposttotallike").text(`${popoutpostdata.totallike}人說讚`);
			minbefore = (new Date() - new Date(popoutpostdata.latestliketime)) / (1000 * 60);
			if (popoutpostdata.latestliketime != null) {
				$("#poppostlatestlikettime").text(`${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
					Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
						Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
							Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
								Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
									Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}`);
			} else {
				$("#poppostlatestlikettime").text("");
			}

			$("#postbackground").show();
		});
	});
}


//	PopOutPostFunction
async function popitout() {
	likes.postContextId = parseInt($(this).prop("id").substring($(this).prop("id").indexOf("t") + 1)) || $(this).data("pop-id");
	collects.postID = likes.postContextId;
	let res = await $.get(`/morganpopout/${likes.postContextId}`);
	popoutpostdata = res.data;
	if (popoutpostdata.postimg.length > 1) {
		$("#poppostrightarr").css("visibility", "visible");
	}
	$("#postaccount").attr("href", `/personalPageForOthers-${popoutpostdata.accountname}`)
	$("#postblockimg").prop("src", popoutpostdata.postimg[page]);
	$("#poppostaccountimg").prop("src", popoutpostdata.acconticon);

	$("#poppostaccountname").text(`@${popoutpostdata.accountname}`);
	$("#popposterimg").prop("src", popoutpostdata.acconticon);
	$("#popposteraccount").text(`@${popoutpostdata.accountname}`);
	$("#poppostertext").html(`${filterXSS(popoutpostdata.posttext)}`);
	let minbefore = (new Date() - new Date(popoutpostdata.posttime)) / (1000 * 60);
	$("#poppostertime").text(`${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
		Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
			Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
				Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
					Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
						Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}`);
	popoutpostdata.postMessage.map((ele) => {
		if (ele.commentuicon != null) {
			minbefore = (new Date() - new Date(ele.commenttime)) / (1000 * 60);
			$("#posttextblock").append(
				`<li class="posttextblockcontext dynamiccomments">
    <a href="/personalPageForOthers-${ele.commentaccount}" class="posttextimgblock">
                            <img class="posttextimg"
                                src="${ele.commentuicon}">
                        </a>
                        <div class="posttextaccount">
                            <a href="/personalPageForOthers-${ele.commentaccount}" role="link" tabindex="0">@${ele.commentaccount}</a>
                        </div>
                        <div class="posttextpost">
                            <span>${filterXSS(ele.comment)}</span>
                            <br>
                            <span class="posttextposttime">${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
					Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
						Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
							Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
								Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
									Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}</span>
                            <hr>
                        </div>
    </li>    
    `
			)
		}

	})
	$("#poppostlike").addClass(popoutpostdata.liked ? "bi-heart-fill" : "bi-heart").removeClass(popoutpostdata.liked ? "bi-heart" : "bi-heart-fill");
	$("#poppostcollect").addClass(popoutpostdata.collected ? "bi-bookmark-fill" : "bi-bookmark").removeClass(popoutpostdata.collected ? "bi-bookmark" : "bi-bookmark-fill");
	$("#popposttotallike").text(`${popoutpostdata.totallike}人說讚`);
	$("body").css("overflow-y", 'hidden'); // 把右邊滾輪隱藏
	minbefore = (new Date() - new Date(popoutpostdata.latestliketime)) / (1000 * 60);
	if (popoutpostdata.latestliketime != null) {
		$("#poppostlatestlikettime").text(`${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
			Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
				Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
					Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
						Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
							Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}`);
	} else {
		$("#poppostlatestlikettime").text("");
	}

	// 後端也會檔，所以前端檔的比較粗略
	if( $("#userName").text() == $("#popposteraccount").text() ){
		$("#popposterdelete").show();
	}
	else{
		$("#popposterdelete").hide();
	}

	$("#postbackground").show();

	if($("#inform").hasClass("show")){
		$("#inform").offcanvas("hide");
		$("#postbackground").one("click", function(){
			$("#inform").offcanvas("show");
		});
	}

	// 重新綁定刪除貼文的按鈕
	$(`#popposterdelete`).off('click');
	$(`#popposterdelete`).on('click',function(){

		$.ajax({
			type: "delete",  
			url: `/morgandeletepost/${likes.postContextId}`, 
			success: function(res){  
				if(res.flag){
					$("#postbackground").click();
					location.reload();
				}
				else{
					alert("這不是你的貼文！"); 
				}
			},
			error: function() { 
				alert("無法刪除貼文！請檢查網路。"); 
			}     
		})
	});	
	
}



let pagenow = 1;
let uploadamount = 3;
let noPrefer = false;
let lastNum; //看最後回傳是0,1,2哪個
let pagenoprefer = 1
//貼上block
$(async function() {
	nowTime = Date();
	let uploadsh = document.documentElement.scrollHeight;
	let uploadch = document.documentElement.clientHeight;
	while (uploadsh == uploadch) {
		let datas
		if (noPrefer == false) {
			datas = await $.get(`/morganexplorepost/${pagenow}/${uploadamount}/${nowTime}`);
			if (datas.data.length < 3) {

				lastNum = datas.data.length; //紀錄最後一筆data數
				let tempdatas = await $.get(`/morganexplorepostnoprefer/${pagenoprefer}/${3 - lastNum}/${lastNum}/${nowTime}`);
				let temparray = [];
				datas.data.map((ele) => {
					temparray.push(ele);
				});
				tempdatas.data.map((ele) => {
					temparray.push(ele);
				});

				datas.data = temparray;
				pagenoprefer++;
				noPrefer = true;
			}
			pagenow++
		} else {
			datas = await $.get(`/morganexplorepostnoprefer/${pagenoprefer}/${uploadamount}/${lastNum}/${nowTime}`);
			pagenoprefer++
		}

		// 貼上貼文圖片及喜歡和留言數
		if (datas.data.length != 0) {

			datas.data.map((ele) => {

				$("#Post").append(`
  <div class="postBlock" id="post${ele.postId}">
      <img class="postimg" src="${ele.img}">
      <div class="posttag">
                  <span id="heart${ele.postId}"><i class="bi bi-heart"></i> ${ele.likes}</span>
                  <span>&nbsp;&nbsp;</span>
                  <span id="mesg${ele.postId}"><i class="bi bi-chat-dots"></i> ${ele.message}</span>
      </div>
  </div>
  `);
			});

			uploadsh = document.documentElement.scrollHeight;
			uploadch = document.documentElement.clientHeight;
		} else {
			break;
		}
	}


	//探索頁面程式碼
	$(".postBlock").on("click", popitout);

	


	$("#postpopblock").on("click", function(event) {
		event.stopPropagation();
	});
	$("#postbackground").on("click", function() {
		document.getElementById("posttext").scrollTop = 0;
		$("#poppostrightarr").css("visibility", "hidden");
		$("#poppostleftarr").css("visibility", "hidden");
		$("body").css("overflow-y", "auto");	// 把右邊滾輪回復回去
		page = 0;
		popoutpostdata = null;
		$(".dynamiccomments").remove();
		$("#postbackground").hide();


	});
	// 輪播

	$("#poppostrightarr").click(function() {
		if (page < popoutpostdata.postimg.length - 1) {
			page += 1;
			$("#postblockimg").prop("src", popoutpostdata.postimg[page]);
			if (page == popoutpostdata.postimg.length - 1) {
				$("#poppostrightarr").css("visibility", "hidden")
			} else {
				$("#poppostrightarr").css("visibility", "visible")
			}
			if (page == 0) {
				$("#poppostleftarr").css("visibility", "hidden")
			} else {
				$("#poppostleftarr").css("visibility", "visible")
			}
		}
	})
	$("#poppostleftarr").click(function() {
		if (page > 0) {
			page -= 1;
			$("#postblockimg").prop("src", popoutpostdata.postimg[page]);
			if (page == 0) {
				$("#poppostleftarr").css("visibility", "hidden")
			} else {
				$("#poppostleftarr").css("visibility", "visible")
			}
			if (page == popoutpostdata.postimg.length - 1) {
				$("#poppostrightarr").css("visibility", "hidden")
			} else {
				$("#poppostrightarr").css("visibility", "visible")
			}
		}
	})


	// 共用點擊事件
	$("#poppostlike").click(async function() {
		if (popoutpostdata.liked) {
			let res = $.ajax({
				url: "/morganpopoutliked",
				type: "DELETE",
				contentType: "application/json",
				data: JSON.stringify(likes),
				success: async function() {
					let datas = await $.get(`/morganpopoutliked/${likes.postContextId}`);

					$("#popposttotallike").text(`${datas.data[0][0]}人說讚`);
					$(`#heart${likes.postContextId}`).html(`<i class="bi bi-heart"></i> ${datas.data[0][0]}`);
					console.log(`heart${likes.postContextId}`);
					minbefore = (new Date() - new Date(datas.data[0][1])) / (1000 * 60);
					if (datas.data[0][1] != null) {
						$("#poppostlatestlikettime").text(`${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
							Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
								Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
									Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
										Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
											Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}`);
					} else {
						$("#poppostlatestlikettime").text("");
					}
				}
			});
			popoutpostdata.liked = 0;
		} else {
			let res = $.ajax({
				url: "/morganpopoutliked",
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(likes),
				success: async function() {
					let datas = await $.get(`/morganpopoutliked/${likes.postContextId}`);
					$("#popposttotallike").text(`${datas.data[0][0]}人說讚`);
					$(`#heart${likes.postContextId}`).html(`<i class="bi bi-heart"></i> ${datas.data[0][0]}`);
					minbefore = (new Date() - new Date(datas.data[0][1])) / (1000 * 60);
					if (datas.data[0][1] != null) {
						$("#poppostlatestlikettime").text(`${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
							Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
								Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
									Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
										Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
											Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}`);
					} else {
						$("#poppostlatestlikettime").text("");
					}
				}
			});

			popoutpostdata.liked = 1;
		}

		$("#poppostlike").addClass(popoutpostdata.liked ? "bi-heart-fill" : "bi-heart").removeClass(popoutpostdata.liked ? "bi-heart" : "bi-heart-fill");
	})
	$("#poppostcollect").click(function() {
		if (popoutpostdata.collected) {
			let res = $.ajax({
				url: "/morganpopoutcollected",
				type: "DELETE",
				contentType: "application/json",
				data: JSON.stringify(collects)
			});
			popoutpostdata.collected = 0;
		} else {
			let res = $.ajax({
				url: "/morganpopoutcollected",
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(collects)
			});
			popoutpostdata.collected = 1;
		}
		$("#poppostcollect").addClass(popoutpostdata.collected ? "bi-bookmark-fill" : "bi-bookmark").removeClass(popoutpostdata.collected ? "bi-bookmark" : "bi-bookmark-fill");
	})


	$(".postmessginput").on("keypress", async function(e) {

		let reply
		if (e.which == 13) {
			reply = await $.ajax({
				url: "/morganpopoutcomment",
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify({
					comments: $(".postmessginput").val(),
					postContextId: likes.postContextId,
				}),
				success: function(data) {
					return data;
				},
			});
			$(".postmessginput").val("");
			$(".dynamiccomments").remove();
			$(`#mesg${likes.postContextId}`).html(`<i class="bi bi-chat-dots"> ${reply.data.length}`);
			reply.data.map((ele) => {
				if (ele.commentuicon != null) {
					minbefore = (new Date() - new Date(ele.commenttime)) / (1000 * 60);
					$("#posttextblock").append(
						`<li class="posttextblockcontext dynamiccomments">
    <div class="posttextimgblock">
                            <img class="posttextimg"
                                src="${ele.commentuicon}">
                        </div>
                        <div class="posttextaccount">
                            <a href="#" role="link" tabindex="0">@${ele.commentaccount}</a>
                        </div>
                        <div class="posttextpost">
                            <span>${filterXSS(ele.comment)}</span>
                            <br>
                            <span class="posttextposttime">${minbefore / (60 * 24 * 30.4375 * 12) >= 1 ?
							Math.floor(minbefore / (60 * 24 * 30.4375 * 12)) + "年前" : minbefore / (60 * 24 * 30.4375) >= 1 ?
								Math.floor(minbefore / (60 * 24 * 30.4375)) + "月前" : minbefore / (60 * 24 * 7) >= 1 ?
									Math.floor(minbefore / (60 * 24 * 7)) + "周前" : minbefore / (60 * 24) >= 1 ?
										Math.floor(minbefore / (60 * 24)) + "天前" : minbefore / (60) >= 1 ?
											Math.floor(minbefore / (60)) + "小時前" : minbefore >= 1 ? Math.floor(minbefore) + "分鐘前" : "剛剛"}</span>
                            <hr>
                        </div>
    </li>    
    `
					)
				}
			})
			document.getElementById("posttext").scrollTop = document.getElementById("posttext").scrollHeight;

		}
	})

});

// 滾動事件

//加載function
async function loadnew() {
	let sh = document.documentElement.scrollHeight;
	let st = document.documentElement.scrollTop || document.body.scrollTop;
	let ch = document.documentElement.clientHeight;

	if (st + ch >= sh - 1) {
		window.removeEventListener("wheel", loadnew);
		let uploads
		if (noPrefer == false) {
			uploads = await $.get(`/morganexplorepost/${pagenow}/${uploadamount}/${nowTime}`);
			if (uploads.data.length < 3) {
				lastNum = uploads.data.length; //紀錄最後一筆data數
				let tempdatas = await $.get(`/morganexplorepostnoprefer/${pagenoprefer}/${3 - lastNum}/${lastNum}/${nowTime}`);
				let temparray = [];
				uploads.data.map((ele) => {
					temparray.push(ele);
				});
				tempdatas.data.map((ele) => {
					temparray.push(ele);
				});

				uploads.data = temparray;
				pagenoprefer++;
				noPrefer = true;
			}
			pagenow++
		} else {
			uploads = await $.get(`/morganexplorepostnoprefer/${pagenoprefer}/${uploadamount}/${lastNum}/${nowTime}`);
			pagenoprefer++
		}
		// 貼上貼文圖片及喜歡和留言數
		if (uploads.data.length != 0) {
			uploads.data.map((ele) => {
				$("#Post").append(`
  <div class="postBlock" id="post${ele.postId}">
      <img class="postimg" src="${ele.img}">
      <div class="posttag">
                  <span id="heart${ele.postId}"><i class="bi bi-heart"></i> ${ele.likes}</span>
                  <span>&nbsp;&nbsp;</span>
                  <span id="mesg${ele.postId}"><i class="bi bi-chat-dots"></i> ${ele.message}</span>
      </div>
  </div>
  `);
			});

			window.addEventListener("wheel", loadnew);
			$(".postBlock").off("click", popitout);
			$(".postBlock").on("click", popitout);
		} else {
		}

	}

}

async function reload() {
	let st = document.documentElement.scrollTop || document.body.scrollTop;
	if (st == 0) {
		window.removeEventListener("scroll", reload);
		window.removeEventListener("wheel", loadnew);
		nowTime = Date();
		pagenow = 1;
		noPrefer = false
		lastNum = null;
		pagenoprefer = 1;


		$("#Post").empty();
		let uploadsh = document.documentElement.scrollHeight;
		let uploadch = document.documentElement.clientHeight;
		while (uploadsh == uploadch) {
			let datas
			if (noPrefer == false) {
				datas = await $.get(`/morganexplorepost/${pagenow}/${uploadamount}/${nowTime}`);
				if (datas.data.length < 3) {
					lastNum = datas.data.length; //紀錄最後一筆data數
					let tempdatas = await $.get(`/morganexplorepostnoprefer/${pagenoprefer}/${3 - lastNum}/${lastNum}/${nowTime}`);
					let temparray = [];
					datas.data.map((ele) => {
						temparray.push(ele);
					});
					tempdatas.data.map((ele) => {
						temparray.push(ele);
					});

					datas.data = temparray;
					pagenoprefer++;
					noPrefer = true;
				}
				pagenow++
			} else {
				datas = await $.get(`/morganexplorepostnoprefer/${pagenoprefer}/${uploadamount}/${lastNum}/${nowTime}`);
				pagenoprefer++
			}
			// 貼上貼文圖片及喜歡和留言數
			if (datas.data.length != 0) {
				datas.data.map((ele) => {
					$("#Post").append(`
  <div class="postBlock" id="post${ele.postId}">
      <img class="postimg" src="${ele.img}">
      <div class="posttag">
                  <span id="heart${ele.postId}"><i class="bi bi-heart"></i> ${ele.likes}</span>
                  <span>&nbsp;&nbsp;</span>
                  <span id="mesg${ele.postId}"><i class="bi bi-chat-dots"></i> ${ele.message}</span>
      </div>
  </div>
  `);
				});
				
				uploadsh = document.documentElement.scrollHeight;
				uploadch = document.documentElement.clientHeight;
			} else {
				break;
			}
		}
		window.addEventListener("scroll", reload);
		window.addEventListener("wheel", loadnew);
		$(".postBlock").on("click", popitout);

	}
}

window.addEventListener("scroll", reload);

window.addEventListener("wheel", loadnew);
$(".mapswitch").on("click", function() {
	window.removeEventListener("wheel", loadnew);
})
$(".postload").on("click", function() {
	window.addEventListener("wheel", loadnew);
})
