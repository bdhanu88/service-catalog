import {Component, ViewChild, Input} from '@angular/core';
import {NameRendererComponent} from '../../shared/render-component/name-renderer.component';
import {StatusRendererComponent} from '../../shared/render-component/status-renderer.component';
import {ActionRendererComponent} from '../../shared/render-component/action-renderer.component';
import {DurationRendererComponent} from '../../shared/render-component/duration-renderer.component';
import {AgGridTableCustomComponent} from '../../shared/ag-grid/table/table.component';
import {CustomValidationService} from "../../shared/common/validation/custom-validation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'joblist-cmp',
  moduleId: module.id,
  templateUrl: 'joblist.component.html'
})

export class JobListComponent {

  @ViewChild(AgGridTableCustomComponent)
  private jobListTableComponent: AgGridTableCustomComponent;

  @Input() agPaginationAuto: boolean = false;
  @Input() isSummaryAvailable:string="true" ;

  constructor(private customValidation: CustomValidationService,private route: ActivatedRoute) {
    //this.jobListTableComponent.agPaginationAuto = this.agPaginationAuto;
    var i = 0;
    if(route.snapshot.url[0].path=="joblist"){
      this.isSummaryAvailable="true";
    }
    else{
      this.isSummaryAvailable="false";
    }
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
        headerName: "Porter Name",
        field: "porterName",
        width: 80
      },
      {
        headerName: "From",
        field: "location",
        width: 80
      },
      {
        headerName: "Destination",
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
        width: 190
      },
      {
        headerName: "Started Time",
        field: "startTime",
        width: 50
      },
      {
        headerName: "Priority",
        field: "priority",
        width: 60
      },
      {
        headerName: "Duration",
        field: "duration",
        cellRendererFramework: DurationRendererComponent,
        width: 40,
        cellStyle: {'text-align': 'center'}
      },
      {
        headerName: "Action",
        field: "action",
        cellRendererFramework: ActionRendererComponent,
        width: 40
      },

    ];
    let rowData = [
      {
        jobId: '0000048',
        status: {className: 'danger', value: 'PENDING'},
        duration: {className: 'default', value: '12:35'},
        location: 'NICU',
        jobType: 'Waste Collection',
        destination: 'GARBAGE ROOM',
        reqTime: '12:50:00',
        action: {url: "jobStatus"},
        porterName:"Abraham",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000054',
        status: {className: 'danger', value: 'PENDING'},
        duration: {className: 'danger', value: '16:28'},
        location: 'NICU',
        jobType: 'Patient Transfer',
        destination: 'GROUND FLOOR',
        reqTime: '12:53:00',
        action: {url: "jobStatus"},
        porterName:"Ethan",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000055',
        status: {className: 'danger', value: 'PENDING'},
        duration: {className: 'danger', value: '20:23'},
        location: 'CCU',
        jobType: 'Moving Equipment',
        destination: 'ICU',
        reqTime: '12:58:00',
        action: {url: "jobStatus"},
        porterName:"Cortez",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000045',
        status: {className: 'success', value: 'IN PROGRESS'},
        duration: {className: 'danger', value: '15:45'},
        location: 'ICU',
        jobType: 'Patient Transfer',
        destination: 'INPATIENT',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"James",
        startTime:"12:48:00",
        priority:"Urgent"

      },
      {
        jobId: '0000046',
        status: {className: 'success', value: 'IN PROGRESS'},
        duration: {className: 'default', value: '10:15'},
        location: 'EMERGENCY',
        jobType: 'Patient Transfer',
        destination: 'INPATIENT',
        reqTime: '12:35:00',
        action: {url: "jobStatus"},
        porterName:"Johnathan",
        startTime:"12:37:00",
        priority:"Urgent"
      },

      {
        jobId: '0000056',
        status: {className: 'success', value: 'IN PROGRESS'},
        duration: {className: 'default', value: '10:00'},
        location: 'EMERGENCY',
        jobType: 'Deceased Patient',
        destination: 'DTU',
        reqTime: '13:10:00',
        action: {url: "jobStatus"},
        porterName:"Eldridge",
        startTime:"13:12:00",
        priority:"Urgent"
      },
      {
        jobId: '0000057',
        status: {className: 'success', value: 'IN PROGRESS'},
        duration: {className: 'danger', value: '19:15'},
        location: 'OUTPATIENT',
        jobType: 'Patient Transfer',
        destination: 'CCU',
        reqTime: '12:15:00',
        action: {url: "jobStatus"},
        porterName:"Bert",
        startTime:"12:18:00",
        priority:"Urgent"
      },
      {
        jobId: '0000058',
        status: {className: 'success', value: 'IN PROGRESS'},
        duration: {className: 'default', value: '13:40'},
        location: 'INPATIENT',
        jobType: 'Patient Transfer',
        destination: 'GROUND FLOOR',
        reqTime: '12:30:00',
        action: {url: "jobStatus"},
        porterName:"Augustus",
        startTime:"12:35:00",
        priority:"Urgent"
      },
      {
        jobId: '0000059',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00:00'},
        location: 'ICU',
        jobType: 'Patient Transfer',
        destination: 'NICU',
        reqTime: '16:45:00',
        action: {url: "jobStatus"},
        porterName:"Andrew",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000060',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00:00'},
        location: 'ICU',
        jobType: 'Patient Transfer',
        destination: 'INPATIENT',
        reqTime: '17:00:00',
        action: {url: "jobStatus"},
        porterName:"Timothy",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000061',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Milton",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000062',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Buford",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000063',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Elliott",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000064',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Luther",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000065',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Larry",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000066',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Mose",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000067',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Jewel",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000068',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Kennith",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000069',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Amos",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000070',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Dwayne",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000071',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Dan",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000072',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Marshall",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000073',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Chester",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000074',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Mike",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000075',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Caleb",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000076',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Lonnie",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000077',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Adrian",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000078',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Erin",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000079',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Alan",
        startTime:"",
        priority:"Urgent"
      },
      {
        jobId: '0000080',
        status: {className: 'default', value: 'PRE-SCHEDULED'},
        duration: {className: 'default', value: '00.00'},
        location: 'Tokiyo',
        jobType: 'Patient Transfer',
        destination: 'San Francisco',
        reqTime: '12:45:00',
        action: {url: "jobStatus"},
        porterName:"Jerad",
        startTime:"",
        priority:"Urgent"
      }
    ]
    this.jobListTableComponent.agPaginationAuto = this.agPaginationAuto;
    this.jobListTableComponent.setColumnDef(columnDefs);
    this.jobListTableComponent.setData(rowData);

  }
}
