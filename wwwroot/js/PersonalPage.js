// 起始照片
let page = 0;
let likes = {}
let collects = {}
let popoutpostdata = null;
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
	if( "@"+$("#idName").text() == $("#popposteraccount").text() ){
		$("#popposterdelete").show();
	}
	else{
		$("#popposterdelete").hide();
	}

	$("#postbackground").show();

	if ($("#inform").hasClass("show")) {
		$("#inform").offcanvas("hide");
		$("#postbackground").one("click", function() {
			$("#inform").offcanvas("show");
		});
	}

	// 重新綁定刪除貼文的按鈕
	$(`#popposterdelete`).off('click');
	$(`#popposterdelete`).on('click', function() {

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



$(async function() {
	//   userAccount在html靠Thymeleaf賦予值
	let followingstatus = await $.get(`/getfollowingstatuas/${userAccount}`);
	let blackstatus = await $.get(`/getblackstatuas/${userAccount}`);
	let userDatas = await $.get(`/personalPageUserData/${userAccount}`);
	let postDatas = await $.get(`/personalPagePostData/${userAccount}`);
	let collectionDatas;
	let surfingHistoryDatas;
	if (userAccount == null) {
		collectionDatas = await $.get("/personalPageCollectionData");
		surfingHistoryDatas = await $.get("/personalPageSurfingHistoryData");
	}
	//	console.log(userDatas.data);
	//	console.log(postDatas.data);
	//	console.log(blackstatus.data[0]);

	if (userDatas.data != null) {
		userDatas.data.map((ele) => {
			$("#headPhotoContainer").append(`<img class="" id="headPhoto" src="${ele.userIcon}" alt="">`);
			if (userAccount !== null) {
				$("#headFirstRow").append(`
					<b><p id="idName"></p></b>
                    <div><button class="btn following bg-primary "></button></div>
                    <div><button class="btn btn-info" id="toChattingRoomBtn"></button></div>
                    <div><button class="btn blackList bg-primary"></button></div>
			`)
			}
			$("#idName").append(`${ele.userAccount}`);
			$("#postNumArea").append(`${ele.postNum} 貼文`);
			$(".following").attr("data-follow-id", ele.userID);
			$("#toChattingRoomBtn").on('click', function() {
				window.location.href = `/chattingRoom-${ele.userID}`;
			});
			if (followingstatus.data != null) {
				$(".following").addClass(`${followingstatus.data[0] != 0 ? "bg-success" : "bg-primary"}`);
				// $(".following").text(`${followingstatus.data[0]!=0? "追蹤中" : "未追蹤"}`);
			}
			$(".blackList").attr("data-black-id", ele.userID);
			if (blackstatus.data != null) {
				$(".blackList").addClass(`${blackstatus.data[0] != 0 ? "bg-success" : "bg-primary"}`);
				// $(".blackList").text(`${blackstatus.data[0]!=0? "移除黑名單" : "加入黑名單"}`);
			}
			$("#displayNameArea").append(`${ele.userDisplayName}`);
			$("#biographyArea").append(`${ele.userIntroduction == null ? "" : ele.userIntroduction}`);
			$("#followingNumArea").append(`${ele.followingNum} 追蹤中`);
			$("#fanNumArea").append(`${ele.fanNum} 粉絲`);
		})
	}





	$("#toChattingRoomBtn").on("click", function() {

		let xxx = $(this).attr("data-chat-id");


		$(`#${xxx}`).on("click");










	});








	if (postDatas.data != null) {
		postDatas.data.map((ele) => {
			$("#postsContainer").append(`<div id="post${ele.postId}" class="card postPicContainer postBlock">
							<img class="postPic" src="${ele.imgURL}">
							<div class="overlayIcon">
								<b><i class="bi bi-heart-fill likeNumArea">${ele.numOfLikes}</i></b>
								<b><i class="bi bi-chat-dots commentNumArea">${ele.numOfComment}</i></b>
							</div>
						</div>`);
		})
	}

	if (collectionDatas != null) {
		collectionDatas.data.map((ele) => {
			$("#collectionContainer").append(
				`<div id="collect${ele.postID}" class="col-md-4 card postPicContainer postBlock">
							<img class="postPic" src="${ele.imgURL}">
							<div class="overlayIcon">
								<b><i class="bi bi-heart-fill likeNumArea">${ele.numOfLikes}</i></b>
								<b><i class="bi bi-chat-dots commentNumArea">${ele.numOfComment}</i></b>
							</div>
						</div>`);
		})
	}

	if (surfingHistoryDatas != null) {
		surfingHistoryDatas.data.map((ele) => {
			if (ele.postID != null) {
				$("#watchHistoryContainer").append(
					`<div id="Hist${ele.postID}" class="col-md-4 card postPicContainer postBlock">
							<img class="postPic" src="${ele.imgURL}">
							<div class="overlayIcon">
								<b><i class="bi bi-heart-fill likeNumArea">${ele.numOfLikes}</i></b>
								<b><i class="bi bi-chat-dots commentNumArea">${ele.numOfComment}</i></b>
							</div>
						</div>`);
			}
		})
	}
	// Nav Tab
	var tabs = document.querySelectorAll('.nav-link');
	tabs.forEach(function(tab) {
		tab.addEventListener('click', function(event) {
			event.preventDefault();
			var tabId = this.getAttribute('href'); // 獲取當前點擊的標籤的 href 属性值
			var content = document.querySelector(tabId); // 獲取與標籤相關聯的内容區域
			var activeTab = document.querySelector('.nav-link.active');
			var activeContent = document.querySelector('.tab-pane.show.active');
			activeTab.classList.remove('active'); // 移除當前活動的標籤的 'active' 類
			this.classList.add('active'); // 為當前點擊的標籤添加 'active' 類
			activeContent.classList.remove('show', 'active'); // 移除當前活動的内容的 'show' 和 'active' 類
			content.classList.add('show', 'active'); // 為與當前標籤相關聯的内容添加 'show' 和 'active' 類
		});
	});
	let followingList = {};
	$(".following").on("click", async function() {
		//			const followingUserID = $(this).data("follow-id");
		const isFollowing = $(this).hasClass('bg-success');
		followingList.followingUserID = $(this).data("follow-id")
		if (isFollowing) {
			const res = $.ajax({
				url: "/deleteFollowingList",
				type: "DELETE",
				contentType: "application/json",
				data: JSON.stringify(followingList),
				success: function() {
					$.get(`/getTotalFollowing/${followingList.followingUserID}`, function(data) {
						$("#fanNumArea").text(`${data.data[0]} 粉絲`);
					})
				}
			});
			$(this).addClass('bg-primary');
			$(this).removeClass('bg-success');
			// $(this).text("未追蹤");
		} else {
			const res = $.ajax({
				url: "/insertFollowingList",
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(followingList),
				success: function() {
					$.get(`/getTotalFollowing/${followingList.followingUserID}`, function(data) {

						$("#fanNumArea").text(`${data.data[0]} 粉絲`);
					})
				}
			});
			$(this).addClass('bg-success');
			$(this).removeClass('bg-primary');
			// $(this).text("追蹤中");
		}

	});
	let blackList = {}
	$(".blackList").on("click", async function() {
		//			const followingUserID = $(this).data("follow-id");
		const isBlack = $(this).hasClass('bg-success');
		blackList.blockedUserID = $(this).data("black-id")
		if (isBlack) {
			const res = $.ajax({
				url: "/deleteblackList",
				type: "DELETE",
				contentType: "application/json",
				data: JSON.stringify(blackList),
			});
			$(this).addClass('bg-primary');
			$(this).removeClass('bg-success');
			// $(this).text("加入黑名單");
		} else {
			const res = $.ajax({
				url: "/insertblackList",
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(blackList),
			});
			$(this).addClass('bg-success');
			$(this).removeClass('bg-primary');
			// $(this).text("移出黑名單");
		}

	});
	//	彈出框邏輯


	$(".postBlock").on("click", popitout);
	//通知彈出框事件

	$(".noticeout").on("click", popitout);

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


})