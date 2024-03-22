namespace DropCats.Models;

public partial class SurfingHistory
{
    public int SurfingHistoryId { get; set; }

    public int? PostId { get; set; }

    public DateTime? SurfingTime { get; set; }

    public int? SurfingUserId { get; set; }
}
