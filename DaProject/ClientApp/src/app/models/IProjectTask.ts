import { IProject } from "./IProject";
import { IStatus } from "./IStatus";

export interface IProjectTask {
  Id: number,
  TaskName: string,
  TaskDetail: string,
  UsefulLinks: string,
  AssignedDate: any,
  EndDate: any,
  UserId: number,
  Comments: string,
  ProjectId: number,
  StatusId: number
  Project: IProject,
  Status: IStatus
}

//export interface IProjectDetails {
//  ProjectObj: IProject,
//  ProjectTaskObj: IProjectTask[],
//}
