using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class Blacklist
{
    public int BlacklistId { get; set; }

    public DateTime BlockTime { get; set; }

    public int? BlockedUserId { get; set; }

    public int? BlockerId { get; set; }
}
