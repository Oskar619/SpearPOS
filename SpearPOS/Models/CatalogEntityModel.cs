using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models
{
    public class CatalogEntityModel<Tnumber>
    {
        [Key]
        public Tnumber Id { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? UpdateDate { get; set; }
        public DateTime CreationDate { get; set; }
        public string CreationUserId { get; set; }
        public string UpdateUserId { get; set; }
        public int SortOrder { get; set; }
    }
}
