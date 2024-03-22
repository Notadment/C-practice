$(async function () {
	let chatFollowers = await $.get("/chatFollowers");
	console.log(chatFollowers.data);
	if (chatFollowers.data != null) {
		chatFollowers.data.map((ele) => {
			if (ele.followingUserID != null) {
//				let messages = ele.messages === null ? "" : ele.messages;
				$("#chattingMember").append(
					`<div class="memberContainer" id="${ele.followingUserID}">
				 	<div class="chatMemberPicContainer">
                 		<img class="chatMemberPic" src="${ele.userIcon}">
                 	</div>
                 	<div class="chattingDisplayActionBox">
                 		<p class="chattingDisplayName">${ele.username}</p>
                 		<div class="chattingAction" id="Action${ele.followingUserID}"></div>
                 	</div>
                 </div>`);
			}
		})
	}

	$("#chattingMember").on("click", ".memberContainer", async function() {
		var followingUserID = $(this).attr('id'); // 獲取被點擊元素的 ID
		var imageSrc = $(this).find('.chatMemberPic').attr('src'); // 獲取圖片的 src 屬性
		var followingUsername = $(this).find('.chattingDisplayName').text(); // 獲取用戶名

		// 清除 #otherTopInfo 中的舊內容
		$("#otherTopInfo").empty();
		$("#receivedMessages").empty();
		// 處理獲取到的數據
		$("#otherTopInfo").append(`<img src="${imageSrc}" class="otherPic" id="${followingUserID}">`);
		$("#otherTopInfo").append(`<div id="otherName">${followingUsername}</div>`);
		$("#commentArea>div").css("display", "flex");
		let chatHistory = await $.get(`/chatHistory/${followingUserID}`);
		if (chatHistory.data != null) {
			chatHistory.data.map((ele) => {
				let senderID = ele.senderID;
				let chattingTime = new Date(ele.chattingTime);
				let currentTime = new Date();
				let resultTime = (currentTime.getTime() - chattingTime.getTime()) / 60000;
				let fullTimeFormation = {
					year : 'numeric',
					month : '2-digit',
					day : '2-digit',
					hour : '2-digit',
					minute : '2-digit',
					hour12 : false
				}
				
				let formattedTime = resultTime < 1 ? "剛剛" : resultTime < 60 ? Math.floor(resultTime) + "分鐘前" 
					: resultTime < (60 * 24) ? Math.floor(resultTime / 60) + "小時" + Math.floor(resultTime % 60) + "分前" : chattingTime.toLocaleTimeString('zh-TW', fullTimeFormation);

				let messages = ele.messages;
				let className = senderID === userID ? "myselfChatting" : "otherChatting";
				$("#receivedMessages").append(
					`<div class="currentTime">${formattedTime}</div>
				 <div class="${className}">
             		<div>${messages}</div>
             	 </div>`);
			})
			contentArea.scrollTop = contentArea.scrollHeight;
		} else {
			console.log("沒抓到chatHistory.data");
		}

	});

	connect();

	document.getElementById("messageToSend").addEventListener("keydown", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.getElementById("sendMessageButton").click();
		}
	})
})
let stompClient = null;

// 建立WebSocket連接
function connect() {
	var socket = new SockJS('/ws');
	stompClient = Stomp.over(socket);
	console.log("已WebSocket建立連線");
	stompClient.connect({}, function(frame) {
		// 設置接收消息的回調
		stompClient.subscribe('/public/chat', function(message) {
			showMessage(JSON.parse(message.body));
		});

		stompClient.subscribe(`/user/${userID}/queue/reply`, function(message) {
			showMessage(JSON.parse(message.body), false);
		});
	}, function(error) {
		console.log('WebSocket Error: ' + error);
	});
}

// 發送消息
function sendMessage() {
	var messageContent = document.getElementById("messageToSend").value.trim();
	//    console.log(messageContent);
	let receiverID = $(".otherPic").prop("id");
	let receiverName = $(".otherName").text();
	//	let jwt = localStorage.getItem("JWT777");
	if (messageContent != "") {
		if (messageContent && stompClient) {
			var chatMessage = {
				senderID: userID,
				username: username,
				receiverID: receiverID,
				receiverName: receiverName,
				content: messageContent,
			};
			stompClient.send(`/app/chat.privateMessage`, {}, JSON.stringify(chatMessage));
			document.getElementById("messageToSend").value = '';
//			$(`#Action${receiverID}`).text(messageContent);
			showMessage(chatMessage, true);
		} else {
			console.log("沒進去啦");
		}
	}
}

// 顯示消息
function showMessage(message, isPersonal) {
	console.log(message);

	var receivedMessages = document.getElementById("receivedMessages");
	var currentTimeDiv = document.createElement("div");
	currentTimeDiv.className = "currentTime";
	currentTimeDiv.textContent = "剛剛";
	receivedMessages.appendChild(currentTimeDiv);
	console.log(message);

	var messageContainer = document.createElement("div");
	var messageDiv = document.createElement("div")
	// 實際應用中應替換為動態用戶名
	messageContainer.className = isPersonal ? "myselfChatting" : "otherChatting";
	messageDiv.textContent = message.content;
	messageContainer.appendChild(messageDiv);
	receivedMessages.appendChild(messageContainer);
	// 更新滾動條位置到最新訊息
	contentArea.scrollTop = contentArea.scrollHeight;
}






//window.onload = function() {
//
//};

