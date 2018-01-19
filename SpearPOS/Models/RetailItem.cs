using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models
{
    public class RetailItem : CatalogEntityModel<long?>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string UnitName { get; set; }
        public string TranslatedName { get; set; }
        public string BarCode { get; set; }
        public double BuyPrice { get; set; }
        public double StockAmount { get; set; }
        public double DiscountRate { get; set; }
        public bool Visible { get; set; }
        public bool DisableWhenStockAmountIsZero { get; set; }
        public int ButtonColor { get; set; }
        public int TextColor { get; set; }
        public string ImageId { get; set; }
        public bool ShowImageOnly { get; set; }
        public bool FractionalUnit { get; set; }
        public int DefaultSellPortion { get; set; }
        public long GroupId { get; set; }
        public int TaxId { get; set; }
        public int RecipeId { get; set; }
        public int PrinterGroupId { get; set; }

    }
}
