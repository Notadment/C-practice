// // 點擊可以讓設定的class為col-2的畫面和class為col-5的畫面跳出來
// // 這裡連結到最左邊的更多中的設定
// $("#popOverBar").on("click",function()
// {
//     // $("#setting").css("display","block");
//     // $("#middleBar").css("display","block");

//     $("#setting").show();
//     $("#middleBar").show();
// })

var toastID = 0;
var repeatID = JSON.parse(localStorage.getItem("repeatID")) || [];
let informPostTime = {};

$("#informSettingBlock").append(`
<div class="tab-content" id="v-pills-tabContent">

<div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">


  <!-- <div class="my-3">
                  推播通知
              </div> -->

  <!-- <div class="form-check form-switch mb-3 mt-3">
                  <input class="form-check-input" type="checkbox" id="allInformationSuspend" checked>
                  <label class="form-check-label" for="allInformationSuspend">全部暫停</label>
              </div> -->

  <div class="my-2">
    <p class="fw-bold">按讚通知</p>

    <div class="form-check my-2">
      <input class="form-check-input" type="radio" name="likeInformState" id="openLikeInformState" checked>
      <label class="form-check-label" for="openLikeInformState">
        開啟
      </label>
    </div>
    <div class="form-check my-2">
      <input class="form-check-input" type="radio" name="likeInformState" id="closeLikeInformState">
      <label class="form-check-label" for="closeLikeInformState">
        關閉
      </label>
    </div>


  </div>

  <hr>

  <div class="my-2">
    <div class="fw-bold">貼文通知</div>

    <div class="form-check my-2">
      <input class="form-check-input" type="radio" name="postInformState" id="openPostInformState" checked>
      <label class="form-check-label" for="openPostInformState">
        開啟
      </label>
    </div>
    <div class="form-check my-2">
      <input class="form-check-input" type="radio" name="postInformState" id="closePostInformState">
      <label class="form-check-label" for="closePostInformState">
        關閉
      </label>
    </div>



  </div>
  <hr>

  <div class="my-2">
    <div class="fw-bold">追蹤通知</div>

    <div class="form-check my-2">
      <input class="form-check-input" type="radio" name="followInformState" id="openFollowInformState"
        checked>
      <label class="form-check-label" for="openFollowInformState">
        開啟
      </label>
    </div>
    <div class="form-check my-2">
      <input class="form-check-input" type="radio" name="followInformState" id="closeFollowInformState" >
      <label class="form-check-label" for="closeFollowInformState">
        關閉
      </label>
    </div>
</div>



	






















`);

// 原本放在 id: informSettingBlock 裡面要append上去的
{/* <input type="text" id="text"/>
    <button onclick="sendfun()">發送消息</button>
    <button onclick="closeWebSocket()">關閉連接</button>
    <div id="message"></div>





	<!-- Button trigger modal -->
	<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal999">
	Launch demo modal
	</button> */}

// $("body").append(`

// <!-- Modal -->
// <div class="modal fade" id="exampleModal999" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalLabel">通知</h5>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div id="likeInformationBody" class="modal-body">
//         ...
//       </div>

//     </div>
//   </div>
// </div>`);

$("body").append(`

<div id="toastBox">



</div>

`);

// 原本屬於body裡面要append，現在不用放了
// <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
// </div>

$(".settingSxcted").on("click", function () {
	$(this).css("backgroundColor", "pink").siblings().css("backgroundColor", "");
})

$("#forButton button").on("click", function () {
	$(this).css("backgroundColor", "pink");
})

