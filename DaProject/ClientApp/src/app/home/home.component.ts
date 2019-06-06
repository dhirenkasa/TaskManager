import { Component } from '@angular/core';
import { GenericDataLayerService } from '../services/generic-data-layer';
import { NotificationType } from 'angular2-notifications';
import { ConfigSettings, DataURLs } from '../services/shared-services';
import { IProject } from '../models/IProject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public ProjectList: IProject[];
  constructor(private genericService: GenericDataLayerService, private config: ConfigSettings) {
    this.ProjectList = [];
    this.loadProjectList();

    this.config.newProjectListen().subscribe((m: any) => {
      if (m == "LoadProjectList") {
        this.loadProjectList();
      }
    })
  }

  loadProjectList() {
    this.genericService.GetList(this.config.getApiURI() + DataURLs.GetProjectList).subscribe(
      resp => {

        //this.config.showNotification("Success", NotificationType.Success, resp.message);
        
        this.ProjectList = resp.json().data as IProject[];
        
      },
      error => {
        this.config.showNotification("Error", NotificationType.Error, error.message);
      }
    );
  }

}
