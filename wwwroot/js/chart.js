//const Excel = require('exceljs');
let aname;
let uname;
let phonenum;
let info = [];
let ttime = [];
var mybarchart;
let setmonth = ["1", '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
let dataByDate = [];
$("#getsearch").click(function () {

    let fmonnum = $("#smonth").val();
    let lmonnum = $("#endmonth").val();
    let fdaynum = $("#sday").val();
    let ldaynum = $("#sday").val();
    let sex = $("#sex").val();
    let aname = $("#inputkey").val();
    //console.log(typeof ($("#sex").val()));


    let datas = $.ajax({
        url: "/Home/GetQuery",
        type: "GET",
        contentType: "application/json",
        data: {
            fmonnum: fmonnum,
            fdaynum: fdaynum,
            lmonnum: lmonnum,
            ldaynum: ldaynum,
            sex: sex,
            aname: aname
        },
        success: function (response) {
            $("#listcontent").empty();
            if (mybarchart) {
            mybarchart.destroy();
            }
            $("#pie").empty();
            if (response != null) {
                $("#listcontent").append(`
                <table class= "table table-striped"  id = "listname">
                <tr>
                    <th>帳戶名</th>
                    <th>頭像</th>
                    <th>用戶名</th>
                    <th>性別</th>
                    <th>電話</th>
                    <th>創建日期</th>                    
                </tr> 
                </table>                
            `)
                response.map((ele) => {

                    if (ele.gender == 0) {
                        ele.gender = "男"
                    }
                    if (ele.gender == 1) {
                        ele.gender = "女"
                    }
                    if (ele.gender == 2) {
                        ele.gender = "不公開"
                    }
                    $("#listname").append(`
                    <tr>
                        <td>${ele.userAccount}</td>
                        <td><img height="100" width="100" src="${ele.usericon}" /></td>
                        <td>${ele.username}</td>
                        <td>${ele.gender}</td>
                        <td>${ele.phonenumber}</td>
                        <td>${ele.createtime}</td >
                    </tr>

                    `);
                    info.push([ele.userAccount, ele.usericon, ele.username, ele.gender, ele.phonenumber, ele.createtime])

                });

            }
            $("#listname").append(`
                <tr >
                     <td style="background-color: forestgreen; color:lightgray; font-size:20px;">總計：${response.length}筆</td>
                     <td style="background-color: forestgreen; color:lightgray;"></td >
                     <td style="background-color: forestgreen; color:lightgray;"></td >
                     <td style="background-color: forestgreen; color:lightgray;"></td >
                     <td style="background-color: forestgreen; color:lightgray;"></td >
                     <td style="background-color: forestgreen; color:lightgray;"></td >
                </tr>
             `)
            //for (let i = 0; i < response.length; i++) {
            //    let takeday = new Date(response[i].createtime).getDate();
            //    let takemonth = new Date(response[i].createtime).getMonth() + 1;
            //    let getdate = takemonth + "月" + takeday + "日"
            //    if (takemonth == 1 && takeday > 0 && takeday < 11) {
            //        setmonth["1"].push([getdate])
            //    }
            //    console.log(setmonth)
            //}

            //var barchart = document.getElementById('bar').getContext('2d');
            // mybarchart = new Chart(barchart, {
            //    type: 'bar',
            //    data: {
            //        labels: ['001', '002', '003'],
            //        datasets: [{
            //            abel: 'Bar Chart',
            //            data: [100, 200, 300],
            //            backgroundcolor: 'rgba(50,128,250)'
            //        }]
            //    },
            //    options: {
            //        scales: {
            //            y: {
            //                beginAtZero: true
            //            }
            //        }
            //    }
            //})

        }
    });

});



$("#outexcel").click(function () {

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('用戶資料');
    //const getimg = `${info.usericon}`;

    //console.log(info[0][1])
    sheet.state = 'visible';

    headrow = sheet.addRow(['帳戶名稱', '頭像', '用戶名', '性別', '電話', '創建時間']);
    headrow.eachCell((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF00' }
        };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        cell.alignment = {
            vertical: 'middle',
            horizontal: 'center'
        };

        cell.font = {
            size: 20,
            bold: true
        };

    });
    //sheet.addTable({
    //    name: 'table名稱',
    //    ref: 'A1',
    //    columns: [{ name: '帳戶名稱' }, { name: '頭像' }, { name: '用戶名' }, { name: '性別' }, { name: '電話' }, { name: '創建時間' }],
    //    rows: info
    //});
    let setdata;
    for (let i = 0; i < info.length; i++) {
        const setimg = workbook.addImage({
            base64: `${info[i][1]}`,
            extension: 'png'
        });
        sheet.addImage(setimg, {
            tl: { col: 1, row: sheet.rowCount },
            ext: { width: 80, height: 80 },
            editAs: 'oneCell'
        });
        //sheet.addRow([info[i][0], , info[i][2], info[i][3], info[i][4], info[i][5]]);
        setdata = sheet.getCell(sheet.rowCount, 1).value = {
            richText: [
                { text: info[i][0], font: { size: 14 } }
            ],
            alignment: { vertical: 'middle', horizontal: 'center' }
        };

        setdata = sheet.getCell(sheet.rowCount, 3).value = {
            richText: [
                { text: info[i][2], font: { size: 14 } }
            ],
            alignment: { vertical: 'middle', horizontal: 'center' }
        };
        setdata = sheet.getCell(sheet.rowCount, 4).value = {
            richText: [
                { text: info[i][3], font: { size: 14 } }
            ],
            alignment: { vertical: 'middle', horizontal: 'center' }
        };
        setdata = sheet.getCell(sheet.rowCount, 5).value = {
            richText: [
                { text: info[i][4], font: { size: 14 } }
            ],
            alignment: { vertical: 'middle', horizontal: 'center' }
        };
        setdata = sheet.getCell(sheet.rowCount, 6).value = {
            richText: [
                { text: info[i][5], font: { size: 11 } }
            ],
            alignment: { vertical: 'middle', horizontal: 'center' }
        };

        sheet.getRow(sheet.rowCount).height = 60;

    }


    sheet.getColumn(1).width = 20;
    sheet.getColumn(2).width = 15;
    sheet.getColumn(3).width = 20;
    sheet.getColumn(4).width = 10;
    sheet.getColumn(5).width = 20;
    sheet.getColumn(6).width = 20;

    workbook.xlsx.writeBuffer().then((content) => {
        const link = document.createElement("a");
        const blobData = new Blob([content], {
            type: "application/vnd.ms-excel;charset=utf-8;"
        });
        link.download = `表單.xlsx`;
        link.href = URL.createObjectURL(blobData);
        link.click();

    })
});

