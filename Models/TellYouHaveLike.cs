using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class TellYouHaveLike
{
    public int Id { get; set; }

    public DateTime? CreateTime { get; set; }

    public int? GiveYouLikePostId { get; set; }

    public int? GiveYouLikeUserId { get; set; }

    public string? GiveYouLikeUsericon { get; set; }

    public string? GiveYouLikeUserAccount { get; set; }

    public DateTime? LikeTime { get; set; }

    public int? PostType { get; set; }

    public int? PostUserId { get; set; }

    public int? GivelikePostId { get; set; }

    public int? GivelikeUserId { get; set; }
}
