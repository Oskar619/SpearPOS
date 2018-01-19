using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models
{
    public class Terminal : CatalogEntityModel<int?>
    {
        public string Name { get; set; }
        public string TerminalKey { get; set; }
        public double OpeningBalance { get; set; }
        public double CurrentBalance { get; set; }
        public bool HasCashDrawer { get; set; }
        public bool InUse { get; set; }
        public bool Active { get; set; }
        public string Location { get; set; }
        public int FloorId { get; set; }
        public int AssignedUser { get; set; }
    }
}
