using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class Like
{
    public int LikeId { get; set; }

    public DateTime? LikeTime { get; set; }

    public int? PostContextId { get; set; }

    public int? UserLikedId { get; set; }
}
