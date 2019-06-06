using DaProject.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DaProject.Repository
{
    public class DaProjectDbContext: DbContext
    {
        public DaProjectDbContext(DbContextOptions<DaProjectDbContext> options) : base(options)
        {
        }

        public DbSet<ProjectTask> ProjectTasks { get; set; }
        public DbSet<Project> Projects { get; set; }
    }
}
