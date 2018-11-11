/**
 * Created by Sachithra on 2/27/2018.
 */
import {Component, Input, OnChanges} from "@angular/core";
import {selector} from "rxjs/operator/publish";
import {JobDetail} from "./emergencyJob.component";
@Component({

  selector:"custom-grid-comp",
  moduleId:module.id,
  templateUrl:"gridCustom.component.html"
})
export class CustomGrid {
  @Input()jobList:JobDetail[];
  @Input() isToolTipRequired:string;

  setGridList(gridLst:any){
    this.jobList = gridLst;
  }

}
