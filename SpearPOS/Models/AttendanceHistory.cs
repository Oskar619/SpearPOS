using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebPOS.Models
{
    public class AttendanceHistory
    {
        [Key]
        public long Id { get; set; }
        public DateTime OutTime { get; set; }
        public DateTime InTime { get; set; }
        public int OutHour { get; set; }
        public int InHour { get; set; }
        public bool ClockOut { get; set; }
        public int UserId { get; set; }
        public int ShiftId { get; set; }
        public int TerminalId { get; set; }
    }
}
