using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models.ResponseModels
{
    public class OpenTicketListItem
    {
        public long Id { get; set; }
        public bool Settled { get; set; }
        public bool Paid { get; set; }
        public bool Voided { get; set; }
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
        public long TableId { get; set; }
    }
}