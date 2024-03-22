// // 圖片上傳裁減
$(document.body).append(`
<div class="modal fade" id="staticBackdropPortrait" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabelPortrait">裁切圖片大小</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                id="closeButtoncross"></button>
        </div>
        <div class="modal-body">
            <div id="oldImgPortrait"></div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="closeButtonPortrait"
                data-bs-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary" id="sendButtonPortrait">發送</button>
        </div>
    </div>
</div>
</div>
`);

// 超出字數變色
$("#personalinfoinputtext").on("keyup", function () {
    personalinfoinputtext();
})

$("#closeButtonPortrait").on("click", function () {
    setTimeout(() => {
        if ($("#settingBox").css("display") == 'flex') {
            $("body").css("overflow-y", "hidden");
        }
    }, 350);
})

function personalinfoinputtext(){
    let textlength = 0;
    let maxlength = 150;
    textlength = $("#personalinfoinputtext").val().length;

    $("#personalinfoinputlength").empty();
    if (textlength > maxlength) {
        $("#personalinfoinputlength").append(`<span style="color:red;" >${textlength}/${maxlength}</span>`);
    } else {
        $("#personalinfoinputlength").append(`<span >${textlength}/${maxlength}</span>`);
    }

    resetPersonalinfosubmit();
}

let datatoserver = {},
    myPortraitCrop;

var newPortraitsrcOutput;

// 設定圖片被上傳時動作
$("#upload_img_portrait").on("change", function () {
    $("#oldImgPortrait").show();
    $('#staticBackdropPortrait').modal('show');

    readNewPortraitFile(this);

    this.value = ''; // 清除它，避免同張圖片無法觸發上傳事件

    setTimeout(() => {
        if ($("#settingBox").css("display") == 'flex') {
            $("body").css("overflow-y", "hidden");
        }
    }, 350);

});


// 讀取圖片，並載入至 croppie
function readNewPortraitFile(input) {

    if (input.files && input.files[0]) {
        portraitFile = input.files[0];
    } else {
        return;
    }

    if (portraitFile.type.indexOf("image") == 0) {

        myPortraitCrop = myPortraitCrop || $("#oldImgPortrait").croppie({
            viewport: { // 裁切區塊
                width: 200,
                height: 200,
            },
            type: "square",
            boundary: { // 預覽區塊
                width: 350,
                height: 350
            },
            zoom: 1
        });

        var reader = new FileReader();

        reader.onload = function (e) {
            $("#oldImgPortrait").show();
            $('#staticBackdropPortrait').modal('show');
            setTimeout(() => {
                myPortraitCrop.croppie("bind", {
                    url: e.target.result
                }).then(function () {
                    myPortraitCrop.croppie("setZoom", $('.cr-slider').attr("min"));
                    // $('.cr-slider').attr("max", ($('.cr-slider').attr("max")) * 1);
                });
            }, 200);
        }

        reader.readAsDataURL(portraitFile);
    }
}

// 設定發送按鈕
$("#sendButtonPortrait").on("click",function(){

    myPortraitCrop.croppie("result", {
        type: "canvas",
        format: "png",
        size: { width: 512, height: 512 },
        quality: 1
    }).then(function(newPortraitsrc){

        $("#personalinfosettingaccountimg").attr("src",newPortraitsrc);
        $('#staticBackdropPortrait').modal('hide');
        newPortraitsrcOutput = newPortraitsrc;
        // 在這裡寫 ajax 把 newPortraitsrc 丟出去

        // let res = $.ajax({
        //     url: "",
        //     type: "POST",
        //     contentType: "application/json",
        //     data: 
        // });
        
    });
  
});