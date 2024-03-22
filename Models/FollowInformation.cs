using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class FollowInformation
{
    public int Id { get; set; }

    public DateTime? FansFollowTime { get; set; }

    public string? FansIcon { get; set; }

    public int? FansId { get; set; }

    public string? FansUserAccount { get; set; }

    public int? FollowedUserId { get; set; }
}
