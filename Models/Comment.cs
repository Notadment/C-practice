using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class Comment
{
    public int CommentId { get; set; }

    public DateTime? CommentTime { get; set; }

    public string? Comments { get; set; }

    public int? PostContextId { get; set; }

    public int? UserId { get; set; }
}
