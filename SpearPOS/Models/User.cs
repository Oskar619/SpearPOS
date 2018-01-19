using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebPOS.Models
{
    public class User
    {
        public long AutoId { get; set; }
        [Key]
        public long UserId { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Rfc { get; set; }
        public string Ssn { get; set; }
        public double CostPerHour { get; set; }
        public double CostPerDay { get; set; }
        public bool ClockedIn { get; set; }
        public DateTime LastClockIn { get; set; }
        public DateTime LastClockOut { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsDriver { get; set; }
        public bool AvailableForDelivery { get; set; }
        public bool Active { get; set; }
        public int ShiftId { get; set; }
        public long CurrentTerminal { get; set; }
        public int UserType { get; set; }
    }
}
