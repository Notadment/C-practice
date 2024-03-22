
var buttonStyle = "btn btn-primary";

var croppinDebug = croppinDebug || false;

var LatlngPost = {
    lat: null,
    lng: null
};

let postState = 0;

function getlocate() {
    return new Promise(function (res, rej) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    //  console.log("success")
                    res(pos);
                },
                () => {
                    res({ lat: 24.1784573, lng: 121.6162033 });
                    //  console.log("fail")
                }
            );
        } else {
            // Browser doesn't support Geolocation
            console.log("YOUR SYSTEM NOT SUPPORT LOCATION FUNCTION")
        }
    });
}

function makeMap() {

    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD0DR7eU5D7IM-SVlE1MNk3QLdpSYgD77I&callback=initMap';
    script.async = true;

    window.initMap = async function () {

        var myLatlng = { lat: 24.1784573, lng: 120.6162033 };
        let myLocationCropMap = await getlocate();
        const { Map } = await google.maps.importLibrary("maps");
        //用來找id="map"並初始化地圖

        mapCroppin = new Map(document.getElementById("mapCroppin"), {

            //地圖中心位置
            center: {
                //緯度
                lat: myLocationCropMap.lat,
                //經度
                lng: myLocationCropMap.lng
            },
            //縮放比
            zoom: 17,
            // 移除左上地圖類型選擇
            mapTypeControl: false,
            // 添加客製style

        });

        let infoWindow = new google.maps.InfoWindow({
            content: "點擊標記其他位置，或點擊確定使用該位置",
            position: myLocationCropMap
        });

        let infoMarker;

        LatlngPost = myLocationCropMap;
        infoWindow.open(mapCroppin);

        mapCroppin.addListener("click", (mapsMouseEvent) => {

            if (infoMarker) {
                infoMarker.setMap(null);
            } else {
                infoWindow.close();
            }

            infoMarker = new google.maps.Marker({
                position: mapsMouseEvent.latLng,
                map: mapCroppin
            });
            LatlngPost = mapsMouseEvent.latLng.toJSON();
            infoWindow.setContent(
                JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
            );

            infoMarker.setMap(mapCroppin);
        });

    }

    document.head.appendChild(script);

}

if (croppinDebug) {
    $("#middleBar").append(`

<div>

<div id="posts" style="margin:10px 0px 10px 0px;min-height: 600px;border:1px solid black; display: flex;flex-wrap: wrap;align-content: flex-start">

</div>

<label class="${buttonStyle}">
<input class="upload_img" style="display:none;" type="file" accept="image/*"> 上傳圖片
</label>

</div>

`);

}

$(document.body).append(`
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">裁切圖片大小</h5>
        </div>
        <div class="modal-body">
            <div id="textDiv">
                <textarea id="textInput" placeholder="在想些什麼？"></textarea>
            </div>
            <a href="#/" id="location">
                新增位置
            </a>
            <div id="oldImg"></div>
            <div id="imgs"></div>
            <div style="display: flex; justify-content: flex-end">
                <label class="btn btn-primary" id="upload_img_inside_button"><input
                        id="upload_img_inside" style="display:none;" type="file" accept="image/*"><i
                        class="fa fa-photo"></i>上傳更多圖片</label>
            </div>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="closeButton"
                data-bs-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary" id="crop_img">下一步</button>
            <button type="button" class="btn btn-secondary" id="prevPageButton">上一步</button>
            <button type="button" class="btn btn-primary" id="sendButton">發送</button>
        </div>
    </div>
</div>
</div>
`);

$(document.body).append(`
<div id="mapBox">
<div class="mapTop">
    <a href="#/" class="closeMap">
        <i class="bi bi-x"></i>
    </a>
</div>
<div class="mapMid">
    <div id="mapCroppin"></div>
</div>
<div class="mapFooter">
    <button type="button" class="btn btn-primary" id="mapSelect">確認</button>
</div>
</div>
`);

// -------------------------------------------------------------------------------

