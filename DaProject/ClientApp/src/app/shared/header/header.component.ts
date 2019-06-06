import { Component,  OnInit } from '@angular/core';

//export const DATEPICKER_VALUE_ACCESSOR = {
//  provide: NG_VALUE_ACCESSOR,
//  useExisting: forwardRef(() => HeaderComponent),
//  multi: true
//};

//export class NgbModalContent {
//  @Input() name;
//  constructor(public activeModal: NgbActiveModal) {
//  }
//}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  //providers: [DATEPICKER_VALUE_ACCESSOR],
})

export class HeaderComponent  {

  constructor() {
  }

  //generateNotification() {
  //  this.config.showNotification("Error", NotificationType.Error, "Error");
  //}

  //openProjectModal(projectContent) {
  //  projectContent = projectContent;
  //  debugger
  //  this.modalPopupRef.openProjectModal(projectContent);
  //}

  //openLg(content) {
  //  this.modal = this.modalService.open(content, { size: 'lg' });
  //  //this.modal.componentInstance.name = "";
  //  this.modalOpen = true;

  //}
  //dismissModal(content) {
  //  this.modal.dismiss("Cross Click");
  //  this.project = <IProject>{};
  //  this.modalOpen = false;
  //}

  //closeModal(content) {
  //  this.modal.close("Close click");
  //  this.project = <IProject>{};
  //  this.modalOpen = false;
  //}

  //isModalOpen() {
  //  return this.modalOpen;
  //}
}
