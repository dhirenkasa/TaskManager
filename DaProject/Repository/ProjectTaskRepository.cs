using DaProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DaProject.Repository
{
    public interface IProjectTaskRepository : IGenericRepository<ProjectTask>
    {
        IEnumerable<ProjectTask> GetTaskList();
        IEnumerable<ProjectTask> GetProjectTaskByProjectId(int id);
        bool CreateProjectTask(ProjectTask projectTask);
        bool UpdateProjectTask(ProjectTask projectTask);
        ProjectTask GetProjectTaskByProjectTaskId(int taskId);
    }

    public class ProjectTaskRepository : GenericRepository<ProjectTask>, IProjectTaskRepository
    {
        public ProjectTaskRepository(DaProjectDbContext context) : base(context)
        {

        }

        public IEnumerable<ProjectTask> GetTaskList()
        {
            List<ProjectTask> projectTaskList = Getall().OrderByDescending(c => c.TaskName).ToList();
            return projectTaskList;
        }

        public IEnumerable<ProjectTask> GetProjectTaskByProjectId(int id)
        {
            List<ProjectTask> projectTaskList = Getall().Where(t => t.ProjectId == id).OrderByDescending(c => c.TaskName).ToList();
            return projectTaskList;
        }

        public ProjectTask GetProjectTaskByProjectTaskId(int taskId)
        {
            ProjectTask projectTask = Getall().Where(t => t.Id == taskId).OrderByDescending(c => c.TaskName).FirstOrDefault();
            return projectTask;
        }

        public bool UpdateProjectTask(ProjectTask projectTask)
        {
            Update(projectTask);
            return true;
        }

        public bool CreateProjectTask(ProjectTask projectTask)
        {
            try
            {
                Create(projectTask);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
