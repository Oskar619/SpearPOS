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
            public int ButtonColor { get; set; }
            public int TextColor { get; set; }
            public bool Beverage { get; set; }
        }
    }
}
