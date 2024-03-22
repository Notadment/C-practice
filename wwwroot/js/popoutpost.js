// 起始照片
let page = 0;
let likes = {}
let collects = {}
let popoutpostdata = null;

//	PopOutPostFunction
async function popitout() {
	likes.postContextId = parseInt($(this).prop("id").substring($(this).prop("id").indexOf("t") + 1));
	collects.postID = likes.postContextId;
	let res = await $.get(`http://localhost:8080/morganpopout/${likes.postContextId}`);
	popoutpostdata = res.data;
	if (popoutpostdata.postimg.length > 1) {
		$("#poppostrightarr").css("visibility", "visible");
	}
	$("#postaccount").attr("href",`/personalPageForOthers-${popoutpostdata.accountname}`)
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
	$("#postbackground").show();
}

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
	
	$("#poppostlike").click(async function() {
		if (popoutpostdata.liked) {
			let res = $.ajax({
				url: "http://localhost:8080/morganpopoutliked",
				type: "DELETE",
				contentType: "application/json",
				data: JSON.stringify(likes),
				success: async function() {
					let datas = await $.get(`http://localhost:8080/morganpopoutliked/${likes.postContextId}`);

					$("#popposttotallike").text(`${datas.data[0][0]}人說讚`);
					$(`#heart${likes.postContextId}`).html(`<i class="bi bi-heart"></i> ${datas.data[0][0]}`);
					console.log(`heart${likes.postContextId}`);
					console.log(likes);
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
				url: "http://localhost:8080/morganpopoutliked",
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(likes),
				success: async function() {
					let datas = await $.get(`http://localhost:8080/morganpopoutliked/${likes.postContextId}`);
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
				url: "http://localhost:8080/morganpopoutcollected",
				type: "DELETE",
				contentType: "application/json",
				data: JSON.stringify(collects)
			});
			popoutpostdata.collected = 0;
		} else {
			let res = $.ajax({
				url: "http://localhost:8080/morganpopoutcollected",
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
				url: "http://localhost:8080/morganpopoutcomment",
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

//// 起始照片
//let page = 0;
//
////let popoutpostdata = {
////  postimg:[
////    "https://upload.wikimedia.org/wikipedia/commons/9/99/Spotted_Seal2.JPG",
////    "https://img.ltn.com.tw/Upload/news/600/2020/06/05/phpkbOUtP.jpg",
////    "https://upload.wikimedia.org/wikipedia/commons/9/99/Spotted_Seal2.JPG",
////    "https://img.ltn.com.tw/Upload/news/600/2020/06/05/phpkbOUtP.jpg",
////  ],
////  acconticon: "https://upload.wikimedia.org/wikipedia/commons/9/99/Spotted_Seal2.JPG",
////  accountname: "test1",
////  posttext: `我好瘦<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>真的好瘦`,
////  posttime: "1天前",
////  like: true,
////  collect: true,
////  totallike: "1500",
////  likeaccount:[
////    "cccc",
////    "kkkk",
////    "jjjj"
////  ],
////  latestliketime: "1天前",
////  postMessage: [
////    {
////      acconticon: "https://upload.wikimedia.org/wikipedia/commons/9/99/Spotted_Seal2.JPG",
////      accountname: "test2",
////      posttext: `不....你超級胖`,
////      posttime: "20小時前"
////    },
////    {
////      acconticon: "https://img.ltn.com.tw/Upload/news/600/2020/06/05/phpkbOUtP.jpg",
////      accountname: "test3",
////      posttext: `你才胖吧`,
////      posttime: "20小時前"
////    },
////    {
////      acconticon: "https://upload.wikimedia.org/wikipedia/commons/9/99/Spotted_Seal2.JPG",
////      accountname: "test2",
////      posttext: `不....你超級胖`,
////      posttime: "20小時前"
////    },
////    {
////      acconticon: "https://upload.wikimedia.org/wikipedia/commons/9/99/Spotted_Seal2.JPG",
////      accountname: "test2",
////      posttext: `不....你超級胖`,
////      posttime: "20小時前"
////    },
////  ],
////};
//
//let popoutpostdata
//// 點擊事件
//$(".postBlock").on("click", async function () {
//popoutpostdata = $.get("http://localhost:8080/morganpopout/1/1");
//  if(popoutpostdata.postimg.length>1){
//    $("#poppostrightarr").css("visibility","visible");
//  }
//  $("#postblockimg").prop("src", popoutpostdata.postimg[page]);
//  $("#poppostaccountimg").prop("src", popoutpostdata.acconticon);
//  $("#poppostaccountname").text(`@${popoutpostdata.accountname}`);
//  $("#popposterimg").prop("src", popoutpostdata.acconticon);
//  $("#popposteraccount").text(`@${popoutpostdata.accountname}`);
//  $("#poppostertext").html(`${popoutpostdata.posttext}`);
//  $("#poppostertime").text(`${popoutpostdata.posttime}`);
//  popoutpostdata.postMessage.map((ele)=>{
//  $("#posttextblock").append(
//    `<li class="posttextblockcontext">
//    <div class="posttextimgblock">
//                            <img class="posttextimg"
//                                src="${ele.acconticon}">
//                        </div>
//                        <div class="posttextaccount">
//                            <a href="#" role="link" tabindex="0">@${ele.accountname}</a>
//                        </div>
//                        <div class="posttextpost">
//                            <span>${ele.posttext}</span>
//                            <br>
//                            <span>${ele.posttime}</span>
//                            <hr>
//                        </div>
//    </li>    
//    `
//    )
//  })
//  $("#poppostlike").addClass(popoutpostdata.like?"bi-heart-fill":"bi-heart").removeClass(popoutpostdata.like?"bi-heart":"bi-heart-fill");
//  $("#poppostcollect").addClass(popoutpostdata.like?"bi-bookmark-fill":"bi-bookmark").removeClass(popoutpostdata.like?"bi-bookmark":"bi-bookmark-fill");
//  
//  $("#popposttotallike").text(`${popoutpostdata.totallike}人說讚`);
//  $("#poppostlatestlikettime").text(`${popoutpostdata.latestliketime}`);
//
//
//  $("#postbackground").show();
//});
//$("#postpopblock").on("click", function (event) {
//  event.stopPropagation();
//});
//$("#postbackground").on("click", function () {
//  $("#postbackground").hide();
//});
//// 輪播
//
//$("#poppostrightarr").click(function () {
//  if(page < popoutpostdata.postimg.length-1){
//    page +=1;
//    $("#postblockimg").prop("src", popoutpostdata.postimg[page]);
//    if(page == popoutpostdata.postimg.length-1){
//      $("#poppostrightarr").css("visibility","hidden")
//    }else{
//      $("#poppostrightarr").css("visibility","visible")
//    }
//    if(page == 0){
//      $("#poppostleftarr").css("visibility","hidden")
//    }else{
//      $("#poppostleftarr").css("visibility","visible")
//    }
//  }
//})
//$("#poppostleftarr").click(function () {
//  if(page > 0){
//    page -=1;
//    $("#postblockimg").prop("src", popoutpostdata.postimg[page]);
//    if(page == 0){
//      $("#poppostleftarr").css("visibility","hidden")
//    }else{
//      $("#poppostleftarr").css("visibility","visible")
//    }
//    if(page == popoutpostdata.postimg.length-1){
//      $("#poppostrightarr").css("visibility","hidden")
//    }else{
//      $("#poppostrightarr").css("visibility","visible")
//    }
//  }
//})
//
//// 點擊事件
//$("#poppostlike").click(function () {
//  if(popoutpostdata.like){
//    popoutpostdata.like = false;
//  }else{
//    popoutpostdata.like = true;
//  }
//
//  $("#poppostlike").addClass(popoutpostdata.like?"bi-heart-fill":"bi-heart").removeClass(popoutpostdata.like?"bi-heart":"bi-heart-fill");
//  
//})
//$("#poppostcollect").click(function () {
//  if(popoutpostdata.collect){
//    popoutpostdata.collect = false;
//  }else{
//    popoutpostdata.collect = true;
//  }
//  $("#poppostcollect").addClass(popoutpostdata.collect?"bi-bookmark-fill":"bi-bookmark").removeClass(popoutpostdata.collect?"bi-bookmark":"bi-bookmark-fill");
//})
