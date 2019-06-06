import { IProjectTask } from "./IProjectTask";
import { IStatus } from "./IStatus";

export interface IProject{
  Id: number,
  ProjectName: string,
  ProjectDescription:string,
  ProjectStartDate: any,
  ProjectEndDate: any,
  StatusId:number,
  ProjectTasks: IProjectTask[],
  Status: IStatus
}
