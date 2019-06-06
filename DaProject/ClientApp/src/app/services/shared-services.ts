import { Injectable } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()

export class ConfigSettings {

  error: FormGroup;

  protected url: string = 'https://localhost:44364/api';
  constructor(private _fb: FormBuilder, private _notifyService: NotificationsService, private title: Title) {


    this.error = this._fb.group({
      type: 'error',
      title: '',
      content: '',
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      animate: 'fromRight'
    });
  }

  public getApiURI() {
    return this.url;
  }

  public showNotification(title: string, type: NotificationType, content: string) {
    const temp = this.error.getRawValue();
    //const type = temp.type;
    this._notifyService.create(title, content, type, temp)
  }

  private _listners = new Subject<any>();

  newProjectListen(): Observable<any> {
    return this._listners.asObservable();
  }

  notifyNewProject(filterBy: string) {
    this._listners.next(filterBy);
  }

  newProjectListListen(): Observable<any> {
    return this._listners.asObservable();
  }

  notifyNewProjectTask(filterBy: string) {
    this._listners.next(filterBy);
  }
  toHTML(input): any {
    //return atob(input);

    return new DOMParser().parseFromString(atob(input), "text/html").documentElement.textContent;
  }

  decodeInput(input): any {
    return atob(decodeURIComponent(input));
  }
}


export enum DataURLs {
  GetStatusList = "/Project/GetStatusList/",
  GetProjectList = "/Project/GetAllProject/",
  CreateProject = "/Project/CreateProject/",
  GetProjectDetails = "/Project/GetProjectById",
  UpdateProject = "/Project/UpdateProject/",

  GetProjectTaskList = "/ProjectTask/GetAllProjectTask/",
  GetAllProjectTaskByProjectId = "/ProjectTask/GetAllProjectTaskByProjectId",
  CreateProjectTask = "/ProjectTask/CreateProjectTask/",
  GetProjectTaskDetails = "/ProjectTask/GetProjectTaskById",
  UpdateProjectTask = "/ProjectTask/UpdateProjectTask/"
}

export enum ContentType {
  FormURLEncode = "application/x-www-form-urlencoded",
  ApplicationJson = "application/json"
}
