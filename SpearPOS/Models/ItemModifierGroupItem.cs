using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models
{
    public class ItemModifierGroupItem : CatalogEntityModel<int?>
    {
        public int MaxQty;
        public int MinQty;
        public int ItemModifierGroupId;
        public int RetailItemId;
    }
}