function userOusersettingInformObjectbject(openLikeInformState, openPostInformState, openFollowInformState, flexSwitchCheckDefault) {
	this.likeInformState = openLikeInformState;
	this.postInformState = openPostInformState;
	this.followInformState = openFollowInformState;
	this.openState = flexSwitchCheckDefault;
}
$(" #openLikeInformState, #openPostInformState,#openFollowInformState,#closeLikeInformState,#closePostInformState,#closeFollowInformState, #flexSwitchCheckDefault"
).on("click", function () {
	let openLikeInformState = 999;
	if ($("#openLikeInformState").is(":checked")) {
		openLikeInformState = 1;
	}
	else {
		openLikeInformState = 0;
	}
	let openPostInformState = 222;
	if ($("#openPostInformState").is(":checked")) {
		openPostInformState = 1;
	}
	else {
		openPostInformState = 0;
	}
	let openFollowInformState = 333;
	if ($("#openFollowInformState").is(":checked")) {
		openFollowInformState = 1;
	}
	else {
		openFollowInformState = 0;
	}
	let flexSwitchCheckDefault = 555;
	if ($("#flexSwitchCheckDefault").prop("checked")) {
		flexSwitchCheckDefault = 1;
	}
	else {
		flexSwitchCheckDefault = 0;
	}
	// console.log("openLikeInformState為=====" + openLikeInformState);
	// console.log("openPostInformState為=====" + openPostInformState);
	// console.log("openFollowInformState為=====" + openFollowInformState);
	// console.log("flexSwitchCheckDefault為=====" + flexSwitchCheckDefault);




	// console.log("--------------------------------------------");

	let x = new userOusersettingInformObjectbject(openLikeInformState, openPostInformState
		, openFollowInformState, flexSwitchCheckDefault);
	// console.log("這是發送到後端的檔案:x====" + JSON.stringify(x));
	// console.log("--------------------------------------------");
	$.ajax
		({
			url: "/addSettingInformData1",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(x),
			dataType: "json",
			success: function (resp) {
				console.log("成功發送到後端-------------這是發送到後端的檔案:x====" + x);
			},
			error: function () {
				// {alert("發送請求失敗")
				console.log("發送請求失敗");
			}
		}
		)
})

let thisWeekInformData = [
	{
		img: "https://img.ltn.com.tw/Upload/news/600/2020/06/05/phpkbOUtP.jpg",
		userId: "Anthony Davis",
		state: "對你的貼文按讚",
		time: ""
	},
	{
		img: "https://s.yimg.com/it/api/res/1.2/Dd8RpjXynLq_F._NFZgJ9A--~A/YXBwaWQ9eW5ld3M7dz00MDA7aD0yNjY7cT0xMDA-/https://s.yimg.com/xe/i/us/sp/v/nba_cutout/players_l/10242023/5007.png",
		userId: "Anthony Davis",
		state: "已加入",
		time: ""
	},
	{
		img: "https://s.yimg.com/it/api/res/1.2/KdQ0R8hRArnYbpnwUstRQA--~A/YXBwaWQ9eW5ld3M7dz00MDA7aD0yNjY7cT0xMDA-/https://s.yimg.com/xe/i/us/sp/v/nba_cutout/players_l/10242023/6170.png",
		userId: "Jaxson Hayes",
		state: "對你的貼文按讚",
		time: ""
	},
]
let thisMonthInformData = [
	{
		img: "https://s.yimg.com/it/api/res/1.2/sTC.BXRio6vjZh5CXB25Jw--~A/YXBwaWQ9eW5ld3M7dz00MDA7aD0yNjY7cT0xMDA-/https://s.yimg.com/xe/i/us/sp/v/nba_cutout/players_l/10242023/3704.png",
		userId: "LeBron James",
		state: "對你的貼文按讚",
		time: ""
	},
]
let longTimeAgoInformData = [
	{
		img: "https://s.yimg.com/it/api/res/1.2/4R9PKQswDuq6RRGFhiidUA--~A/YXBwaWQ9eW5ld3M7dz00MDA7aD0yNjY7cT0xMDA-/https://s.yimg.com/xe/i/us/sp/v/nba_cutout/players_l/10242023/6606.png",
		userId: "Austin Reaves",
		state: "對你的貼文按讚",
		time: ""
	},
]

