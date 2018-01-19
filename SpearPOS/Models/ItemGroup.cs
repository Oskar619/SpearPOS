using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models
{
    public class ItemGroup : CatalogEntityModel<int?>
    {
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public int ButtonColor { get; set; }
        public int TextColor { get; set; }
        public int CategoryId { get; set; }
    }
}
