using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models
{
    public class ItemModifier : CatalogEntityModel<int?>
    {
        public string Name;
        public double Price;
        public double ExtraPrice;
        public int ButtonColor;
        public bool Enable;
        public int TextColor;
        public bool FixedPrice;
        public bool PrintToKitchen;
        public bool SectionWisePricing;
        public int GroupId;
        public int TaxId;
    }
}