// 2024 這個還要用請留著
//   thisWeekInformData.map((x) => {
//     $("#thisWeek").append(
//       `<div class="card mb-3 border-0">
//                 <div class="row g-0">
//                   <div class="col-4">
//                     <img src="
//                     ${x.img}" class="img-fluid" alt="...">
//                   </div>
//                   <div class="col-8">
//                     <div class="card-body">
//                       <p class="card-text"  >
//                         ${x.userId}${x.state}
//                       </p>
//                       <p class="card-text"><span>Last updated 3 mins ago</span></p>
//                     </div>
//                   </div>
//                 </div>
//             </div>`
//     )
//   })
//   thisMonthInformData.map((x) => {
//     $("#thisMonth").append(
//       `<div class="card mb-3 border-0"">
//                 <div class="row g-0">
//                   <div class="col-4">
//                     <img src="
//                     ${x.img}" class="img-fluid" alt="...">
//                   </div>
//                   <div class="col-8"">
//                     <div class="card-body">
//                       <p class="card-text"  >
//                         ${x.userId}${x.state}
//                       </p>
//                       <p class="card-text"><span>Last updated 3 mins ago</span></p>
//                     </div>
//                   </div>
//                 </div>
//             </div>`
//     )
//   })
//   longTimeAgoInformData.map((x) => {
//     $("#longTimeAgo").append(
//       `<div class="card mb-3 border-0"">
//                 <div class="row g-0">
//                   <div class="col-4">
//                     <img src="
//                     ${x.img}" class="img-fluid" alt="...">
//                   </div>
//                   <div class="col-8">
//                     <div class="card-body">
//                       <p class="card-text"  >
//                         ${x.userId}${x.state}
//                       </p>
//                       <p class="card-text"><span>Last updated 3 mins ago</span></p>
//                     </div>
//                   </div>
//                 </div>
//             </div>`
//     )
//   })

















//////////////////////////////////////////////////////////////////////
// 測試
// var clientId=Math.random().toString(36).substr(2);
var clientId = Math.random().toString(36);
console.log(clientId);

var ws = new WebSocket("wss://" + window.location.host + "/wss/" + clientId);

function userObject(userAccount) {
	this.userAccount = userAccount;


}

// 搜尋
$("#search").blur(function () {
	// console.log("-----------------------");
	let userAccount = $("#search").val();
	// console.log(userAccount);
	let x = new userObject(userAccount);
	// console.log("這是前端要查的東西=============" + x);





	$.ajax
		({
			url: "/findUserInSearchController",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(x),
			dataType: "json",
			success: function (resp) {
				// console.log("------------------這裡是JS-----------------------------");
				// console.log("resp的資料型態:" + typeof resp);
				// console.log("resp.data的資料型態:" + typeof resp.data);



				// console.log("resp是:" + resp);
				// console.log("resp.data是:" + resp.data);
				//要實作從JSON字串轉換為JS對象，使用JSON.parse()方法：
				//要實作從JS物件轉換為JSON字串，使用JSON.stringify()方法：
				// console.log("JSON.stringify(resp)是:" + JSON.stringify(resp));
				// console.log("JSON.stringify(resp.data)是:" + JSON.stringify(resp.data));


				// console.log("JSON.stringify(resp.data) 資料型態是:" + typeof JSON.stringify(resp.data));


				// 按下搜尋格，先清除搜尋紀錄
				$("#zzzzzzzzzz").empty();





				// 這裡是append 搜尋出來的使用者資料
				resp.data.map((x) => {
					$("#zzzzzzzzzz").append(
						`

						<a href="/personalPageForOthers-${x.userAccount}"     style="text-decoration:none;">

							<div id=${x.id} class=m-3  card mb-3 ms-3 border-0"">
								<div class="row g-0">
									<div class="col-4">
									
									
									
									<img src="${x.usericon}"
										class="img-fluid" alt="...">
									
									</div>
									<div class="col-7">
									<div class="ms-3 card-body" >
										<h5 class="fw-bold" >
										${x.userAccount}
										</h5>
									</div>
									
									</div>
									
									
								</div>
							
							</div>

						</a>


						`
					)


				})

				//data-bs-dismiss="offcanvas"

				// 原本放在搜尋欄append上去的，請留著
				// <div class="col-1">
				// 	<button id=${x.id} type="button" class="controlerFORsearch btn-close text-reset "  aria-label="Close"></button>
				// </div>




				// $(`.controlerFORsearch`).on("click", function() {

				// 	let thisISYourId = $(this).prop("id");

				// 	$(`#${thisISYourId}`).remove();

				// 	console.log("======成功刪除搜尋紀錄=======");
				// })
			}
		})

});

