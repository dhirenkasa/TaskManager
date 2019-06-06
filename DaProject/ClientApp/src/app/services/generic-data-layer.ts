import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { ConfigSettings } from './shared-services';
import { Observable } from 'rxjs/Observable';
import { IProject } from '../models/IProject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GenericDataLayerService {
  constructor(private http: Http, private config: ConfigSettings) {

  }

  GetList(currentURL: string): Observable<any> {

    return this.http.get(currentURL)
      .catch(err => {
        return Observable.throw(err.json())
      });
  }

  GetByParam(currentURL: string, value: any, paramName: string): Observable<any> {

    return this.http.get(currentURL + "?" + paramName + "=" + value)
      .catch(err => {
        return Observable.throw(err.json())
      });
  }

  InsertObject(currentURL: string, obj: any, contentType: string): Observable<any> {

    let headers = new Headers({ 'Content-Type': contentType });
    let options = new RequestOptions({ headers: headers });

    let body = new URLSearchParams();
    var pattern = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;
    for (var property in obj) {
      var date = new Date((obj[property] + "").replace(pattern, '$3-$2-$1'));
      if (date.toDateString() != "Invalid Date") {
        body.set(property, obj[property]);
      }
      else {
        body.set(property, encodeURIComponent(obj[property]));
      }
    }

    return this.http.post(currentURL, body.toString(), options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);

    //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //

    //let body = new URLSearchParams();
    //body.set('ProjectName', project.ProjectName);
    //body.set('ProjectStartDate', project.ProjectStartDate.day + "/" + project.ProjectStartDate.month + "/" + project.ProjectStartDate.year);
    //body.set('ProjectEndDate', project.ProjectEndDate.day + "/" + project.ProjectEndDate.month + "/" + project.ProjectEndDate.year);

    //return this.http.post(this.config.getApiURI() + '/Project/CreateProject', body.toString(), options)
    //  .map((res: Response) => {
    //    return res.json();
    //  })
    //  .catch(this.handleError);
  }

  handleError(error: Response) {
    return Observable.throw(error || 'Server Error');
  }
}
