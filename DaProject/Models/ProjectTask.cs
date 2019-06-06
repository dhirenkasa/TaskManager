using DaProject.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DaProject.Models
{
    [Table("ProjectTask")]
    public class ProjectTask: BaseModel
    {
        [Key]
        public int Id { get; set; }
        public string TaskName { get; set; }
        public string TaskDetail { get; set; }
        public string UsefulLinks { get; set; }
        public DateTime AssignedDate { get; set; }
        public DateTime EndDate { get; set; }
        public int UserId { get; set; }
        public string Comments { get; set; }
        public int ProjectId { get; set; }
        public int StatusId { get; set; }

        [ForeignKey("ProjectId")]
        public virtual Project Project { get; set; }

        [ForeignKey("StatusId")]
        public virtual Status Status { get; set; }
    }
}
