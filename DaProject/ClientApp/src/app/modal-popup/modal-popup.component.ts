import { Component, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { IProject } from '../models/IProject';
import { IProjectTask } from '../models/IProjectTask';
import { IStatus } from '../models/IStatus';
import { ConfigSettings, DataURLs, ContentType } from '../services/shared-services';
import { GenericDataLayerService } from '../services/generic-data-layer';
import { NotificationType } from 'angular2-notifications';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'modal-popup',
  templateUrl: './modal-popup.component.html',
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    },
    button.calendar, button.calendar:active {
      width: 2.75rem;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEUSURBVEiJ7ZQxToVAEIY/YCHGxN6XGOIpnpaEsBSeQC9ArZbm9TZ6ADyBNzAhQGGl8Riv4BLAWAgmkpBYkH1b8FWT2WK/zJ8ZJ4qiI6XUI3ANnGKWBnht2/ZBDRK3hgVGNsCd7/ui+JkEIrKtqurLpEWaphd933+IyI3LEIdpCYCiKD6HcuOa/nwOa0ScJEnk0BJg0UTUWJRl6RxCYEzEmomsIlPU3IPW+grIAbquy+q6fluy/28RIBeRMwDXdXMgXLj/B2uimRXpui4D9sBeRLKl+1N+L+t6RwbWrZliTTTr1oxYtzVWiTQAcRxvTX+eJMnlUDaO1vpZRO5NS0x48sIwfPc87xg4B04MCzQi8hIEwe4bl1DnFMCN2zsAAAAASUVORK5CYII=') !important;
      background-repeat: no-repeat;
      background-size: 23px;
      background-position: center;
    }
  `]
})

export class ModalPopupComponent {
  public projectModal: NgbModalRef;
  public projectTaskModal: NgbModalRef;
  public projectId: number;

  ckeConfigProjectDescription: any;
  ckeConfigTaskDetail: any;
  ckeConfigUsefulLinks: any;
  ckeConfigComments: any;

  projectForm: FormGroup;
  projectTaskForm: FormGroup;
  public StatusList: IStatus[];

  @ViewChild("projectContent") private projectContent: TemplateRef<any>;
  @ViewChild("projectTaskcontent") private projectTaskcontent: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private config: ConfigSettings, private genericService: GenericDataLayerService,
    private datePipe: DatePipe, private cd: ChangeDetectorRef,
    private router: Router
  ) {
    this.StatusList = [];
    //this.project = <IProject>{};
    this.LoadStatusList();
  }

  public openProjectModal(projectId: number) {
    this.projectModal = this.modalService.open(this.projectContent, { size: 'lg' });
    this.projectForm = new FormGroup({
      Id: new FormControl(null),
      ProjectName: new FormControl(null, Validators.required),
      ProjectDescription: new FormControl(null),
      ProjectStartDate: new FormControl(null, Validators.required),
      ProjectEndDate: new FormControl(null, Validators.required),
      StatusId: new FormControl(null)
    });
    //this.setProjectDetailById(projectId, this.projectModal._contentRef.nodes[0][1]);
    this.setProjectDetailById(projectId, this.projectForm);
    this.ckeConfigProjectDescription = {
      allowedContent: false,
      height: '10em',
      forcePasteAsPlainText: true
    };
  }

  public openProjectTaskModal(projectTaskId: number, projectId: number) {

    this.projectId = projectId;
    this.projectTaskModal = this.modalService.open(this.projectTaskcontent, { size: 'lg' });
    this.projectTaskForm = new FormGroup({
      Id: new FormControl(null),
      TaskName: new FormControl(null),
      TaskDetail: new FormControl(null),
      UsefulLinks: new FormControl(null),
      AssignedDate: new FormControl(null, Validators.required),
      EndDate: new FormControl(null, Validators.required),
      Comments: new FormControl(null),
      StatusId: new FormControl(null),
      ProjectId: new FormControl(null, Validators.required)
    });

    this.setProjectTaskDetailById(projectTaskId, this.projectTaskForm);

    this.ckeConfigTaskDetail = {
      allowedContent: false,
      height: '10em',
      forcePasteAsPlainText: true
    };
    this.ckeConfigUsefulLinks = {
      allowedContent: false,
      height: '10em',
      forcePasteAsPlainText: true
    };
    this.ckeConfigComments = {
      allowedContent: false,
      height: '10em',
      forcePasteAsPlainText: true
    };
  }

  dismissProjectModal() {
    this.projectModal.dismiss("Cross Click");
  }

  dismissProjectTaskModal() {
    this.projectTaskModal.dismiss("Cross Click");
  }

  closeProjectModal() {
    this.projectModal.close("Close click");
  }

  closeProjectTaskModal() {
    this.projectTaskModal.close("Close click");
  }

  // Function to call when the date changes.
  onChange = (date?: Date) => { };

  // Write change back to parent
  onDateChange(value: Date) {
    this.onChange(value);
  }

  // Function to call when the date picker is touched
  onTouched = () => { };

  LoadStatusList() {
    this.genericService.GetList(this.config.getApiURI() + DataURLs.GetStatusList).subscribe(
      resp => {
        this.StatusList = resp.json().data as IStatus[];
      },
      error => {
        this.config.showNotification("Error", NotificationType.Error, error.message);
      }
    );
  }

  setProjectDetailById(id: number, form: FormGroup) {
    this.genericService.GetByParam(this.config.getApiURI() + DataURLs.GetProjectDetails, id, "id").subscribe(
      resp => {
        if (resp.json().data != null) {
          var projectDetails = resp.json().data;

          form.patchValue({
            'Id': projectDetails.id,
            'ProjectName': atob(decodeURIComponent(projectDetails.projectName)),
            'ProjectDescription': atob(decodeURIComponent(projectDetails.projectDescription)),
            'StatusId': projectDetails.statusId
          });

          form.controls["ProjectStartDate"].setValue({
            year: Number(this.datePipe.transform(projectDetails.projectStartDate, 'yyyy')),
            month: Number(this.datePipe.transform(projectDetails.projectStartDate, 'MM')),
            day: Number(this.datePipe.transform(projectDetails.projectStartDate, 'dd'))
          });

          form.controls["ProjectEndDate"].setValue({
            year: Number(this.datePipe.transform(projectDetails.projectEndDate, 'yyyy')),
            month: Number(this.datePipe.transform(projectDetails.projectEndDate, 'MM')),
            day: Number(this.datePipe.transform(projectDetails.projectEndDate, 'dd'))
          });

          //formGroup1.controls["ProjectEndDate"].setValue(this.datePipe.transform(projectDetails.projectEndDate, 'yyyy-MM-dd'));
          //formGroup1.controls["ProjectEndDate"].markAsDirty();

          //formGroup1.controls["ProjectStartDate"].setValue(this.datePipe.transform(projectDetails.projectStartDate, 'yyyy-MM-dd'));
          //formGroup1.controls["ProjectStartDate"].markAsDirty();
          //this.cd.detectChanges();

          //formGroup1.controls["ProjectEndDate"].dispatchEvent(new Event("change"));
          //formGroup1.controls["ProjectStartDate"].value = this.datePipe.transform(projectDetails.projectStartDate, 'yyyy-MM-dd');
          //formGroup1.controls["ProjectStartDate"].dispatchEvent(new Event("change"));
        }
      },
      error => {
        this.config.showNotification("Error", NotificationType.Error, error.message);
      }
    );
  }

  setProjectTaskDetailById(id: number, form: FormGroup) {
    this.genericService.GetByParam(this.config.getApiURI() + DataURLs.GetProjectTaskDetails, id, "id").subscribe(
      resp => {
        if (resp.json().data != null) {
          var projectTaskDetails = resp.json().data;

          form.patchValue({
            'Id': projectTaskDetails.id,
            'TaskName': atob(decodeURIComponent(projectTaskDetails.taskName)),
            'TaskDetail': atob(decodeURIComponent(projectTaskDetails.taskDetail)),
            'UsefulLinks': atob(decodeURIComponent(projectTaskDetails.usefulLinks)),
            'Comments': atob(decodeURIComponent(projectTaskDetails.comments)),
            'StatusId': projectTaskDetails.statusId,
            'ProjectId': projectTaskDetails.projectId
          });

          //form.patchValue({
          //  'Id': projectTaskDetails.id,
          //  'TaskName': projectTaskDetails.taskName,
          //  'TaskDetail': projectTaskDetails.taskDetail,
          //  'UsefulLinks': projectTaskDetails.usefulLinks,
          //  'Comments': projectTaskDetails.comments,
          //  'StatusId': projectTaskDetails.statusId,
          //  'ProjectId': projectTaskDetails.projectId
          //});

          form.controls["AssignedDate"].setValue({
            year: Number(this.datePipe.transform(projectTaskDetails.assignedDate, 'yyyy')),
            month: Number(this.datePipe.transform(projectTaskDetails.assignedDate, 'MM')),
            day: Number(this.datePipe.transform(projectTaskDetails.assignedDate, 'dd'))
          });

          form.controls["EndDate"].setValue({
            year: Number(this.datePipe.transform(projectTaskDetails.endDate, 'yyyy')),
            month: Number(this.datePipe.transform(projectTaskDetails.endDate, 'MM')),
            day: Number(this.datePipe.transform(projectTaskDetails.endDate, 'dd'))
          });
        }
        else {
          form.patchValue({
            'Id': 0,
            'ProjectId': this.projectId
          });

          form.controls["AssignedDate"].setValue({
            year: Number(this.datePipe.transform(Date.now(), 'yyyy')),
            month: Number(this.datePipe.transform(Date.now(), 'MM')),
            day: Number(this.datePipe.transform(Date.now(), 'dd'))
          });
        }
      },
      error => {
        this.config.showNotification("Error", NotificationType.Error, error.message);
      }
    );
  }

  onSubmitProject(projectForm: NgForm) {

    if (projectForm.valid) {
      let projectObject: IProject = <IProject>{};

      projectObject.ProjectName = btoa(projectForm.controls["ProjectName"].value);
      projectObject.ProjectDescription = btoa(projectForm.controls["ProjectDescription"].value);
      projectObject.ProjectStartDate = projectForm.controls["ProjectStartDate"].value.day + "/" + projectForm.controls["ProjectStartDate"].value.month + "/" + projectForm.controls["ProjectStartDate"].value.year;
      projectObject.ProjectEndDate = projectForm.controls["ProjectEndDate"].value.day + "/" + projectForm.controls["ProjectEndDate"].value.month + "/" + projectForm.controls["ProjectEndDate"].value.year;
      projectObject.Id = projectForm.controls["Id"].value;
      projectObject.StatusId = projectForm.controls["StatusId"].value;

      //projectObject.ProjectName = this.project.ProjectName;
      //projectObject.ProjectDescription = this.project.ProjectDescription;
      //projectObject.ProjectStartDate = this.project.ProjectStartDate.day + "/" + this.project.ProjectStartDate.month + "/" + this.project.ProjectStartDate.year;
      //projectObject.ProjectEndDate = this.project.ProjectEndDate.day + "/" + this.project.ProjectEndDate.month + "/" + this.project.ProjectEndDate.year;
      //projectObject.Id = this.project.Id;
      let url: String = "";
      if (projectObject.Id == 0)
        url = DataURLs.CreateProject;
      else
        url = DataURLs.UpdateProject;

      this.genericService.InsertObject(this.config.getApiURI() + url, projectObject, ContentType.FormURLEncode).subscribe(
        resp => {

          if (resp.data == true) {

            this.closeProjectModal();
            this.config.showNotification("Success", NotificationType.Success, resp.message);
            this.config.notifyNewProject("LoadProjectList");
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

  onSubmitProjectTask(projectTaskForm: NgForm) {

    if (projectTaskForm.valid) {
      let projectTaskObject: IProjectTask = <IProjectTask>{};

      projectTaskObject.TaskName = btoa(projectTaskForm.controls["TaskName"].value);
      projectTaskObject.TaskDetail = btoa(projectTaskForm.controls["TaskDetail"].value);
      projectTaskObject.UsefulLinks = btoa(projectTaskForm.controls["UsefulLinks"].value);
      projectTaskObject.AssignedDate = projectTaskForm.controls["AssignedDate"].value.day + "/" + projectTaskForm.controls["AssignedDate"].value.month + "/" + projectTaskForm.controls["AssignedDate"].value.year;
      projectTaskObject.EndDate = projectTaskForm.controls["EndDate"].value.day + "/" + projectTaskForm.controls["EndDate"].value.month + "/" + projectTaskForm.controls["EndDate"].value.year;
      projectTaskObject.Comments = btoa(projectTaskForm.controls["Comments"].value);
      projectTaskObject.Id = projectTaskForm.controls["Id"].value;
      projectTaskObject.StatusId = projectTaskForm.controls["StatusId"].value;
      projectTaskObject.ProjectId = projectTaskForm.controls["ProjectId"].value;

      let url: String = "";
      if (projectTaskObject.Id == 0)
        url = DataURLs.CreateProjectTask;
      else
        url = DataURLs.UpdateProjectTask;

      this.genericService.InsertObject(this.config.getApiURI() + url, projectTaskObject, ContentType.FormURLEncode).subscribe(
        resp => {

          if (resp.data == true) {

            this.closeProjectTaskModal();
            this.config.showNotification("Success", NotificationType.Success, resp.message);
            this.config.notifyNewProject("LoadProjecttaskList");
            //this.router.navigate(['/editProject/' + projectTaskObject.ProjectId]);
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

