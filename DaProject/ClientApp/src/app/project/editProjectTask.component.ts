import { Component, ViewEncapsulation, OnInit, ViewChild, ChangeDetectorRef, Pipe, PipeTransform  } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormsModule, FormGroup } from '@angular/forms';
import { IProject } from '../models/IProject';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigSettings, DataURLs, ContentType } from '../services/shared-services';
import { GenericDataLayerService } from '../services/generic-data-layer';
import { NotificationType } from 'angular2-notifications';
import { IProjectTask } from '../models/IProjectTask';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'edit-project',
  templateUrl: './editProjectTask.component.html',
  encapsulation: ViewEncapsulation.None
})

export class EditProjectComponent implements OnInit{
  public project: IProject = <IProject>{};
  public projectTask: IProjectTask = <IProjectTask>{};
  public projectTaskList: IProjectTask[] = [];
  public projectId: number = 0;
  protected modal: NgbModalRef;
  ckeTaskDetail: any;
  ckeUsefulLinks: any;
  ckeComments: any;
  currentDate: any;
  displayedColumns = ['TaskName','AssignedDate', 'EndDate','Status','Actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: Router, private activateRoute: ActivatedRoute, private config: ConfigSettings, private genericService: GenericDataLayerService, private modalService: NgbModal,private ref: ChangeDetectorRef) {
    //this.projectDetails.ProjectObj = <IProject>{};
    //this.projectDetails.ProjectTaskObj = [];
    if (activateRoute.snapshot.params["id"] != undefined) {
      this.projectId = parseInt(activateRoute.snapshot.params["id"]);
      this.getProjectDetails(this.projectId);
      this.projectTask.ProjectId = this.projectId;
      this.loadProjectTaskList(this.projectTask.ProjectId);
    }
    const now = new Date();
    this.projectTask.AssignedDate = { year: now.getFullYear(), month: (now.getMonth() + 1), day: now.getDate() }
    //const since = moment().subtract(14, 'd').toDate();
    //this.projectTask.AssignedDate = now.getDay() + "/" + now.getMonth() + "/" + now.getFullYear();
   // this.projectTask.AssignedDate = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay();
    this.config.newProjectListListen().subscribe((m: any) => {
      if (m == "LoadProjecttaskList") {
        this.loadProjectTaskList(this.projectTask.ProjectId);
      }
    });
  }

  ngOnInit() {
    this.ckeTaskDetail = {
      allowedContent: false,
      //extraPlugins: 'divarea',
      //readOnly : true,
      height: '10em',
      forcePasteAsPlainText: true
    };
    this.ckeUsefulLinks = {
      allowedContent: false,
      //extraPlugins: 'divarea',
      //readOnly: true,
      height: '10em',
      forcePasteAsPlainText: true
    };

    this.ckeComments = {
      allowedContent: false,
      //extraPlugins: 'divarea',
      //readOnly: true,
      height: '10em',
      forcePasteAsPlainText: true
    };
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  loadProjectTaskList(projectId:number) {
    this.genericService.GetList(this.config.getApiURI() + DataURLs.GetAllProjectTaskByProjectId + "?id=" + projectId).subscribe(
      resp => {
        this.projectTaskList = resp.json().data as IProjectTask[];
        //this.dataSource  = new MatTableDataSource(this.projectTaskList);
        debugger
        this.dataSource = new MatTableDataSource(this.projectTaskList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.ref.markForCheck();
      },
      error => {
        this.config.showNotification("Error", NotificationType.Error, error.message);
      }
    );
  }

  //openLg(content) {
  //  this.modal = this.modalService.open(content, { size: 'lg', windowClass:'xlModal' });
  //  //this.modal.componentInstance.name = "";

  //}
  //dismissModal(content) {
  //  this.modal.dismiss("Cross Click");
  //  this.project = <IProject>{};
  //}

  //closeModal(content) {
  //  this.modal.close("Close click");
  //  this.project = <IProject>{};
  //}

  getProjectDetails(id: number) {
    
    this.genericService.GetByParam(this.config.getApiURI() + DataURLs.GetProjectDetails, id,"id").subscribe(
      resp => {

        this.project = resp.json().data as IProject;
        
        //this.project.ProjectDescription = this.config.decodeInput(data.projectDescription);
        //this.project.ProjectName = this.config.decodeInput(data.projectName);
      },
      error => {
        this.config.showNotification("Error", NotificationType.Error, error.message);
      }
    );
  }

  getProjectTaskDetails(taskId: number, content:any) {

    this.genericService.GetByParam(this.config.getApiURI() + DataURLs.GetProjectTaskDetails, taskId, "taskId").subscribe(
      resp => {
        this.projectTask = resp.json().data as IProjectTask;
        //this.openLg(content);
      },
      error => {
        this.config.showNotification("Error", NotificationType.Error, error.message);
      }
    );
  }

  onSubmit(projectForm: NgForm, content: any) {
    
    if (projectForm.valid) {
      let taskObject: IProjectTask = <IProjectTask>{};

      taskObject.TaskName = this.projectTask.TaskName;
      taskObject.TaskDetail = this.projectTask.TaskDetail;
      taskObject.UsefulLinks = this.projectTask.UsefulLinks;
      taskObject.AssignedDate = this.projectTask.AssignedDate.day + "/" + this.projectTask.AssignedDate.month + "/" + this.projectTask.AssignedDate.year;
      taskObject.EndDate = this.projectTask.EndDate.day + "/" + this.projectTask.EndDate.month + "/" + this.projectTask.EndDate.year;
      taskObject.Comments = this.projectTask.Comments;
      taskObject.ProjectId = this.projectTask.ProjectId;

      this.genericService.InsertObject(this.config.getApiURI() + DataURLs.CreateProjectTask, taskObject, ContentType.FormURLEncode).subscribe(
        resp => {

          if (resp.data == true) {
            //this.closeModal(content);
            this.config.showNotification("Success", NotificationType.Success, resp.message);
            this.loadProjectTaskList(this.projectTask.ProjectId);
            //this.config.notifyNewProject("LoadProjectList");
          }
          else {
            this.config.showNotification("Error", NotificationType.Error, resp.message);
          }
        },
        error => {
          this.config.showNotification("Error", NotificationType.Error, error.message);
        });
    }
    else {
      this.config.showNotification("Error", NotificationType.Error, "Error");
    }
  }

}

@Pipe({ name: "decodeString" })
export class decodeStringPipe implements PipeTransform {
  transform(value: string): string {
    
    return atob(decodeURIComponent(value));
  }
}
