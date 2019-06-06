using DaProject.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DaProject.Models
{
    [Table("Project")]
    public class Project : BaseModel
    {
        [Key]
        public int Id { get; set; }
        public string ProjectName { get; set; }

        [DataType(DataType.Html)]
        public string ProjectDescription { get; set; }

        public DateTime ProjectStartDate { get; set; }
        public DateTime ProjectEndDate { get; set; }
        public int StatusId { get; set; }

        public virtual ICollection<ProjectTask> ProjectTasks { get; set; }

        [ForeignKey("StatusId")]
        public virtual Status Status { get; set; }
    }
}
