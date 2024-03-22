using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class SettingInform
{
    public int Id { get; set; }

    public byte? FollowInformState { get; set; }

    public byte? LikeInformState { get; set; }

    public byte? OpenState { get; set; }

    public byte? PostInformState { get; set; }

    public DateTime? SettingInformationTime { get; set; }

    public string UserAccount { get; set; } = null!;

    public int? UserId { get; set; }

    public string? Gender { get; set; }
}