//  我追蹤的人發文，會發通知
function ajax1() {
	return $.ajax
		({
			url: "/updateInformationData",
			type: "POST",
			contentType: "application/json",

			dataType: "json",
			success: function (resp) {

				// console.log("------------------這裡是updateInformationData  ----Controller的response--------------------");
				// console.log("resp的資料型態:" + typeof resp);
				// console.log("resp.data的資料型態:" + typeof resp.data);



				// console.log("resp是:" + resp);
				// console.log("resp.data是:" + resp.data);

				// console.log("JSON.stringify(resp)是:" + JSON.stringify(resp));
				// console.log("------------------這裡是updateInformationData  ----Controller的response--------------------");
				// console.log("JSON.stringify(resp.data)是:" + JSON.stringify(resp.data));


				// console.log("JSON.stringify(resp.data) 資料型態是:" + typeof JSON.stringify(resp.data));

				// console.log("---------------------------------------------------");



				// 成功從Java傳回來的東西
				let responseOFSomethimg;
				// 要讓時間變數字
				let time_Become_Number;
				// 
				let Now_Time = new Date();
				//
				let gap_Time;


				resp.data.map((x) => {
					responseOFSomethimg = x;







					// 處理時間用
					let postTime = Date.now() - ((x.postSettingTime != null) ? Date.parse(x.postSettingTime) : Date.parse(x.createtime));
					let postDate = new Date((x.postSettingTime != null) ? x.postSettingTime : x.createtime);
					let toDate = postDate.getFullYear() + "年" + (postDate.getMonth() + 1) + "月" + postDate.getDate() + "日";
					let dayTime = postTime / 1000 < 60
						? "剛剛"
						: postTime / (60 * 1000) - 5 <= 0
							? "幾分鐘前"
							: postTime / (60 * 1000) > 0 && postTime / (60 * 1000) < 60
								? Math.floor(postTime / (60 * 1000)) + "分鐘前"
								: postTime / (60 * 60 * 1000) < 24 && postTime / (60 * 60 * 1000) > 0
									? Math.floor(postTime / (60 * 60 * 1000)) + "小時前"
									: postTime / (60 * 60 * 1000 * 24) < 7 && postTime / (60 * 60 * 1000 * 24) > 0
										? Math.floor(postTime / (60 * 60 * 1000 * 24)) + "天前"
										: toDate;

					// console.log(responseOFSomethimg.postSettingTime);
					// console.log(typeof responseOFSomethimg.postSettingTime);

					let time_In_JS = new Date(responseOFSomethimg.postSettingTime);
					// console.log(time_In_JS);
					// console.log(typeof time_In_JS);
					// console.log("-------------------------------------------");
					// console.log( time_In_JS.getTime());
					// console.log(typeof time_In_JS.getTime());

					time_Become_Number = time_In_JS.getTime();

					gap_Time = Now_Time.getTime() - time_Become_Number;
					// console.log("------------" + gap_Time);
					// console.log("-------------------------------------------");

					// console.log(x.usericon);



					// 按下通知，先清除之前的通知紀錄
					// $("#thisWeek").empty();
					// $("#thisMonth").empty();
					// $("#longTimeAgo").empty();

					let dataStream = ` <div id="not${x.postId}" class="card mb-3 border-0 noticeout " style="max-width: 500px;"  data-list-time="${gap_Time}"  data-pop-id = ${x.postId}>
				<div class="row g-0">
				  <a href="/personalPageForOthers-${x.userAccount}" class="col-4">
					<img src="${x.usericon}" class="img-fluid rounded-start" alt="...">
				  </a>
				  <div class="col-8">
					<div class="card-body">
		  
					  <p class="card-text fw-bold">
					  ${x.userAccount}
						
		  
					  </p>
					  <p class="card-text"><span>新增1篇貼文</span></p>
					  <div >
							${dayTime}
					  </div >
					</div>
				  </div>
				</div>
			  </div>`

					if (gap_Time < 604800000) {
						$("#thisWeek").append(dataStream);
					}
					else if (604800000 < gap_Time < 2592000000) {
						$("#thisMonth").append(dataStream);
					}
					else {
						$("#longTimeAgo").append(dataStream);
					}


				})

				//通知彈出框事件


			}
		});
}

