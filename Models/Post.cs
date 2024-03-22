namespace DropCats.Models;

public partial class Post
{
    public int PostId { get; set; }

    public DateTime? Createtime { get; set; }

    public DateTime? Edittime { get; set; }

    public decimal? Lat { get; set; }

    public decimal? Lng { get; set; }

    public string? Posttext { get; set; }

    public int? UserId { get; set; }

    public int? PostType { get; set; }
}
