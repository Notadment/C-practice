namespace DropCats.Models;

public partial class FollowingList
{
    public int FollowingListId { get; set; }

    public DateTime? FollowTime { get; set; }

    public int? FollowingUserId { get; set; }

    public int? UserId { get; set; }
}
