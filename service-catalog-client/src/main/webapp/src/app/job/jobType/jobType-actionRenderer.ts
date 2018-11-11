import {ICellRendererAngularComp} from "ag-grid-angular";
import {Component} from "@angular/core";
import {CustomValidationService} from "../../shared/common/validation/custom-validation.service";
/**
 * Created by CSI on 8/9/2017.
 */

@Component({
  selector: 'full-width-cell',
  template: `<td class="text-right table-action" *ngIf="customValidation.isPermissionAvailable('JOB_TYPES_EDIT')">
               <button type="button" rel="tooltip" title="" class="btn btn-primary btn-simple btn-xs"
				data-original-title="Edit Level" (click)="editJobType()"><i class="material-icons">dvr</i><div class="ripple-container"></div></button>
               <button type="button" rel="tooltip" title="" class="btn btn-primary btn-simple btn-xs"
				data-original-title="Remove Level" (click)="removeJobType()"><i class="material-icons">delete</i></button>
               </td>`
})
export class JobTypeActionRendererComponent implements ICellRendererAngularComp {
  private params: any;
  private jobTypeComponent: any;
  private jobType:any;
  agInit(params: any): void {
    this.params = params;
    this.jobType=params.data;
    this.jobTypeComponent = params.context.parentComponent;
  }

  constructor(private customValidation:CustomValidationService){

  }

  editJobType(){
    this.jobTypeComponent.setEntityDetails(this.jobType);
  }

  removeJobType(){
   this.jobTypeComponent.removeJobType(this.jobType.id);
   }

}
