using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class CollectionPost
{
    public int CollectionPostId { get; set; }

    public DateTime CollectTime { get; set; }

    public int? PostId { get; set; }

    public int? UserId { get; set; }

    public int? CollectorId { get; set; }
}
