using DropCats.Dao;
using DropCats.Models;
using System.Text.RegularExpressions;

namespace DropCats.Service
{
    public class LoginService
    {
        private readonly LoginDao loginDao;
        public LoginService(LoginDao loginDao)
        {
            this.loginDao = loginDao;
        }

        public UserInfo verify(string identifier, string password)
        {
            var userInfo = new UserInfo();
            if (identifier.Contains("@"))
            {
                userInfo = loginDao.FindByEmail(identifier);
            }
            else if (Regex.IsMatch(identifier, "^09\\d{8}$"))
            {
                userInfo = loginDao.FindByPhonenumber(identifier);
            }
            else
            {
                userInfo = loginDao.FindByUserAccount(identifier);
            }

            if (userInfo != null && validatePassword(password, userInfo.Password, userInfo))
            {
                Console.WriteLine("ok");
                return userInfo;
            }

            return null;
        }

        public bool validatePassword(string inputPasswd, string storedPasswd, UserInfo user)
        {
            if (storedPasswd.StartsWith("$2a$"))
            {
                var bcrypt = BCrypt.Net.BCrypt.Verify(inputPasswd, storedPasswd);
                return bcrypt;
            }
            else
            {
                return false;
            }
        }
    }
}
