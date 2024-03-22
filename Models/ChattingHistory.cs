using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class ChattingHistory
{
    public int ChattingHistoryId { get; set; }

    public DateTime ChattingTime { get; set; }

    public string? Messages { get; set; }

    public int? ReceiverId { get; set; }

    public int? SenderId { get; set; }
}
