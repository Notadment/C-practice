
$(function () {
    // 一開始就執行讓警告的訊息div隱藏起來
    hideAlert();

    function hideAlert() {
        $("#registerAlert").hide();
        console.log("測試hideAlert()有沒有執行用的");
    }

















    function userObject(userAccount, username, password, phonenumber, email) {
        this.userAccount = userAccount;
        this.username = username;
        this.password = password;
        this.phonenumber = phonenumber;
        this.email = email;

    }



    // [a-z]{1,}[A-Z]{1,}[0-9]{1,}{6,20}



    // 如果用戶帳號沒有符合規定就跳出訊息
    $("#userAccount").blur(function () {

        // 只能使用英文和數字組成的使用者名稱
        // let reguserAccount=/^[a-zA-Z0-9]{6,20}$/;
        // let reguserAccount=/(([a-z]{1,})|([A-Z]{1,})|([0-9]{1,})){6,20}/;


        // let reguserAccount = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,20}$/;
        // 除了特殊符號不能設定成使用者帳號
        let reguserAccount = /^[\u4e00-\u9fa5A-Za-z0-9]+$/;
        console.log(reguserAccount)
        let userAccount = $("#userAccount").val();




        if (!(reguserAccount.test(userAccount))) {

            $("#registerAlert").show();
            console.log(userAccount);
            console.log(reguserAccount.test(userAccount));
            console.log("userAccount錯誤");
            console.log("_________________");

            // $("#registerAlert").text("請設定只包含數字和英文字母的用戶帳號");
            $("#registerAlert").text("請設定至少包含一位大寫字母、小寫字母、數字,且長度在6-20位數之間的用戶帳號");

            // 設定讓註冊按鈕不能按
            $("#registerButton").prop("type", "button");
        }
        else {
            $("#registerAlert").hide();
            console.log(userAccount);
            console.log("userAccount正確");

        }

    })


















    // 如果用戶名稱沒有符合規定就跳出訊息
    $("#username").blur(function () {

        // 只能使用英文和數字組成的使用者名稱
        // let regUserName = /^[a-zA-Z0-9]+$/;

        // 除了特殊符號不能設定成使用者名稱
        let regUserName = /^[\u4e00-\u9fa5A-Za-z0-9]+$/;
        console.log(regUserName)
        let userName = $("#username").val();




        if (!(regUserName.test(userName))) {

            $("#registerAlert").show();
            console.log(userName);
            console.log(regUserName.test(userName));
            console.log("userName錯誤");
            console.log("_________________");

            $("#registerAlert").text("請設定只包含中文字、數字、英文字母的用戶名稱");

            // 設定讓註冊按鈕不能按
            $("#registerButton").prop("type", "button");
        }
        else {
            $("#registerAlert").hide();
            console.log(userName);
            console.log("userName正確");

        }

    })





    // 如果密碼沒有符合規定就跳出訊息
    $("#password").blur(function () {

        // 要同時有數字和英文字母的6位數的密碼
        // let regPassword=/^[a-zA-Z0-9]{6}$/;
        let regPassword = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        let passWord = $("#password").prop("value");


        if (!(regPassword.test(passWord))) {
            // 如果電話號碼沒有符合規定就跳出訊息
            $("#registerAlert").show();
            $("#registerAlert").text("請設定只包含數字和英文字母且6位數以上的密碼");
            // 設定讓註冊按鈕不能按
            $("#registerButton").prop("type", "button");
            console.log(passWord);

            console.log("passWord錯誤");
            console.log("_________________");


        }
        else {
            $("#registerAlert").hide();
            console.log("passWord正確");
            console.log(passWord);

        }

    })




    // 如果確認的密碼沒有符合規定就跳出訊息
    $("#doublueCheckPassword").blur(function () {

        // 要同時有數字和英文字母的6位數的密碼
        let regPassword = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        let doublueCheckPassword = $("#doublueCheckPassword").prop("value");
        if (!(regPassword.test(doublueCheckPassword))) {
            // 如果電話號碼沒有符合規定就跳出訊息
            $("#registerAlert").show();

            $("#registerAlert").text("請設定只包含數字和英文字母且6位數以上的密碼");
            // 設定讓註冊按鈕不能按
            $("#registerButton").prop("type", "button");
            console.log("doublueCheckPassword錯誤");
            console.log("_________________");
        }
        else {
            $("#registerAlert").hide();
            console.log(doublueCheckPassword);
            console.log("doublueCheckPassword正確");

        }

    })




    // 如果電話號碼沒有符合規定就跳出訊息
    $("#phone").blur(function () {

        let regPhoneNumber = /^09\d{8}$/;
        let phoneNumber = $("#phone").prop("value");
        console.log(phoneNumber);



        if (!(regPhoneNumber.test(phoneNumber))) {

            $("#registerAlert").show();

            $("#registerAlert").text("請輸入正確手機號碼");
            // 設定讓註冊按鈕不能按
            $("#registerButton").prop("type", "button");
            console.log("phoneNumber錯誤");
            console.log("_________________");
        }
        else {
            $("#registerAlert").hide();
            console.log("phoneNumber正確");

        }
    });




    // 如果電子信箱沒有符合規定就跳出訊息
    $("#email").blur(function () {


        let regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let email = $("#email").prop("value");


        if (!(regEmail.test(email))) {

            $("#registerAlert").removeClass("d-none");
            $("#registerAlert").text("請輸入正確的電子信箱");
            // 設定讓註冊按鈕不能按
            $("#registerButton").prop("type", "button");
            console.log("email錯誤");

        }
        else {
            $("#registerAlert").hide();
            console.log(email);
            console.log("email正確");

        }
    })










    // 按下去就送出註冊資料，同時會確認資料正確性
    $("#xxxxx , #registerButton").on("click", function () {


        // 如果是自定義屬性，prop() 方法不可獲取
        let userAccount = $("#userAccount").prop("value");
        let username = $("#username").prop("value");
        let password = $("#password").prop("value");
        let phonenumber = $("#phone").prop("value");
        let em = $("#email").prop("value");

        let doublueCheckPassword = $("#doublueCheckPassword").prop("value");

        if (!(doublueCheckPassword == password)) {
            // 密碼不相同，清除密碼
            $("#password").prop("value", "");
            $("#doublueCheckPassword").prop("value", "");
            console.log("密碼不相同，清除密碼_______________");
            $("#registerButton").prop("type", "button");

            $("#registerAlert").removeClass("d-none");
            $("#registerAlert").text("兩次密碼輸入不相同");


            return;
        }


        // $(".invalid-tooltip").css("display","block");


        // setTimeout(() => {
        // $(".invalid-tooltip").css("display","none");

        // }, 1000)









        // let reguserAccount = /^[a-zA-Z0-9]+$/;
        let reguserAccount = /^[\u4e00-\u9fa5A-Za-z0-9]+$/;

        // let regUserName = /^[a-zA-Z0-9]+$/;
        let regUserName = /^[\u4e00-\u9fa5A-Za-z0-9]+$/;
        let userName = $("#username").val();

        let regPassword = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        let passWord = $("#password").prop("value");

        let regPhoneNumber = /^09\d{8}$/;
        let phoneNumber = $("#phone").prop("value");

        let regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let email = $("#email").prop("value");


        if ((reguserAccount.test(userAccount))
            && (regUserName.test(userName))
            && (regPassword.test(passWord))
            && (regPassword.test(doublueCheckPassword))
            && (regPhoneNumber.test(phoneNumber))
            && (regEmail.test(email))) {


            let x = new userObject(userAccount, username, password, phonenumber, em);

            console.log("要傳到後端的物件" + x);
            console.log(" 還未新增cookie，印出 document.cookie" + document.cookie);

            console.log("================這裡還沒向後端發請求=======================")

            let arr = [];

            // 
            $.ajax
                ({
                    url: "/realRegister1",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(x),
                    dataType: "json",
                    success: function (resp) {
                        console.log("------------------這裡是JS-----------------------------");
                        console.log("resp的資料型態:" + typeof resp);
                        console.log("resp.data的資料型態:" + typeof resp.data);


                        console.log("resp是:" + resp);
                        console.log("resp.data是:" + resp.data);

                        console.log("JSON.stringify(resp)是:" + JSON.stringify(resp));
                        console.log("JSON.stringify(resp.data)是:" + JSON.stringify(resp.data));


                        //設定localStorage
                        // 從userInformationForJSON中可以獲取token
                        // localStorage.setItem('userInformationForJSON', JSON.stringify(resp));
                        // localStorage.setItem('tokenForJSON', JSON.stringify(resp.data));
                        // localStorage.setItem('userInformation', resp);
                        localStorage.setItem('原始JWT', resp.data);
                        console.log('成功接收到從後端response到前端的數據-------------------------------------！');
                       
                        console.log("typeof  JSON.stringify(resp)-------:" + typeof JSON.stringify(resp));
                        console.log("typeof JSON.stringify(resp.data)------------:" + typeof JSON.stringify(resp.data));




                        if (resp.data == null) {
                            console.log("==========這裡是JS裡面===========");
                            console.log("用戶已註冊---------");
                            window.location.href = "/login";
                        }











                        // document.cookie = JSON.stringify(resp.data);


                        // 很重要的JWT放到Cookie
                        // 新增1個cookie
                        // document.cookie = `tokenFromJava=${resp.data}`;
                        console.log(" 新增了cookie，印出 document.cookie" + document.cookie);


                        window.location.href = "/explorepage";
                        // window.location.href = "/findall";



                        console.log("接收從後端伺服器來的response成功");
                        if (resp.data) {

                            // 獲取到本地的token
                            var tokenForJSON = localStorage.getItem("tokenForJSON");
                            var token = JSON.parse(tokenForJSON);


                            console.log("typeof token:-----------" + typeof token);





                        }
                        else {
                            console.error('註冊失敗，未獲得JWT。');
                        }
                    },
                    error: function () { alert("註冊失敗，請輸入正確註冊資料") }

                });



            arr.push(x);

            console.log("這是物件");
            console.log(x);

            console.log("這是陣列");
            console.log(arr);
            console.log("-----------------------------------");

            $("#registerButton").prop("type", "submit");


        }
        else {
            // 設定讓註冊按鈕不能按
            $("#registerButton").prop("type", "button");
            console.log("還未通過註冊確認，所以註冊按鈕的type還是button");
            alert("註冊失敗，請輸入正確註冊資料")
        }








    })

















    // change() 方法
    // $("#username").change(function()
    // {
    //     let username=$("#username").prop("value");
    //     let password=$("#password").prop("value");
    //     let phonenumber=$("#phone").prop("value");
    //     let em=$("#email").prop("value");


    //     let x=new userObject(username, password, ph, em);


    //     arr.push(x);

    //     console.log(x);
    //     console.log(arr);
    // })






})

window.onload = function () {
    // 從 sessionStorage 提取 email
    const email = sessionStorage.getItem('userEmailForRegistration');
    if (email) {
        document.getElementById('email').value = email;
        sessionStorage.removeItem('userEmailForRegistration');
    }
};




