using DaProject.Models;
using DaProject.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DaProject.Repository
{
    public interface IProjectRepository : IGenericRepository<Project>
    {
        IEnumerable<Project> GetProjectList();
        Project GetProjectById(int id);
        bool CreateProject(Project project);
        bool UpdateProject(Project project);
    }

    public class ProjectRepository : GenericRepository<Project>, IProjectRepository
    {
        public ProjectRepository(DaProjectDbContext context) : base(context)
        {

        }

        public IEnumerable<Project> GetProjectList()
        {
            List<Project> projectList = Getall().OrderByDescending(c => c.CreatedOn).ToList();
            return projectList;
        }

        public bool CreateProject(Project project)
        {
            try
            {
                Create(project);
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public Project GetProjectById(int id)
        {
            //var expression = CommonFunction.GetExpressionCondition<Project>("Id", id);
            Project projectdetails = GetbyCondition(x=>x.Id == id);
            return projectdetails;
        }

        public bool UpdateProject(Project project)
        {
            Update(project);
            return true;
        }
    }
}
