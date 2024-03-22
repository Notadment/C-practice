using System;
using System.Collections.Generic;

namespace DropCats.Models;

public partial class UserPreferType
{
    public int UserPreferTypesId { get; set; }

    public int? Score { get; set; }

    public int? TypeId { get; set; }

    public int? UserId { get; set; }
}
