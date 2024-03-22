using DocumentFormat.OpenXml.Spreadsheet;
using DropCats.Data;
using DropCats.Models;
using DropCats.Service;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System.Data;
using System.Diagnostics;
using System.Net;
using System.Security.Claims;

namespace DropCats.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext dbContext;
        private readonly LoginService loginService;
        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context, LoginService login)
        {
            _logger = logger;
            dbContext = context;
            this.loginService = login;
        }
        [AllowAnonymous]
        public IActionResult Index()
        {
            //List<UserInfo> userinfo = new List<UserInfo>();
            //userinfo = dbContext.UserInfo.ToList();
            return View();
        }

        //[AllowAnonymous] // 允許匿名登入 (當驗證檢查套用全域範圍時個別排除使用)
        //[HttpPost]
        //public async Task<IActionResult> loginToRead(string userAccount)
        //{
        //    if (userAccount == null)
        //    {
        //        return RedirectToAction(nameof(loginToRead));
        //    }

        //    var userInfo = await dbContext.UserInfo
        //        .FirstOrDefaultAsync(m => m.UserAccount == userAccount);
        //    if (userInfo == null)
        //    {
        //        return RedirectToAction(nameof(loginToRead));
        //    }
        //    else
        //    {
        //        // 先將使用者的id 轉換成string
        //        var stringUserId = userInfo.Id.ToString();

        //        var varClaims = new List<Claim>
        //{
        //    new Claim(ClaimTypes.Name , userInfo.UserAccount),
        //    new Claim("userId", stringUserId)

        //};


        //        // 建構 ClaimsIdentity Cookie 用戶驗證物件的狀態存取案例
        //        var varClaimsIdentity = new ClaimsIdentity(varClaims, CookieAuthenticationDefaults.AuthenticationScheme);


        //        // 執行  ClaimsIdentity Cookie  用戶驗證物件的操作登入動作。(使用cookie 操作內部驗證狀態控管與流程執行)
        //        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(varClaimsIdentity));


        //        //return Content("ok");


        //        return RedirectToAction("Index", "mainpage");
        //    };


        //}
        [AllowAnonymous]
        public IActionResult chart()
        {

            return View();
        }

        public IActionResult mainpage()
        {

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [AllowAnonymous]        
        public List<GetDatas> GetQuery(int fmonnum, int fdaynum, int lmonnum, int ldaynum, string sex, string aname)
        {
            if (fmonnum == 0)
            {
                fmonnum = 1;
            }
            if (fdaynum == 0)
            {
                fdaynum = 1;
            }
            if (lmonnum == 0)
            {
                lmonnum = 12;
            }
            if (ldaynum == 0)
            {
                ldaynum = 31;
            }
            aname = "%"+ aname + "%";
            
            List<GetDatas> datas;
            if (sex.Equals("4"))
            {

                datas = dbContext.Database.SqlQueryRaw<GetDatas>
                (
                    "SELECT u.id, u.userAccount, u.usericon, u.gender, u.username, u.createtime, u.phonenumber \r\nFROM UserInfo u  WHERE MONTH(u.createtime) BETWEEN @fmonnum AND @lmonnum AND DAY(u.createtime) BETWEEN @fdaynum AND @ldaynum AND u.userAccount LIKE @aname AND u.gender = u.gender",
                    new MySqlParameter("@fmonnum", fmonnum),
                    new MySqlParameter("@lmonnum", lmonnum),
                    new MySqlParameter("@fdaynum", fdaynum),
                    new MySqlParameter("@ldaynum", ldaynum),                    
                    new MySqlParameter("@aname", aname)

                ).ToList();
                
                foreach (var data in datas)
                {
                    data.Usericon = urltobase64(data.Usericon);
                }
                

                return datas;
            }
            else
            {
                datas = dbContext.Database.SqlQueryRaw<GetDatas>
                (
                    "SELECT u.id, u.userAccount, u.usericon, u.gender, u.username, u.createtime, u.phonenumber \r\nFROM UserInfo u  WHERE MONTH(u.createtime) BETWEEN @fmonnum AND @lmonnum AND DAY(u.createtime) BETWEEN @fdaynum AND @ldaynum AND u.userAccount LIKE @aname AND u.gender = @aaa",
                    new MySqlParameter("@fmonnum", fmonnum),
                    new MySqlParameter("@lmonnum", lmonnum),
                    new MySqlParameter("@fdaynum", fdaynum),
                    new MySqlParameter("@ldaynum", ldaynum),
                    new MySqlParameter("@aaa", sex),
                    new MySqlParameter("@aname", aname)

                ).ToList();

                foreach (var data in datas)
                {
                    data.Usericon = urltobase64(data.Usericon);
                }

                return datas;
            }
            
        }

        public List<MainPagePost> GetMainPage()
        {
            var varClaims = HttpContext.User.Claims.ToList();
            // 把存在Cookie中的userId 取出來
            var id = varClaims.Where(x => x.Type == "userId").First().Value;
            
            List<MainPagePost> datas = dbContext.Database.SqlQueryRaw<MainPagePost>(
                "SELECT DISTINCT(SELECT DISTINCT uf.id FROM UserInfo uf LEFT JOIN FollowingList ff ON uf.id = ff.userID WHERE uf.id = @id) AS accountUser, u.id , u.userAccount, u.usericon, u.username, p.postId, pImg.imgURL, p.posttext, p.lat, p.lng, p.createtime, p.edittime, COUNT(DISTINCT c.commentId) AS commentCount, COUNT(DISTINCT l.likeId) AS likeCount, CASE WHEN EXISTS (SELECT 1 FROM Likes postlike WHERE postlike.postContextId = p.postId AND postlike.userLikedId = @id) THEN 1 ELSE 0 END AS isLiked, CASE WHEN EXISTS ( SELECT 1 FROM CollectionPost postCollect WHERE postCollect.postID = p.postId AND postCollect.userID = @id) THEN 1 ELSE 0 END AS isCollected FROM UserInfo u INNER JOIN Post p ON u.id = p.userId LEFT JOIN Comments c ON p.postId = c.postContextId LEFT JOIN Likes l ON p.postId = l.postContextId LEFT JOIN PostImg pImg ON p.postId = pImg.postId AND pImg.imgSerial = 0 WHERE u.id = @id OR u.id IN (SELECT DISTINCT fl.followingUserID FROM FollowingList fl JOIN Post post ON fl.followingUserID = post.userId WHERE fl.userID = @id ) AND NOT EXISTS ( SELECT 1 FROM Blacklist b WHERE b.blockedUserID = u.id AND b.blockerID = (SELECT DISTINCT ub.id FROM UserInfo ub LEFT JOIN FollowingList fb ON ub.id = fb.userID WHERE ub.id = @id)) GROUP BY p.postId ORDER BY GREATEST(p.edittime, p.createtime) DESC"
                ,new MySqlParameter("@id", id)
                ).ToList() ;

            return datas;
        }

        //protected void Button1_Click(object sender, EventArgs e)
        //{
        //    //因為是兩個argument，所以記得要空格
        //    Process.Start(@"C:\Users\User\.nuget\packages\haukcode.wkhtmltopdfdotnet\1.5.86", @"https://localhost:7282/Home/mainpage C:下載\myFileName.pdf");

        //}

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Dictionary<String, String> credentials)
        {
            String identifier = credentials["username"];
            String password = credentials["password"];
            //List<Models.UserInfo> user = new List<Models.UserInfo>();
            //user = dbContext.UserInfo.ToList();
            //user = loginService.verify(identifier, password);
            Models.UserInfo user = loginService.verify(identifier, password);
            var getid = user.Id.ToString();
            //Console.WriteLine(getid);
            if (user != null)
            {
                //var userid = user.Id;
                var varClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name , identifier.ToString()),
                    new Claim("userId", getid)
                    
                };

                var varClaimsIdentity = new ClaimsIdentity(varClaims, CookieAuthenticationDefaults.AuthenticationScheme);


                // 執行  ClaimsIdentity Cookie  用戶驗證物件的操作登入動作。(使用cookie 操作內部驗證狀態控管與流程執行)
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(varClaimsIdentity));

                
                return Ok(user);

            }
            else
            {
                return BadRequest("帳號或密碼錯誤，請重新輸入");
            }
        }

        //[Route("Home/LikeUsers/{postContextId?}")]
        //public List<LikeUsers> LikeUsers(int? postContextId)
        //{

                     

        //    List<LikeUsers> datas = dbContext.Database.SqlQueryRaw<LikeUsers>("SELECT  l.postContextId postContextId, l.userLikedId userLikedId, uf.usericon usericon, uf.username username, uf.userAccount useraccount FROM UserInfo AS u LEFT JOIN Post p ON p.userId = u.id LEFT JOIN Likes AS l ON p.postId = l.postContextId LEFT JOIN UserInfo uf ON l.userLikedId = uf.id WHERE postContextId = @postContextId ORDER BY l.likeTime DESC"
        //        , new MySqlParameter("@postContextId", postContextId)
        //        ).ToList();
           


        //    return datas;
        //}


        //轉換urltobase64
        public String urltobase64(String url)
        {
            try
            {
                WebClient webClient = new();
                byte[] Bytes = webClient.DownloadData(url);
                string Base64 = Convert.ToBase64String(Bytes);
                Base64 = "data:image/jpg;base64," + Base64;
                return Base64;

            }
            catch (Exception e)
            {
                return null;
            }
        }


        [AllowAnonymous]
        public IActionResult download()
        {

            Console.WriteLine(HttpContext.Session.Get("excel"));
            byte[] file = HttpContext.Session.Get("excel");
            return File(file, "application/vnd.ms-excel", "exportUserDataList.xlsx");
            
        }

        //public IActionResult exportexcel() 
        //{
        //    List<UserInfo> exportusers = new List<UserInfo>();
        //    exportusers = dbContext.UserInfo.ToList();

        //    var selectColums = exportusers.Select(u => new
        //    {                
        //        u.userAccount,
        //        u.username,
        //        u.phonenumber,
        //        u.email,
        //        u.usericon
        //    });

        //    var memoryStream = new MemoryStream();
        //    memoryStream.SaveAs(selectColums);
        //    memoryStream.Seek(0, SeekOrigin.Begin);
        //    return new FileStreamResult(memoryStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        //    {
        //        FileDownloadName = "List.xlsx"
        //    };
        //}

        ////public IActionResult Export()
        ////{
        ////    var columnNameList = typeof(UserInfo).GetProperties().Select(c => c.Name).ToList();

        ////    string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        ////    string fileName = "exportUserDataList.xlsx";
        ////    DataSet userlist = new DataSet();

        ////    userlist.ReadXml("data.xml");
        ////    userlist.ReadXmlSchema("data-schema.xml");
        ////    return (IActionResult)userlist.Tables[0];

        ////}




        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
