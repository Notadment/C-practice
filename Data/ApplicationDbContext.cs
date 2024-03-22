using DropCats.Models;
using Microsoft.EntityFrameworkCore;

namespace DropCats.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<UserInfo> UserInfo { get; set; }

        //public DbSet<MainPagePost> mainPagePosts { get; set; }

        public DbSet<GetDatas> Datas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GetDatas>().HasNoKey();
        }
    }
}
