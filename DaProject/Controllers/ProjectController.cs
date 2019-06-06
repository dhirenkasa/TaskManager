using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DaProject.Models;
using DaProject.Repository;
using DaProject.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace DaProject.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        public readonly IProjectRepository _projectRepository;
        public readonly IStatusRepository _statusRepository;
        public ProjectController(IProjectRepository projectRepository, IStatusRepository statusRepository)
        {
            _projectRepository = projectRepository;
            _statusRepository = statusRepository;
        }

        [HttpGet("[action]")]
        public ObjectResult GetStatusList()
        {
            return Ok(new CommonModel()
            {
                Data = _statusRepository.GetStatusList(),
                Message = "Status List fetched",
                StatusCode = 200
            });
        }

        [HttpGet("[action]")]
        public ObjectResult GetAllProject()
        {
            try
            {
                IEnumerable<Project> projectList = _projectRepository.GetProjectList();
                return Ok(new CommonModel()
                {
                    Data = projectList,
                    Message = "Project List fetched",
                    StatusCode = 200
                });
            }
            catch (Exception ex)
            {
                return Ok(new CommonModel()
                {
                    Data = ex.Message,
                    Message = "Error in fetching projects",
                    StatusCode = 201
                });
            }
        }

        [HttpPost("[action]")]
        public ObjectResult CreateProject(Project project)
        {
            project.CreatedBy = 1;
            project.CreatedOn = DateTime.Now;
            project.ModifiedBy = null;
            project.ModifiedOn = null;
            project.StatusId = (int)ProjectStatus.NotStarted;
            if (_projectRepository.CreateProject(project))
            {
                return Ok(new CommonModel()
                {
                    Data = true,
                    Message = "Project created successfully",
                    StatusCode = 200
                });
            }
            else
            {
                return Ok(new CommonModel()
                {
                    Data = false,
                    Message = "Error in creating Project",
                    StatusCode = 200
                });
            }
        }

        [HttpGet("[action]")]
        public ObjectResult GetProjectById(int id)
        {
            try
            {
                Project projectDetails = _projectRepository.GetProjectById(id);
                return Ok(new CommonModel()
                {
                    Data = projectDetails,
                    Message = "Project details fetched",
                    StatusCode = 200
                });
            }
            catch (Exception ex)
            {
                return Ok(new CommonModel()
                {
                    Data = ex.Message,
                    Message = "Error in fetching project details",
                    StatusCode = 201
                });
            }
        }

        [HttpPost("[action]")]
        public ObjectResult UpdateProject(Project project)
        {
            Project projectDetails = _projectRepository.GetProjectById(project.Id);
            projectDetails.ProjectName = project.ProjectName;
            projectDetails.ProjectDescription = project.ProjectDescription;
            projectDetails.ProjectStartDate = project.ProjectStartDate;
            projectDetails.ProjectEndDate = project.ProjectEndDate;
            projectDetails.StatusId = project.StatusId;
            projectDetails.ModifiedOn = DateTime.Now;
            projectDetails.ModifiedBy = 1;

            if (_projectRepository.UpdateProject(projectDetails))
            {
                return Ok(new CommonModel()
                {
                    Data = true,
                    Message = "Project updated successfully",
                    StatusCode = 200
                });
            }
            else
            {
                return Ok(new CommonModel()
                {
                    Data = false,
                    Message = "Error in updating Project",
                    StatusCode = 200
                });
            }
        }


    }
}