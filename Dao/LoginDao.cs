using DropCats.Data;
using DropCats.Models;

namespace DropCats.Dao
{
    public class LoginDao
    {
        private readonly ApplicationDbContext appcontext;

        public LoginDao(ApplicationDbContext context)
        {
            appcontext = context;
        }

        public UserInfo FindByUserAccount(string userAccount)
        {
            return appcontext.UserInfo.FirstOrDefault(u => u.UserAccount == userAccount);
        }
        public UserInfo FindByPhonenumber(string phonenumber)
        {
            return appcontext.UserInfo.FirstOrDefault(u => u.Phonenumber == phonenumber);
        }
        public UserInfo FindByEmail(string email)
        {
            return appcontext.UserInfo.FirstOrDefault(u => u.Email == email);
        }
    }
}
