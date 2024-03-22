using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class Information
{
    public int Id { get; set; }

    public int? OthersUserId { get; set; }

    public int? PostId { get; set; }

    public DateTime? PostSettingTime { get; set; }

    public string? PostType { get; set; }

    public string UserAccount { get; set; } = null!;

    public int? UserId { get; set; }

    public string? Usericon { get; set; }
}
