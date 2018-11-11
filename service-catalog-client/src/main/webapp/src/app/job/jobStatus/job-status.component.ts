import { Component  , ViewChild , Input} from '@angular/core';
import { NameRendererComponent } from '../../shared/render-component/name-renderer.component';
import { StatusRendererComponent } from '../../shared/render-component/status-renderer.component';
import { ActionRendererComponent } from '../../shared/render-component/action-renderer.component';
import { DurationRendererComponent } from '../../shared/render-component/duration-renderer.component';
import { AgGridTableCustomComponent } from '../../shared/ag-grid/table/table.component';

@Component({
    selector: 'job-status-cmp',
    moduleId: module.id,
    templateUrl: 'job-status.component.html'
})

export class JobStatusComponent {

    @ViewChild(AgGridTableCustomComponent)
    private jobListTableComponent: AgGridTableCustomComponent;

    @Input()agPaginationAuto:boolean = false;

    constructor() {
        var i = 0;
    }

    ngOnInit() {
        let columnDefs = [
            {
                headerName: "Job ID",
                field: "jobId",
                width: 80
            },
            {
                headerName: "Job Type",
                field: "jobType",
                width: 100
            },
            {
                headerName: "Start",
                field: "location",
                width: 80
            },
            {
                headerName: "End",
                field: "destination",
                width: 80
            },
            {
                headerName: "Req.Time",
                field: "reqTime",
                width: 60
            },
            {
                headerName: "Status",
                field: "status",
                cellRendererFramework: StatusRendererComponent,
                width: 120
            },
            {
                headerName: "Duration",
                field: "duration",
                cellRendererFramework: DurationRendererComponent,
                width: 40,
                cellStyle: { 'text-align': 'center'}
            },
            {
                headerName: "Action",
                cellRendererFramework: ActionRendererComponent,
                width: 40
            },

        ];
        let rowData = [
            {jobId: 'OPD-6-23-145', status: { className: 'success' ,  value:'IN PROGRESS'} , duration: { className: 'danger' ,  value:'15:23'}  , location: 'Tokiyo' ,  jobType: 'Patient Transfer' ,  destination: 'San Francisco' , reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'success' ,  value:'IN PROGRESS'} , duration: { className: 'danger' ,  value:'15:23'} , location: 'London' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'danger' ,  value:'PENDING'} , duration: { className: 'default' ,  value:'15:23'}  , location: 'London' ,  jobType: 'Waste Collection', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'danger' ,  value:'PENDING'} , duration: { className: 'default' ,  value:'15:23'} , location: 'San Francisco' ,  jobType: 'Patient Transfer', destination: 'London', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'danger' ,  value:'PENDING'} , duration: { className: 'default' ,  value:'15:23'} , location: 'New York' ,  jobType: 'Moving Equipment', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'danger' ,  value:'PENDING'} , duration: { className: 'danger' ,  value:'15:23'} , location: 'New York' ,  jobType: 'Deceased Patient', destination: 'London', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'danger' ,  value:'15:23'} , location: 'Edinburgh' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Edinburgh' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Edinburgh' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'}, location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'}, location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'}, location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'}, location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'}, location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'}, location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'},
            {jobId: 'OPD-6-23-145', status: { className: 'default' ,  value:'SCHEDULE'} , duration: { className: 'default' ,  value:'15:23'} , location: 'Tokiyo' ,  jobType: 'Patient Transfer', destination: 'San Francisco', reqTime:'12:45:02'}
        ]
        /*this.jobListTableComponent.setColumnDef(columnDefs);
      this.jobListTableComponent.setData(rowData);
      this.jobListTableComponent.agPaginationAuto = this.agPaginationAuto;*/

    }
}
