using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models.ResponseModels
{
    public class CategoryResponseModels
    {

        public class CategoryListItem{
            public int? Id { get; set; }
            public string Name { get; set; }
            public int? ButtonColor { get; set; }
            public int? TextColor { get; set; }
            public bool Beverage { get; set; }
            public bool IsDeleted { get; set; }
            public DateTime? UpdateDate { get; set; }
            public DateTime CreationDate { get; set; }
            public string CreationUserId { get; set; }
            public int SortOrder { get; set; }
            public string UpdateUserId { get; set; }
        }
    }
}