//  把別人對自己的貼文按讚，會發通知
function ajax2() {
	return $.ajax
		({
			url: "/findWhoGiveMyPostLike",
			type: "POST",
			contentType: "application/json",

			dataType: "json",
			success: function (resp) {

				// console.log("------------------這裡是findWhoGiveMyPostLike  ----Controller的response--------------------");
				console.log("resp的資料型態:" + typeof resp);
				console.log("resp.data的資料型態:" + typeof resp.data);



				// console.log("resp是:" + resp);
				// console.log("resp.data是:" + resp.data);


				// console.log("------------------!!!!--------------------");
				// console.log("JSON.stringify(resp.data)是:" + JSON.stringify(resp.data));

				// console.log("JSON.stringify(resp)是:" + JSON.stringify(resp));

				// console.log("JSON.stringify(resp.data) 資料型態是:" + typeof  JSON.stringify(resp.data));



				// 成功從Java傳回來的東西
				let responseOFSomethimg;
				// 要讓時間變數字
				let time_Become_Number;
				// 
				let Now_Time = new Date();
				//
				let gap_Time;

				resp.data.map
					((x) => {

						// ws.send(x);


						let postTime = Date.now() - ((x.like_Time != null) ? Date.parse(x.like_Time) : Date.parse(x.createtime));
						let postDate = new Date((x.like_Time != null) ? x.like_Time : x.createtime);
						let toDate = postDate.getFullYear() + "年" + (postDate.getMonth() + 1) + "月" + postDate.getDate() + "日";
						let dayTime = postTime / 1000 < 60
							? "剛剛"
							: postTime / (60 * 1000) - 5 <= 0
								? "幾分鐘前"
								: postTime / (60 * 1000) > 0 && postTime / (60 * 1000) < 60
									? Math.floor(postTime / (60 * 1000)) + "分鐘前"
									: postTime / (60 * 60 * 1000) < 24 && postTime / (60 * 60 * 1000) > 0
										? Math.floor(postTime / (60 * 60 * 1000)) + "小時前"
										: postTime / (60 * 60 * 1000 * 24) < 7 && postTime / (60 * 60 * 1000 * 24) > 0
											? Math.floor(postTime / (60 * 60 * 1000 * 24)) + "天前"
											: toDate;

						responseOFSomethimg = x;
						// console.log("------------------!!!!--------------------");
						// console.log(x)
						// console.log(responseOFSomethimg.postSettingTime);
						// console.log(typeof responseOFSomethimg.postSettingTime);

						let time_In_JS = new Date(x.like_Time);


						// console.log(time_In_JS);
						// console.log(typeof time_In_JS);
						// console.log("666666666666666666666666666666666");
						// console.log( time_In_JS.getTime());
						// console.log(typeof time_In_JS.getTime());




						time_Become_Number = time_In_JS.getTime();

						gap_Time = Now_Time.getTime() - time_Become_Number;
						// console.log("-----gap_Time-------" + gap_Time);

						// console.log("888888888888888888888" + x.give_You_Like_Usericon);

						// console.log("888888888888888888888" + x.give_You_Like_userAccount);



						if (x.give_You_Like_Usericon != undefined) {


							// 按下通知，先清除之前的通知紀錄
							// $("#thisWeek").empty();
							// $("#thisMonth").empty();
							// $("#longTimeAgo").empty();

							var dataStream = `
						<div data-list-time="${gap_Time}"  style="text-decoration:none;">
						<div class="card mb-3 border-0"">
							<div class="row g-0">
								<a href="/personalPageForOthers-${x.give_You_Like_userAccount}"  class="col-4">
									<img src=
									"${x.give_You_Like_Usericon}" class="img-fluid" alt="...">
								</a>
								<div class="col-8 noticeout" data-pop-id = ${x.give_You_Like_PostId}>
									<div class="card-body">
										<p class="card-text fw-bold">
										${x.give_You_Like_userAccount}
										</p>
										<p class="card-text">
										<span>對你的貼文按讚</span>
										</p>
										<div >
										${dayTime}
										</div >
									</div>
								</div>
							</div>
						</div>
					</div>
					`;

							if (gap_Time < 604800000) {
								$("#thisWeek").append(dataStream);
							}
							else if (604800000 < gap_Time < 2592000000) {
								$("#thisMonth").append(dataStream);
							}
							else {
								$("#longTimeAgo").append(dataStream);
							}

						}

					}



					)



			}
		});
}

