using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DaProject.Models;
using DaProject.Repository;
using DaProject.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace DaProject.Controllers
{
    [Route("api/[controller]")]
    public class ProjectTaskController : Controller
    {
        public readonly IProjectTaskRepository _projectTaskRepository;
        public ProjectTaskController(IProjectTaskRepository projectTaskRepository)
        {
            _projectTaskRepository = projectTaskRepository;
        }

        [HttpGet("[action]")]
        public ObjectResult GetAllProjectTask()
        {
            try
            {
                IEnumerable<ProjectTask> projectList = _projectTaskRepository.GetTaskList();
                return Ok(new CommonModel()
                {
                    Data = projectList,
                    Message = "Project Task List fetched",
                    StatusCode = 200
                });
            }
            catch (Exception ex)
            {
                return Ok(new CommonModel()
                {
                    Data = ex.Message,
                    Message = "Error in fetching project tasks",
                    StatusCode = 201
                });
            }
        }

        [HttpGet("[action]")]
        public ObjectResult GetAllProjectTaskByProjectId(int id)
        {
            try
            {
                IEnumerable<ProjectTask> projectList = _projectTaskRepository.GetProjectTaskByProjectId(id);
                return Ok(new CommonModel()
                {
                    Data = projectList,
                    Message = "Project Task List fetched",
                    StatusCode = 200
                });
            }
            catch (Exception ex)
            {
                return Ok(new CommonModel()
                {
                    Data = ex.Message,
                    Message = "Error in fetching project tasks",
                    StatusCode = 201
                });
            }
        }

        [HttpGet("[action]")]
        public ObjectResult GetProjectTaskById(int id)
        {
            try
            {
                ProjectTask projectTask = _projectTaskRepository.GetProjectTaskByProjectTaskId(id);
                return Ok(new CommonModel()
                {
                    Data = projectTask,
                    Message = "Project Task details fetched",
                    StatusCode = 200
                });
            }
            catch (Exception ex)
            {
                return Ok(new CommonModel()
                {
                    Data = ex.Message,
                    Message = "Error in fetching project task details",
                    StatusCode = 201
                });
            }
        }


        [HttpPost("[action]")]
        public ObjectResult CreateProjectTask(ProjectTask projectTask)
        {
            projectTask.CreatedBy = 1;
            projectTask.CreatedOn = DateTime.Now;
            projectTask.ModifiedBy = null;
            projectTask.ModifiedOn = null;
            projectTask.StatusId = (int)ProjectStatus.NotStarted;
            if (_projectTaskRepository.CreateProjectTask(projectTask))
            {
                return Ok(new CommonModel()
                {
                    Data = true,
                    Message = "Task created successfully",
                    StatusCode = 200
                });
            }
            else
            {
                return Ok(new CommonModel()
                {
                    Data = false,
                    Message = "Error in creating Task",
                    StatusCode = 200
                });
            }
        }

        [HttpPost("[action]")]
        public ObjectResult UpdateProjectTask(ProjectTask projectTask)
        {
            ProjectTask projectTaskDetails = _projectTaskRepository.GetProjectTaskByProjectTaskId(projectTask.Id);
            projectTaskDetails.TaskName = projectTask.TaskName;
            projectTaskDetails.TaskDetail = projectTask.TaskDetail;
            projectTaskDetails.UsefulLinks = projectTask.UsefulLinks;
            projectTaskDetails.StatusId = projectTask.StatusId;
            projectTaskDetails.Comments = projectTask.Comments;
            projectTaskDetails.AssignedDate = projectTask.AssignedDate;
            projectTaskDetails.EndDate = projectTask.EndDate;

            projectTaskDetails.ModifiedOn = DateTime.Now;
            projectTaskDetails.ModifiedBy = 1;

            if (_projectTaskRepository.UpdateProjectTask(projectTaskDetails))
            {
                return Ok(new CommonModel()
                {
                    Data = true,
                    Message = "Task updated successfully",
                    StatusCode = 200
                });
            }
            else
            {
                return Ok(new CommonModel()
                {
                    Data = false,
                    Message = "Error in updating Task",
                    StatusCode = 200
                });
            }
        }
    }
}