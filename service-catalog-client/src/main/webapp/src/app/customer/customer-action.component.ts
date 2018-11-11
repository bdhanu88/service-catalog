/**
 * Created by sachithra on 9/13/2017.
 */
import {ICellRendererAngularComp} from "ag-grid-angular";
import {Component, ViewChild} from "@angular/core";
import {CustomValidationService} from "../shared/common/validation/custom-validation.service";

/**
 * Created by CSI on 8/14/2017.
 */
@Component({
  selector: 'full-width-cell',
  template: `<td class="text-right table-action" *ngIf="customValidation.isPermissionAvailable('CUSTOMER_PROFILE_EDIT')">
               <a  [href]="action?'#/'+ action.url : ''" ><i class="material-icons">dvr</i><div class="ripple-container"></div></a>
               <a (click)="deactivateEmpProfile()"><i class="material-icons">close</i><div class="ripple-container"></div></a>
               </td>`
})
export class CustomerActionRendererComponent implements ICellRendererAngularComp {
  private params: any;
  public action: any;
  public id:number;
  private parentComponent:any;


  constructor(private customValidation:CustomValidationService){}
  agInit(params: any): void {
    this.params = params;
    this.action = params.data.action;
    debugger;
    this.id=params.data.id;
    this.parentComponent=params.context.parentComponent;

  }
  editEmpProfile(){
    this.parentComponent.setEmployeeDetails(this.id);
  }
  deactivateEmpProfile(){
    this.parentComponent.deactivateEmployee(this.id);
  }
}
