using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.VariantTypes;
using System.Runtime.InteropServices;

namespace DropCats.Models
{
    public class MainPagePost
    {
        public int accountUser { get; set; }

        public int id { get; set; }

        public string? userAccount { get; set; } 

        public string? usericon { get; set; } 

        public string? username { get; set; } 

        public int? postId { get; set; }

        public string? imgURL { get; set; } 

        public string? posttext { get; set; } 

        public double? lat { get; set; }

        public double? lng { get; set; }

        public DateTime? createtime { get; set; }

        public DateTime? edittime { get; set; }

        public long? commentCount { get; set; }

        public long? likeCount { get; set; }

        public int? isLiked { get; set; }

        public int? isCollected { get; set; }
    }
}
