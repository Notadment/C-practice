using DropCats.Dao;
using DropCats.Data;
using DropCats.Service;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// AspNetCore.Authentication ����d�����Ҿ���պA�]�m === (������ cookie �M��)
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(option =>
{

    // ���n�J�ɷ|�۰ʲ���즹���}
    option.LoginPath = new PathString("/Home/Index");


    // �����v����ɷ|�۰ʲ���즹���}
    option.AccessDeniedPath = new PathString("/Home/Index");

    // �n�J����|����
    option.ExpireTimeSpan = TimeSpan.FromSeconds(99999999);




});
//=========AspNetCore.Authentication ����d�����Ҿ���պA�]�m === (������ cookie �M��)========

//   AspNetCore.Authentication �Τ����Ҿާ@������UID(�bController �d��~�ϥΤ覡)
builder.Services.AddHttpContextAccessor();



//=== AspNetCore.Authentication ����d�����Ҿ����]�w========
builder.Services.AddMvc(option =>
{
    // �M�פ��Ҧ�������ݭn����
    // �i�H�bController �W���K�W [AllowAnonymous]�ݩʼ��Ҩӱư�
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


// ASP�Τ�n�J���Ҿާ@����ϥ� ===
// ���涶�Ǥ����A�ˤ��M���ҥ\��|�L�k���`�u�@�C
app.UseCookiePolicy();
app.UseAuthentication();
app.UseAuthorization();
// ===/ AspNetCore.UseAuthentication�Τ�n�J���Ҿާ@����ϥ�

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");




app.Run();
