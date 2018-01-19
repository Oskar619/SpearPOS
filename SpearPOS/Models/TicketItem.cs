using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models
{
    public class TicketItem
    {
        [Key]
        public long Id { get; set; }
        public long ItemId { get; set; }
        public int ItemCount { get; set; }
        public double ItemQty { get; set; }
        public string ItemName { get; set; }
        public string ItemUnitName { get; set; }
        public string GroupName { get; set; }
        public string CategoryName { get; set; }
        public double ItemPrice { get; set; }
        public double ItemTaxRate { get; set; }
        public double SubTotal { get; set; }
        public double SubTotalWithoutModifiers { get; set; }
        public double Discount { get; set; }
        public double TaxAmount { get; set; }
        public double TaxAmountWithoutModifiers { get; set; }
        public double TotalPrice { get; set; }
        public double TotalPriceWithoutModifiers { get; set; }
        public bool Beverage { get; set; }
        public bool InventoryHandled { get; set; }
        public bool PrintToKitchen { get; set; }
        public bool TreatAsSeat { get; set; }
        public int SeatNumber { get; set; }
        public bool FractionalUnit { get; set; }
        public bool HasModifiers { get; set; }
        public bool PrintedToKitchen { get; set; }
        public string Status { get; set; }
        public bool StockAmountAdjusted { get; set; }
        public int SizeModifierId { get; set; }
        public long TicketId { get; set; }
        public int PrinterGroupId { get; set; }
        public bool Paid { get; internal set; }
        public double Price { get; internal set; }
        public bool Delivered { get; internal set; }
        public bool Voided { get; internal set; }
    }
}
