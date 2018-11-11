import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { MdDialog } from '@angular/material';
import { HttpCustomService } from "app/shared/common";
import { JobStatusDialog, JobStatus } from './job-status.dialog';
import { ConfirmationDialog } from "app/shared/Dialog/confirmation-dialog";
import { HttpType } from '../../../shared/common/http/http-request.metadata';
import {CustomValidationService} from "../../../shared/common/validation/custom-validation.service";

@Component({
    selector: 'full-width-cell',
    template: `<td class="text-right table-action" *ngIf="customValidation.isPermissionAvailable('JOB_STATUS_EDIT')">
               <button type="button" rel="tooltip" title="" class="btn btn-primary btn-simple btn-xs"
				data-original-title="Edit Level" (click)="editJobStatus()"><i class="material-icons">dvr</i><div class="ripple-container"></div></button>
               <button type="button" rel="tooltip" title="" class="btn btn-primary btn-simple btn-xs"
				data-original-title="Remove Level" (click)="removeJobStatus()"><i class="material-icons">delete</i></button>
               </td>`,
    //providers:[UnitHierarchyService, HttpCustomService]
})
export class JobStatusAction implements ICellRendererAngularComp {
    private params: any;
    private jobStatus: JobStatus;

    agInit(params: any): void {
        this.params = params;
        this.jobStatus = params.data;
    }

    constructor(public dialog: MdDialog, private httpCustomService: HttpCustomService
      ,private customValidation:CustomValidationService) {
    }

    editJobStatus() {
        let dialogRef = this.dialog.open(JobStatusDialog);
        dialogRef.componentInstance.setTitle("Edit Job Status");
        dialogRef.componentInstance.setActionButton("Edit Job Status");
        dialogRef.componentInstance.setFormValues(this.jobStatus);
        dialogRef.componentInstance.setIsEdit(true);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let URL = 'jobStatus/addJobState';
                this.httpCustomService.commonHttpRequest("jobStatusEdit", URL, result, this.deleteJobStatusSuccess.bind(this), null, HttpType.POST);
            }
        });
    }
    removeJobStatus() {
        let dialogRef = this.dialog.open(ConfirmationDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.title = "Remove Job Status";
        dialogRef.componentInstance.message = "Are you sure you want to remove Job Status?";

        dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
                let URL = 'jobStatus/deleteJobStatus?jobStatusId=';
                URL += this.jobStatus.id;
                this.httpCustomService.commonHttpRequest("jobStatusDelete", URL, null, this.deleteJobStatusSuccess.bind(this), null, HttpType.GET);
            }
        });
    }

    deleteJobStatusSuccess(data) {
        this.params.api.setRowData(data);
    }
}
