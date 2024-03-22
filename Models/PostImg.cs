using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class PostImg
{
    public int ImgId { get; set; }

    public int? ImgSerial { get; set; }

    public string ImgUrl { get; set; } = null!;

    public int? PostId { get; set; }
}
