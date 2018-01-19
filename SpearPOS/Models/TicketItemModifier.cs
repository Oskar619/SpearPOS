using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models
{
    public class TicketItemModifier : CatalogEntityModel<long?>
    {
        public long ItemId { get; set; }
        public long GroupId { get; set; }
        public int ItemCount { get; set; }
        public string ModifierName { get; set; }
        public double ModifierPrice { get; set; }
        public double ModifierTaxRate { get; set; }
        public int ModifierType { get; set; }
        public double SubTotalPrice { get; set; }
        public double TotalPrice { get; set; }
        public double TaxAmount { get; set; }
        public bool InfoOnly { get; set; }
        public string SectionName { get; set; }
        public string MultiplierName { get; set; }
        public bool PrintToKitchen { get; set; }
        public bool SectionWisePricing { get; set; }
        public string Status { get; set; }
        public bool PrintedToKitchen { get; set; }
        public long TicketItemId { get; set; }

    }
}
