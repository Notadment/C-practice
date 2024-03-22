using DropCats.Data;
using DropCats.Models;
using DropCats.Service;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace DropCats.Controllers
{
    public class LoginController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext dbContext;
        private readonly LoginService loginService;
        public LoginController(ILogger<HomeController> logger, ApplicationDbContext context, LoginService login)
        {
            _logger = logger;
            dbContext = context;
            this.loginService = login;
        }

        //public IActionResult mainpage()
        //{
        //    L
        //    return View(userinfo);
        //}

        // 用來接收用戶登入時輸入的帳號
    //[AllowAnonymous] // 允許匿名登入 (當驗證檢查套用全域範圍時個別排除使用)
    //[HttpPost]
    //public async Task<IActionResult> loginToRead(string userAccount)
    //    {
    //        if (userAccount == null)
    //        {
    //            return RedirectToAction(nameof(loginToRead));
    //        }

    //        var userInfo = await dbContext.UserInfo
    //            .FirstOrDefaultAsync(m => m.UserAccount == userAccount);
    //        if (userInfo == null)
    //        {
    //            return RedirectToAction(nameof(loginToRead));
    //        }
    //        else
    //        {
    //            // 先將使用者的id 轉換成string
    //            var stringUserId = userInfo.Id.ToString();

    //            var varClaims = new List<Claim>
    //    {
    //        new Claim(ClaimTypes.Name , userInfo.UserAccount),
    //        new Claim("userId", stringUserId),

    //    };


    //            // 建構 ClaimsIdentity Cookie 用戶驗證物件的狀態存取案例
    //            var varClaimsIdentity = new ClaimsIdentity(varClaims, CookieAuthenticationDefaults.AuthenticationScheme);


    //            // 執行  ClaimsIdentity Cookie  用戶驗證物件的操作登入動作。(使用cookie 操作內部驗證狀態控管與流程執行)
    //            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(varClaimsIdentity));


    //            //return Content("ok");


    //            return RedirectToAction("Index", "MainPage");
    //        };


        //}
        
    }
}
