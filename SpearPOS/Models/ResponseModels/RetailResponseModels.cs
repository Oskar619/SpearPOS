using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models.ResponseModels
{
    public class RetailTicket {
        public long Id { get; set; }
        public bool Settled { get; set; }
        public bool Paid { get; set; }
        public double SubTotal { get; set; }
        public double TotalDiscount { get; set; }
        public double TotalTax { get; set; }
        public double TotalPrice { get; set; }
        public double PaidAmount { get; set; }
        public double DueAmount { get; set; }
        public int GuestNumber { get; set; }
        public string Status { get; set; }
        public string CreationDate { get; set; }
        public string ClosingDate { get; set; }
        public int TableId { get; set; }
        public bool Voided { get; set; }
        public string VoidedByUser { get; set; }
        public string VoidedReason { get; set; }
        public string TicketType { get; set; }
    }

    public class RetailTicketItem {
        public long Id { get; set; }
        public long ItemId { get; set; }
        public bool Printed { get; set; }
        public bool Paid { get; set; }
        public double Price { get; set; }
        public bool Delivered { get; set; }
        public bool Voided { get; set; }
        public bool Beverage { get; set; }
        public string GroupName { get; set; }
        public string CategoryName { get; set; }
        public double Discount { get; set; }
        public RetailTicketItemModifier[] Modifiers { get; set; }
        public string ItemName { get; set; }
        public double ItemPrice { get; set; }
        public double ItemTaxRate { get; set; }
        public string ItemUnitName { get; set; }
        public bool Print { get; set; }
        public int PrinterGroupId { get; set; }
        public int SeatNumber { get; set; }
        public string Status { get; set; }
        public double TotalPrice { get; set; }
        public double TotalPriceWithoutModifiers { get; set; }
    }

    public class RetailItemModifier {
        public int? Id { get; set; }
        public string Name { get; set; }
        public double Cost { get; set; }
        public int SortOrder { get; set; }
    }

    public class RetailItemModifierGroup {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int WorkflowOrder { get; set; }
        public bool Required { get; set; }
        public RetailItemModifier[] Modifiers { get; set; }
    }

    public class RetailItemListItem {
        public long? Id { get; set; }
        public string Description { get; set; }
        public double Cost { get; set; }
        public int SortOrder { get; set; }
        public RetailItemModifierGroup[] ModifierGroups;
    }

    public class RetailGroupListItem {

        public int? Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public int TextColor { get; set; }
        public int ButtonColor { get; set; }
        public RetailItemListItem[] Items { get; set; }
        public int SortOrder { get; set; }
    }

    public class RetailCategoryListItem {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int ButtonColor { get; set; }
        public int TextColor { get; set; }
        public bool Beverage { get; set; }
        public int SortOrder { get; set; }
        public RetailGroupListItem[] Groups { get; set; }
    }

    public class RetailTicketItemModifier {
        public long? Id { get; set; }
        public long TicketId { get; set; }
        public long TicketItemId { get; set; }
        public string ModifierName { get; set; }
        public double ModifierCost { get; set; }
    }
}