(function ($) {
    let width_crop = 200, // 圖片裁切寬度 px 值
        height_crop = 200, // 圖片裁切高度 px 值
        type_crop = "square", // 裁切形狀: square 為方形, circle 為圓形
        width_preview = window.innerWidth - 50, // 預覽區塊寬度 px 值
        height_preview = window.innerWidth - 50, // 預覽區塊高度 px 值
        compress_ratio = 1, // 圖片壓縮比例 0~1
        type_img = "png", // 圖檔格式 jpeg png webp
        oldImg = new Image(),
        myCrop, file,
        pictureCount = 0,
        fileURLs = [],
        cropData = [],
        lastPictureID = null,
        pictureOutput = [],
        textOutput;

    if (window.innerWidth >= 400) {
        width_preview = 350;
        height_preview = 350;
    }

    // 裁切初始參數設定


    function readFile(input) {

        if (input.files && input.files[0]) {
            file = input.files[0];
        } else if (input) {
            file = input;
        } else {
            return;
        }

        if (file.type.indexOf("image") == 0) {

            myCrop = myCrop || $("#oldImg").croppie({
                viewport: { // 裁切區塊
                    width: width_crop,
                    height: height_crop,
                },
                type: type_crop,
                boundary: { // 預覽區塊
                    width: width_preview,
                    height: height_preview
                },
                zoom: 1
            });

            var reader = new FileReader();

            reader.onload = function (e) {

                oldImgDataUrl = e.target.result;
                fileURLs[pictureCount] = e.target.result;


                $('#staticBackdrop').modal('show');
                postState = 1;

                $("#imgs").append(`
                <div class="imgCropBlock">
                <img src="${fileURLs[pictureCount]}" class="smallImg" id="smallImg${pictureCount}">
                </div>
                `);

                $(`#smallImg${pictureCount}`).bind("click", function () {
                    SelectImg(this.id.replace(/[^\d.]/g, ''));
                });

                oldImg.src = fileURLs[pictureCount]; // 載入 oldImg 取得圖片資訊

                loadImg(pictureCount);

                pictureCount++;


            }

            reader.readAsDataURL(file);
            file = '';

        } else {
            alert("您上傳的不是圖檔！");
        }
    }

    function loadImg(pictureID) {

        $('#upload_img_inside_button').show();

        cropData[lastPictureID] = myCrop.croppie("get");

        setTimeout(() => {

            cropData[lastPictureID] = myCrop.croppie("get");

            myCrop.croppie("result", {
                type: "canvas",
                format: type_img,
                size: { width: 462, height: 462 },
                quality: compress_ratio
            }).then(function (src) {

                $(`#smallImg${lastPictureID}`).attr("src", src);
                myCrop.croppie("bind", {
                    url: fileURLs[pictureID]
                }).then(function () {
                    myCrop.croppie("setZoom", $('.cr-slider').attr("min"));
                    // $('.cr-slider').attr("max", ($('.cr-slider').attr("max")) * 1.5);
                    lastPictureID = pictureID;
                });

            });

        }, `${lastPictureID == null ? 200 : 0}`);

    }

    function SelectImg(pictureID) {

        if (pictureID != lastPictureID) {

            cropData[lastPictureID] = myCrop.croppie("get");

            myCrop.croppie("result", {
                type: "canvas",
                format: type_img,
                size: { width: 462, height: 462 },
                quality: compress_ratio,
            }).then(function (src) {

                $(`#smallImg${lastPictureID}`).attr("src", src);

                myCrop.croppie("bind", {
                    points: cropData[pictureID].points,
                    zoom: cropData[pictureID].zoom,
                    url: fileURLs[pictureID]
                }).then(function () {
                    $('.cr-slider').attr("max", ($('.cr-slider').attr("max")) * 2);
                    $('.cr-slider').attr("aria-valuenow", cropData[pictureID].zoom);
                    lastPictureID = pictureID;

                });
            });
        }
    }

    $("#crop_img").on("click", function () {

        $('.smallImg').css("pointer-events", "none");

        $('#upload_img_inside_button').hide();
        myCrop.croppie("result", {
            type: "canvas",
            format: type_img,
            size: { width: 462, height: 462 },
            quality: compress_ratio
        }).then(function (src) {
            postState = 2;
            $("#staticBackdropLabel").html("新增貼文");
            $('#location').css("display", "flex");
            $('#textDiv').show();
            $("#closeButton").hide();
            $("#crop_img").hide();
            $("#prevPageButton").show();
            $("#sendButton").show();
            $('#oldImg').hide();
            $(`#smallImg${lastPictureID}`).attr("src", src);
        });
    });

    $("#prevPageButton").on("click", function () {

        postState = 1;

        $('.smallImg').css("pointer-events", "auto");

        $("#prevPageButton").hide();
        $("#prevPageButton").hide();
        $("#sendButton").hide();
        $("#closeButton").show();
        $("#crop_img").show();
        $('#location').hide();

        $('#textDiv').hide();
        $('#upload_img_inside_button').show();
        $('#oldImg').show();
    });

    $("#closeButton").on("click", function () {
        clear();
    });

    $(".upload_img").on("change", function () {
        closeUpload();
        $("#oldImg").show();
        readFile(this);
        this.value = '';
    });

    window.addEventListener("dragover", function (e) {
        e.preventDefault();
    }, false);

    $(window).on("drop", function (e) {

        if (postState == 2) {
            $("#prevPageButton").click();
        }

        $("#dragAndUploadBox").removeClass("highlightDropArea");
        closeUpload();
        $("#oldImg").show();

        let pictureFileslength = e.originalEvent.dataTransfer.files.length;
        let pictureFiles = e.originalEvent.dataTransfer.files;

        for (var k = 0; k < pictureFileslength; k++) {
            setTimeout(function (picnum) {
                readFile(pictureFiles[picnum]);
            }, 250 * k, k);
        }

        this.value = '';
    });

    $("#upload_img_inside").on("change", function () {

        readFile(this);
        this.value = '';
    });

    function clear() {

        postState = 0;

        $("#staticBackdropLabel").html("裁切圖片大小");
        $('.imgCropBlock').remove();
        $('.smallImg').remove();

        pictureCount = 0;
        fileURLs = [];
        cropData = [];
        lastPictureID = null;
        LatlngPost = {
            lat: null,
            lng: null
        };

        $('#location').hide();
        $('.smallImg').css("pointer-events", "auto");
        $("#prevPageButton").hide();
        $("#prevPageButton").hide();
        $("#sendButton").hide();
        $("#closeButton").show();
        $("#crop_img").show();
        $('#textDiv').hide();
        $('#upload_img_inside_button').show();
        $('#oldImg').show();
        $("#location").css("color", "gray");
        $("#location").text("新增位置");
        $("#textInput").val("");


        setTimeout(() => {
            if ($("#settingBox").css("display") == 'flex') {
                $("body").css("overflow-y", "hidden");
            }
        }, 350);


    }

    $("#sendButton").on("click", function () {

        textOutput = $("#textInput").val();

        if (!(LatlngPost.lat)) {
            LatlngPost.lat = null;
            LatlngPost.lng = null;
        }

        var post = {
            "text": textOutput,
            "lat": LatlngPost.lat,
            "lng": LatlngPost.lng,
            "picture": []
        };

        $(".smallImg").each((index) => {

            pictureOutput[index] = $(`#smallImg${index}`).attr("src");

            if (croppinDebug == true) {
                $("#posts").append(`
                <img src="${pictureOutput[index]}" class="postBox" title="${textOutput}"/>
           `);
            }
            post.picture.push({ [index]: pictureOutput[index] });

        });

        let res = $.ajax({
            url: "./morganaddpostpersonalpost",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(post),
            success: function(){
                setTimeout(function(){
                    window.location.replace("./dropcat");
                },500);
            }
        });
        $('#staticBackdrop').modal('hide');
        
        
        clear();
        
    });

})(jQuery);



$("#textInput").each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
}).on("input", function () {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
});

$("#location").on("click", function (evt) {
    makeMap();
    $("#location").blur();
    $("#mapBox").css("display", "flex");
});

$(".closeMap").on("click", function () {
    $("#mapBox").css("display", "none");
});

$("#mapSelect").on("click", function () {
    $("#mapBox").css("display", "none");
    if (LatlngPost) {
        $("#location").text("位置已標記");
    }
});

$("#dragAndUploadBox").on('dragenter', function (ev) {
    $("#dragAndUploadBox").addClass("highlightDropArea");
});

$("#dragAndUploadBox").on('dragleave', function (ev) {
    $("#dragAndUploadBox").removeClass("highlightDropArea");
});


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "錯誤：無法定位。"
            : "錯誤：瀏覽器不支援地理位置資訊。"
    );
    infoWindow.open(map);
}
