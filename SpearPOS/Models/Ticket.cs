using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models
{
    public class Ticket
    {
        [Key]
        public long Id { get; set; }
        public String GlobalId { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ClosingDate { get; set; }
        public DateTime ActiveDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public int CreationHour { get; set; }
        public bool Paid { get; set; }
        public bool Voided { get; set; }
        public string VoidReason { get; set; }
        public bool Wasted { get; set; }
        public bool Refunded { get; set; }
        public bool Settled { get; set; }
        public bool DrawerReseted { get; set; }
        public double SubTotal { get; set; }
        public double TotalDiscount { get; set; }
        public double TotalTax { get; set; }
        public double TotalPrice { get; set; }
        public double PaidAmount { get; set; }
        public double DueAmount { get; set; }
        public double AdvanceAmount { get; set; }
        public int GuestNumber { get; set; }
        public string Status { get; set; }
        public bool BarTab { get; set; }
        public bool IsTaxExempt { get; set; }
        public bool IsReOpened { get; set; }
        public double ServiceCharge { get; set; }
        public double DeliveryCharge { get; set; }
        public int CustomerId { get; set; }
        public string DeliveryAddress { get; set; }
        public bool CustomerPickup { get; set; }
        public string DeliveryExtraInfo { get; set; }
        public string TicketType { get; set; }
        public int ShiftId { get; set; }
        public int OwnerId { get; set; }
        public int DriverId { get; set; }
        public int GratuityId { get; set; }
        public string VoidByUser { get; set; }
        public int TerminalId { get; set; }
        public TicketItem[] Items { get; set; }
        public long TableId { get; set; }
    }
}
