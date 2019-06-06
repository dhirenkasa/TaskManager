import { Component } from '@angular/core';
import { ConfigSettings, DataURLs } from '../../services/shared-services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})

export class FooterComponent {

  constructor(private config: ConfigSettings) {
    //this.config.newProjectListen().subscribe((m: any) => {
    //  debugger
     
    //})
  }
}
