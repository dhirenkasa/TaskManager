using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DaProject.Models
{
    public class BaseModel
    {
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<DateTime> ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
    }
}