// 有人追蹤你，會發通知
function ajax3() {
	return $.ajax
		({
			url: "/followInformation",
			type: "POST",
			contentType: "application/json",

			dataType: "json",
			success: function (resp) {

				// console.log("------------------這裡是updateInformationData  ----Controller的response--------------------");
				// console.log("resp的資料型態:" + typeof resp);
				// console.log("resp.data的資料型態:" + typeof resp.data);



				// // console.log("resp是:" + resp);
				// // console.log("resp.data是:" + resp.data);

				// console.log("JSON.stringify(resp)是:" + JSON.stringify(resp));
				// console.log("------------------這裡是updateInformationData  ----Controller的response--------------------");
				// console.log("JSON.stringify(resp.data)是:" + JSON.stringify(resp.data));


				// console.log("JSON.stringify(resp.data) 資料型態是:" + typeof JSON.stringify(resp.data));

				// console.log("---------------------------------------------------");



				// 成功從Java傳回來的東西
				let responseOFSomethimg;
				// 要讓時間變數字
				let time_Become_Number;
				// 
				let Now_Time = new Date();
				//
				let gap_Time;

				resp.data.map((x) => {




					let postTime = Date.now() - ((x.fansFollowTime != null) ? Date.parse(x.fansFollowTime) : Date.parse(x.createtime));
					let postDate = new Date((x.fansFollowTime != null) ? x.fansFollowTime : x.createtime);
					let toDate = postDate.getFullYear() + "年" + (postDate.getMonth() + 1) + "月" + postDate.getDate() + "日";
					let dayTime = postTime / 1000 < 60
						? "剛剛"
						: postTime / (60 * 1000) - 5 <= 0
							? "幾分鐘前"
							: postTime / (60 * 1000) > 0 && postTime / (60 * 1000) < 60
								? Math.floor(postTime / (60 * 1000)) + "分鐘前"
								: postTime / (60 * 60 * 1000) < 24 && postTime / (60 * 60 * 1000) > 0
									? Math.floor(postTime / (60 * 60 * 1000)) + "小時前"
									: postTime / (60 * 60 * 1000 * 24) < 7 && postTime / (60 * 60 * 1000 * 24) > 0
										? Math.floor(postTime / (60 * 60 * 1000 * 24)) + "天前"
										: toDate;

					responseOFSomethimg = x;


					// console.log(responseOFSomethimg.postSettingTime);
					// console.log(typeof responseOFSomethimg.postSettingTime);

					let time_In_JS = new Date(responseOFSomethimg.fansFollowTime);
					// console.log(time_In_JS);
					// console.log(typeof time_In_JS);
					// console.log("-------------------------------------------");
					// console.log( time_In_JS.getTime());
					// console.log(typeof time_In_JS.getTime());

					time_Become_Number = time_In_JS.getTime();

					gap_Time = Now_Time.getTime() - time_Become_Number;
					// console.log("------------" + gap_Time);
					// console.log("-------------------------------------------");

					// console.log(x.fansIcon);


					// 按下通知，先清除之前的通知紀錄
					// $("#thisWeek").empty();
					// $("#thisMonth").empty();
					// $("#longTimeAgo").empty();

					var dataStream = `
					<a href="/personalPageForOthers-${x.fansUserAccount}"  data-list-time="${gap_Time}" style="text-decoration:none;">
						<div class="card mb-3 border-0" style="max-width: 500px; ">
							<div class="row g-0">
								<div class="col-4">
									<img src="${x.fansIcon}" class="img-fluid rounded-start" alt="...">
								</div>
								<div class="col-8">
									<div class="card-body">
						
										<p class="card-text fw-bold">
										${x.fansUserAccount}
										</p>
										<p class="card-text"><span>開始追蹤你</span></p>
										<div >
												${dayTime}
										</div >
									</div>
								</div>
							</div>
						</div>
					</a>
		
				  `;

				  if (gap_Time < 604800000) {
					$("#thisWeek").append(dataStream);
				}
				else if (604800000 < gap_Time < 2592000000) {
					$("#thisMonth").append(dataStream);
				}
				else {
					$("#longTimeAgo").append(dataStream);
				}

				})
			}
		});
}

