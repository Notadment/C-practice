using DocumentFormat.OpenXml.VariantTypes;

namespace DropCats.Models
{
    public class LikeUsers
    {
        public int postContextId { get; set; }
        public int userLikedId { get; set; }
        public string? usericon { get; set; }
        public string? username { get; set; }
        public string? useraccount { get; set; }
    }
}
