// 一般登入
var login = document.getElementById("loginForm");

login.addEventListener("submit", function (event) {
	event.preventDefault();

	var username = document.getElementById("account").value;
	var password = document.getElementById("passwd").value;
	var rememberMe = document.getElementById("rememberMe");

	var loginData = {
		username: username,
		password: password
	};

	$.ajax({
		url: "/Home/Login",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(loginData),
		success: function () {
			/*document.cookie()*/
			window.location.href = "/Home/mainpage";

		},
		error: function (xhr) {
			//console.log(123)
			if (xhr.status === 400) {
				alert(xhr.responseText);
			}
		}
	})
})