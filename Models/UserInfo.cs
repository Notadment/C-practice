using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class UserInfo
{
    public int Id { get; set; }

    public DateTime? Createtime { get; set; }

    public DateTime? Edittime { get; set; }

    public string Email { get; set; } = null!;

    public int? Gender { get; set; }

    public string? Introduction { get; set; }

    public string Password { get; set; } = null!;

    public string Phonenumber { get; set; } = null!;

    public string UserAccount { get; set; } = null!;

    public string? Usericon { get; set; }

    public string? Username { get; set; }

    public string? ResetToken { get; set; }

    public DateTime? TokenTime { get; set; }

    public string? Lineid { get; set; }

    public string? Lineprofile { get; set; }
}
