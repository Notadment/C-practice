using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class FanList
{
    public int FanListId { get; set; }

    public int? FanId { get; set; }

    public DateTime? FollowTime { get; set; }

    public int? UserId { get; set; }
}
