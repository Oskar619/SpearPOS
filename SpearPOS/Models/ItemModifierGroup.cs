using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models
{
    public class ItemModifierGroup : CatalogEntityModel<int?>
    {
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public bool Enabled { get; set; }
        public bool Exclusived { get; set; }
        public bool Required { get; set; }
    }
}
