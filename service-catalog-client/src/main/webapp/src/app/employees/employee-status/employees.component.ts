import { Component , ViewChild , Input } from '@angular/core';
import { NameRendererComponent } from '../../shared/render-component/name-renderer.component';
import { StatusRendererComponent } from '../../shared/render-component/status-renderer.component';
import { ActionRendererComponent } from '../../shared/render-component/action-renderer.component';
import { AgGridTableCustomComponent } from '../../shared/ag-grid/table/table.component';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'employees-cmp',
    moduleId: module.id,
    templateUrl: 'employees.component.html'
})

export class EmployeesComponent {

    @ViewChild(AgGridTableCustomComponent)
    private tableComponent: AgGridTableCustomComponent;

    @Input()agPaginationAuto:boolean = false;
  @Input() isSummaryAvailable:string="true" ;

    constructor(private route: ActivatedRoute) {
      if(route.snapshot.url[0].path=="employeeStatus"){
        this.isSummaryAvailable="true";
      }
      else{
        this.isSummaryAvailable="false";
      }
    }

    sucess(response){
        console.log("Success Response : " + response)
    }

    ngOnInit() {

    let columnDefs = [
            {
                headerName: "Employee",
                field: "name",
                cellRendererFramework: NameRendererComponent,
                width: 120
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
                width: 40,
                cellStyle: { 'text-align': 'center'}
            },
            {
                headerName: "Location",
                field: "location",
                width: 80
            },
            {
                headerName: "Job Type",
                field: "jobType",
                width: 100
            },
            {
                headerName: "Destination",
                field: "destination",
                width: 100
            },
            {
                headerName: "Action",
                cellRendererFramework: ActionRendererComponent,
                width: 40
            },

        ];


        let data = [
          {name: 'Boontung Pongchandaj', status: { className: 'success' ,  value:'AVAILABLE'} , duration: '15:23' , location: '2nd Floor' ,  jobType: '' ,  destination: ''},
          {name: 'Suda Tomson', status: { className: 'success' ,  value:'AVAILABLE'} , duration: '10:58' , location: 'Inpatient' ,  jobType: '', destination: ''},
          {name: 'Krit Bunnag', status: { className: 'danger' ,  value:'ON ROUTE'} , duration: '4:48'  , location: 'NICU' ,  jobType: 'Waste Collection', destination: 'Ground Floor'},
          {name: 'Kacha Poonlarp', status: { className: 'danger' ,  value:'ON ROUTE'} , duration: '12:23' , location: 'Outpatient' ,  jobType: 'Patient Transfer', destination: 'Inpatient'},
          {name: 'Panthorn Montri', status: { className: 'danger' ,  value:'ON ROUTE'} , duration: '8:34' , location: 'Emergency' ,  jobType: 'Moving Equipment', destination: 'ICU'},
          {name: 'Brielle Williamson', status: { className: 'danger' ,  value:'ON ROUTE'} , duration: '7:24' , location: 'ICU' ,  jobType: 'Deceased Patient', destination: 'Inpatient'},
          {name: 'Charoen Chansiri', status: { className: 'danger' ,  value:'ON ROUTE'} , duration: '12:28' , location: 'Ground Floor' ,  jobType: 'Patient Transfer', destination: 'DTU'},
          {name: 'Thanat Hitapot', status: { className: 'default' ,  value:'BREAK'} , duration: '1:12' , location: 'Rest Room' ,  jobType: '', destination: ''},
          {name: 'Kraisee Thanom', status: { className: 'default' ,  value:'BREAK'} , duration: '2:23' , location: 'Rest Room' ,  jobType: '', destination: ''},
          {name: 'Kantsom Kwaigno', status: { className: 'default' ,  value:'BREAK'} , duration: '11:23' , location: 'Rest Room' ,  jobType: '', destination: ''},
          {name: 'Nirawit Santisakul', status: { className: 'default' ,  value:'BREAK'} , duration: '23:29', location: 'Rest Room' ,  jobType: '', destination: ''},
          {name: 'Barinot Charoenkul', status: { className: 'default' ,  value:'BREAK'} , duration: '11:11' , location: 'Rest Room' ,  jobType: '', destination: ''},
          {name: 'Thipok Prinya', status: { className: 'default' ,  value:'BREAK'} , duration: '12:12' , location: 'Rest Room' ,  jobType: '', destination: ''},
          {name: 'Praman Sangwit', status: { className: 'default' ,  value:'BREAK'} , duration: '2:23' , location: 'Rest Room' ,  jobType: '', destination: ''},
          {name: 'Pawornruj Lam', status: { className: 'default' ,  value:'BREAK'} , duration: '4:34' , location: 'Rest Room' ,  jobType: '', destination: ''},
          {name: 'Mahidol Shimma', status: { className: 'default' ,  value:'BREAK'} , duration: '5:34' , location: 'Rest Room' ,  jobType: '', destination: ''},
          {name: 'Airi Satou', status: { className: 'default' ,  value:'BREAK'} , duration: '6:35' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou', status: { className: 'default' ,  value:'BREAK'} , duration: '21:23' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou', status: { className: 'default' ,  value:'BREAK'} , duration: '14:56' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou', status: { className: 'default' ,  value:'BREAK'} , duration: '1:23' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou', status: { className: 'default' ,  value:'BREAK'} , duration: '2:34' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou', status: { className: 'default' ,  value:'BREAK'} , duration: '1:23' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou', status: { className: 'default' ,  value:'BREAK'} , duration: '2:23' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou', status: { className: 'default' ,  value:'BREAK'} , duration: '2:23' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou', status: { className: 'default' ,  value:'BREAK'} , duration: '2:23' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou', status: { className: 'default' ,  value:'BREAK'} , duration: '2:23' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou Last', status: { className: 'default' ,  value:'BREAK'} , duration: '2:23' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou', status: { className: 'default' ,  value:'BREAK'} , duration: '2:23' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou', status: { className: 'default' ,  value:'BREAK'} , duration: '2:23' , location: 'Tokiyo' ,  jobType: '', destination: ''},
          {name: 'Airi Satou 31', status: { className: 'default' ,  value:'BREAK'} , duration: '2:23' , location: 'Tokiyo' ,  jobType: '', destination: ''}
        ];

        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.agHeader=false;
        this.tableComponent.setData(data);
    }
}