//等待所有通知完成後，排序所有通知並且添加事件
$.when(ajax1(), ajax2(), ajax3()).done(function () {

	var divList = $("#thisWeek>*");
	divList.sort(function (a, b) {
		return $(b).data("list-time") - $(a).data("list-time");
	});
	$("#thisWeek").html(divList);

	var divList = $("#thisMonth>*");
	divList.sort(function (a, b) {
		return $(b).data("list-time") - $(a).data("list-time");
	});
	$("#thisMonth").html(divList);

	var divList = $("#longTimeAgo>*");
	divList.sort(function (a, b) {
		return $(b).data("list-time") - $(a).data("list-time");
	});
	$("#longTimeAgo").html(divList);

	//popitout會在這邊上
	$(".noticeout").on("click", popitout);

});

$(async function () {
	let messageSetting = await $.get("./messageSetting");
	// console.log(messageSetting[0].postInformState)
	//	按讚通知
	if (messageSetting[0].likeInformState == 0) {
		$("#closeLikeInformState").prop('checked', true);
		$("#openLikeInformState").prop('checked', false);
	} else {
		$("#closeLikeInformState").prop('checked', false);
		$("#openLikeInformState").prop('checked', true);
	}
	//	貼文通知
	if (messageSetting[0].followInformState == 0) {
		$("#closePostInformState").prop('checked', true);
		$("#openPostInformState").prop('checked', false);
	} else {
		$("#closePostInformState").prop('checked', false);
		$("#openPostInformState").prop('checked', true);
	}
	//	追隨者通知
	if (messageSetting[0].postInformState == 0) {
		$("#closeFollowInformState").prop('checked', true);
		$("#openFollowInformState").prop('checked', false);
	} else {
		$("#closeFollowInformState").prop('checked', false);
		$("#openFollowInformState").prop('checked', true);
	}

});

// var clientId=Math.random().toString(36).substr(2);

// 創建WebSocket物件
// var ws = new WebSocket("ws://localhost:8080/ws/" +clientId );



//監聽是否連接成功
//建立連接後需要做什麼事情
ws.onopen = function () {
	console.log('這裡是前端，ws連接狀態：' + ws.readyState);
	console.log("這裡是前端，連接成功WS---------------------------------");

	// 傳送到後端伺服器的訊息
	// ws.send('這裡是前端發的訊息ws.onopen ------------------------- 我們成功建立WebSocket啦');

}


ws.onerror = function () {
	console.log("連接錯誤WS");


}