window.onload = function () {
    var downPdf = document.getElementById("toPDF");
    downPdf.onclick = function () {
        html2canvas(
            document.getElementById("listname"),
            {
                dpi: 300,//匯出pdf清晰度
                onrendered: function (canvas) {

                    var contentWidth = canvas.width;
                    var contentHeight = canvas.height;

                    //一頁pdf顯示html頁面生成的canvas高度;
                    var pageHeight = contentWidth / 580.28 * 820.89;
                    //未生成pdf的html頁面高度
                    var leftHeight = contentHeight;
                    //pdf頁面Y軸偏移
                    var position = 30;
                    //html頁面生成的canvas在pdf中圖片的寬高（a4紙的尺寸[595.28,841.89]）
                    var imgWidth = 595.28;
                    var imgHeight = 592.28 / contentWidth * contentHeight;

                    var pageData = canvas.toDataURL('image/jpeg', 0.9);
                    var pdf = new jsPDF('', 'pt', 'a4');

                    //有兩個高度需要區分，一個是html頁面的實際高度，和生成pdf的頁面高度(841.89)
                    //當內容未超過pdf一頁顯示的範圍，無需分頁
                    if (leftHeight < pageHeight) {
                        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                    } else {
                        while (leftHeight > 0) {
                            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                            leftHeight -= pageHeight;
                            position -= 841.89;
                            //避免新增空白頁
                            if (leftHeight > 0) {
                                pdf.addPage();
                            }
                        }
                    }
                    pdf.save('list.pdf');
                },
                //背景設為白色（預設為黑色）
                background: "#fff"
            })
    }
}
//let datas = $.ajax({
//    url: "/Home/GetQuery",
//    type: "GET",
//    contentType: "application/json",
//    data: {
//        fmonnum: fmonnum,
//        fdaynum: fdaynum,
//        lmonnum: lmonnum,
//        ldaynum: ldaynum,
//        sex: sex,
//        aname: aname
//    },
//    success: function (response) {
//
//        var sheetRows = [];
//        if (response != null) {
//            response.map(e => {
//                if (ele.gender == 0) {
//                    ele.gender = "男"
//                }
//                if (ele.gender == 1) {
//                    ele.gender = "女"
//                }
//                if (ele.gender == 2) {
//                    ele.gender = "不公開"
//                }
//                sheetRows.push([e.userAccount, e.usericon, e.username, e.gender, e.createtime, e.phonenum])
//            })
//        }




//        })



//let fmonnum = $("#smonth").val();
//let lmonnum = $("#endmonth").val();
//let fdaynum = $("#sday").val();
//let ldaynum = $("#sday").val();
//let sex = $("#sex").val();
//let aname = $("#inputkey").val();
//console.log(typeof ($("#sex").val()));


//let datas = $.ajax({
//    url: "/Home/ExportExcel",
//    type: "GET",
//    contentType: "application/json",
//    data: {
//        fmonnum: fmonnum,
//        fdaynum: fdaynum,
//        lmonnum: lmonnum,
//        ldaynum: ldaynum,
//        sex: sex,
//        aname: aname
//    }
//    //,
//    //success: function (response) {
//    //    window.sessionStorage.setItem("excel", response);
//    //    window.location.href ="/Home/download";
//    //}
//});
//})
//function getvalue() {

//    if ($("#searchtype").val() == "username") {
//        aname = $("#inputkey").val();
//    } else if ($("#searchtype").val() == "useraccount") {
//        uname = $("#inputkey").val();
//    } else if ($("#searchtype").val() == "phonenumber") {
//        phonenum = $("#inputkey").val();
//    }
//}

//var barchart = document.getElementById('bar').getContext('2d');
//var mybarchart = new Chart(barchart, {
//    type: 'bar',
//    data: {
//        labels: ['001', '002', '003'],
//        datasets: [{
//            label: 'Bar Chart',
//            data: [100, 200, 300],
//            backgroundcolor: 'rgba(50,128,250)'
//        }]
//    },
//    options: {
//        scales: {
//            y: {
//                beginAtZero: true
//            }
//        }
//    }
//})

//var piechart = document.getElementById('pie').getContext('2d');
//var mypiechart = new Chart(piechart, {
//    type: 'pie',
//    data: {
//        labels: ['001', '002', '003'],
//        datasets: [{
//            label: 'Pie Chart',
//            data: [100, 200, 300],
//            backgroundcolor: 'rgba(6,128,250)'
//        }]
//    }
//})