import {Component} from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { EmployeeStatus } from './employee-status-config.component';
import { EmployeeStatusDialog } from './employee-status.dialog';
import { MdDialog, MdDialogRef, MdDialogModule } from '@angular/material';
import { ConfirmationDialog } from '../../../shared/Dialog/confirmation-dialog';
import {CustomValidationService} from "../../../shared/common/validation/custom-validation.service";

@Component({
    selector: 'full-width-cell',
    template: `<td class="text-right table-action" *ngIf="customValidation.isPermissionAvailable('EMPLOYEE_STATUS_EDIT')">
               <button type="button" rel="tooltip" title="" class="btn btn-primary btn-simple btn-xs"
				data-original-title="Edit Level" (click)="editEmployeeStatus()"><i class="material-icons">dvr</i><div class="ripple-container"></div></button>
               <button type="button" rel="tooltip" title="" class="btn btn-primary btn-simple btn-xs"
				data-original-title="Remove Level" (click)="removeEmployeeStatus()"><i class="material-icons">delete</i></button>
               </td>`
})
export class EmployeeStatusActionRendererComponent implements ICellRendererAngularComp {
    private params: any;
    private employeeStatusComponent: any;
    private employeeStatusTypes: any[] = [];
    private employeeStatus:any;
    agInit(params: any): void {
        this.params = params;
        this.employeeStatus = params.data;
        this.employeeStatusComponent = params.context.parentComponent;
    }

    constructor(private customValidation:CustomValidationService){

    }

    editEmployeeStatus(){
        this.employeeStatusComponent.editEmployeeStatus(this.employeeStatus);
    }

    removeEmployeeStatus(){
        this.employeeStatusComponent.removeEmployeeStatus(this.employeeStatus.id);
    }

}
