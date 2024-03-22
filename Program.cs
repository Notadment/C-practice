using DropCats.Dao;
using DropCats.Data;
using DropCats.Service;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// AspNetCore.Authentication 全域範圍的驗證機制組態設置 === (全環境 cookie 套用)
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(option =>
{

    // 未登入時會自動移轉到此網址
    option.LoginPath = new PathString("/Home/Index");


    // 未授權角色時會自動移轉到此網址
    option.AccessDeniedPath = new PathString("/Home/Index");

    // 登入後秒後會失效
    option.ExpireTimeSpan = TimeSpan.FromSeconds(99999999);




});
//=========AspNetCore.Authentication 全域範圍的驗證機制組態設置 === (全環境 cookie 套用)========

//   AspNetCore.Authentication 用戶驗證操作機制註冊ID(在Controller 範圍外使用方式)
builder.Services.AddHttpContextAccessor();



//=== AspNetCore.Authentication 全域範圍的驗證機制物件設定========
builder.Services.AddMvc(option =>
{
    // 專案內所有控制項都需要驗證
    // 可以在Controller 上面貼上 [AllowAnonymous]屬性標籤來排除
    option.Filters.Add(new AuthorizeFilter());




});

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connection = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseMySql(connection, ServerVersion.AutoDetect(connection));
}
);

builder.Services.AddScoped<LoginDao>();
builder.Services.AddScoped<LoginService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();


// ASP用戶登入驗證操作機制使用 ===
// 執行順序不能顛倒不然驗證功能會無法正常工作。
app.UseCookiePolicy();
app.UseAuthentication();
app.UseAuthorization();
// ===/ AspNetCore.UseAuthentication用戶登入驗證操作機制使用

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");




app.Run();