//接受後端傳過來的消息
ws.onmessage = async function (ev) {

	// 先清空
	$("#likeInformationBody").html("");



	console.log("ev.data 的類型" + typeof ev.data);

	var datastr = ev.data;



	if (typeof datastr == "string") {

		//將dataStr 轉換成JSON物件
		var res = JSON.parse(datastr);
		console.log("res 的類型" + typeof res);

		console.log("已經轉換成JSON物件");



	}


	// var x1 = res.message;
	// console.log("這裡是ws.onmessage==========接收到來自伺服器的消息，回調的方法");
	// console.log(x1);

	console.log("這裡是前端，ws.onmessage負責接收後端傳過來的資料========" + datastr);


	// setMessageInnerHTML(ev.data);

	// $("#myModal").modal('show');

	// $("#myModal").addClass("show");
	// $("#myModal").toggleClass("show");


	// $("#likeInformationBody").html(`${datastr}`);

	// 	$("#likeInformationBody").html(`<div class="card mb-3 border-0" style="max-width: 500px; ">
	// 	<div class="row g-0">
	// 		<div class="col-4">
	// 		<img src="${res.give_You_Like_Usericon}"
	// 			class="img-fluid rounded-start">
	// 		</div>
	// 		<div class="col-8">
	// 		<div class="card-body">

	// 			<p class="card-text fw-bold">
	// 			${res.give_You_Like_userAccount}


	// 			</p>
	// 			<p class="card-text"><span>對你的${res.give_You_Like_PostId}貼文按讚</span></p>


	// 			<div >

	// 			</div >


	// 		</div>
	// 		</div>
	// 	</div>
	// </div>

	// `)

	let findRepeat = false;
	findRepeat = repeatID.find((e) => e == `${res.give_You_Like_PostId}_${res.give_You_Like_userAccount}`) || false;
	if (!findRepeat) {
		repeatID.push(`${res.give_You_Like_PostId}_${res.give_You_Like_userAccount}`);
		localStorage.setItem("repeatID", JSON.stringify(repeatID));
		// console.log(repeatID);

		$("#toastBox").append(`
	<div class="toast" id="toast${toastID}" role="alert" aria-live="assertive" data-bs-delay="3000" aria-atomic="true" >
    <div class="toast-header">
      <img src="${res.give_You_Like_Usericon}" class="rounded me-2" alt="...">
      <strong class="me-auto">${res.give_You_Like_userAccount}</strong>
      <span>剛剛</span>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" id="toastbody${toastID}" data-pop-id="${res.give_You_Like_PostId}">
	對你的貼文按讚。
    </div>
  </div>
	`);
		$(`#toastbody${toastID}`).on('click', popitout);


		// $("#exampleModal999").modal('show');

		$(`#toast${toastID}`).toast("show");


		$(`
	<div data-list-time="1"  style="text-decoration:none;">
	<div class="card mb-3 border-0"">
		<div class="row g-0">
			<a href="/personalPageForOthers-${res.give_You_Like_userAccount}"  class="col-4">
				<img src=
				"${res.give_You_Like_Usericon}" class="img-fluid" alt="...">
			</a>
			<div id="newnoticeout${toastID}" class="col-8 noticeout" data-pop-id=${res.give_You_Like_PostId}>
			<div class="card-body">
				<p class="card-text fw-bold">
					${res.give_You_Like_userAccount}
					</p>
					<p class="card-text">
					<span>對你的貼文按讚</span>
					</p>
					<div >
					剛剛
					</div >
				</div>
			</div>
		</div>
	</div>
</div>


  `).insertBefore("#thisWeek>h5");

		$(`#newnoticeout${toastID}`).on("click", popitout);


		toastID++;
	}
}


ws.onclose = function (ev) {

	console.log("WS關閉回調的方法");

}


window.onbeforeunload = function () {
	ws.close();
}

// window.onload = function() 
// {
// 	sendfun();

// };

function sendfun() {
	// var message=99999999999999999;
	// var message=$("#text").val();


	var message = document.getElementById('text').value;

	$("#text").val("");

	ws.send(message);



}

function closeWebSocket() {

	ws.close();

}

function setMessageInnerHTML(x) {
	// $("#message").html(x)+=x + `<br/>`;

	$("#message").html("");
	document.getElementById('message').innerHTML += x + '</br>';


}
















