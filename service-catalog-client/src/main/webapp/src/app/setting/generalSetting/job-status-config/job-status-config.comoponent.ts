import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridTableCustomComponent } from '../../../shared/ag-grid/table/table.component';
import { JobStatusAction } from './job-status-action.component';
import { JobStatusDialog, JOB_STATUS_TYPES } from './job-status.dialog';
import { MdDialog } from '@angular/material';
import { HttpCustomService } from 'app/shared/common';
import { HttpType } from '../../../shared/common/http/http-request.metadata';
import {CustomValidationService} from "../../../shared/common/validation/custom-validation.service";


@Component({
    selector: 'job-status',
    templateUrl: './job-status-config.component.html',
    //styleUrls: ['book.component.css'],
    styles: [],
    //providers: [AccessControlService]
})
export class JobStatusConfig implements OnInit {

    @ViewChild(AgGridTableCustomComponent)
    private tableComponent: AgGridTableCustomComponent;

    agPaginationAuto: boolean = false;

    private tableData: any[] = [{
        abbreviation: "TEST", jobStatusName: "TEST", id: 1,
        jobStatusType: JOB_STATUS_TYPES[JOB_STATUS_TYPES.ONE]
    }];

    constructor(public dialog: MdDialog, public httpCustomService: HttpCustomService
      ,private customValidation:CustomValidationService) {
    }

    ngOnInit() {

        let columnDefs = [
            {
                headerName: "Name",
                field: "jobStatusName",
                width: 120
            },
            {
                headerName: "Abbreviation",
                field: "abbreviation",
                width: 60
            },
            {
                headerName: "Type",
                field: "jobStatusType",
                width: 60
            },
            {
                headerName: "Action",
                cellRendererFramework: JobStatusAction,
                width: 60
            }
        ];
        let data = {};
        this.httpCustomService.commonHttpRequest("jobStatusData", "jobStatus/getAllJobStates", data, this.getAllJobStatusSuccess.bind(this));

        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.setData(this.tableData);

    }

    getAllJobStatusSuccess(data) {
        // debugger;
        this.tableComponent.updateData(data);
        //  console.log(data);

    }

    addNewJobStatus() {
        let dialogRef = this.dialog.open(JobStatusDialog);
        dialogRef.componentInstance.setTitle("Add Job Status");
        dialogRef.componentInstance.setActionButton("Add Job Status");

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.httpCustomService.commonHttpRequest("addJobState", "jobStatus/addJobState", result, this.addJobStatusSuccess.bind(this), null, HttpType.POST);
            }
        });
    }

    addJobStatusSuccess(data) {
        this.tableComponent.updateData(data);
    }

}

