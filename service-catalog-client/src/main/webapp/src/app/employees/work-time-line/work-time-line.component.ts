import { Component , ViewChild , Input } from '@angular/core';
import { NameRendererComponent } from '../../shared/render-component/name-renderer.component';
import { WorkTimeLineRendererComponent } from '../../shared/render-component/work-time-line-renderer.component';
import { UtilizationRendererComponent } from '../../shared/render-component/utilization-renderer.component';
import { AgGridTableCustomComponent } from '../../shared/ag-grid/table/table.component'; 

@Component({
    selector: 'work-time-line-cmp',
    moduleId: module.id,
    templateUrl: 'work-time-line.component.html'
})

export class EmployeesWorkTimeLineComponent {
    
    @ViewChild(AgGridTableCustomComponent)
    private tableComponent: AgGridTableCustomComponent;
    
    @Input()agPaginationAuto:boolean = false;
    
    constructor() {
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
                headerName: "0",
                field: "hours.0",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "1",
                field: "hours.1",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "2",
                field: "hours.2",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "3",
                field: "hours.3",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "4",
                field: "hours.4",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "5",
                field: "hours.5",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "6",
                field: "hours.6",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "7",
                field: "hours.7",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "8",
                field: "hours.8",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "9",
                field: "hours.9",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "10",
                field: "hours.10",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "11",
                field: "hours.11",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "12",
                field: "hours.12",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "13",
                field: "hours.13",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "14",
                field: "hours.14",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "15",
                field: "hours.15",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "16",
                field: "hours.16",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "17",
                field: "hours.17",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "18",
                field: "hours.18",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "19",
                field: "hours.19",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "20",
                field: "hours.20",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "21",
                field: "hours.21",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "22",
                field: "hours.22",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "23",
                field: "hours.23",
                cellRendererFramework: WorkTimeLineRendererComponent,
                width: 20,
                cellClass: ['cellRender']
            },
            {
                headerName: "",
                field: "",
                width: 20
            },
            {
                headerName: "Utilization",
                field: "utilization",
                cellRendererFramework: UtilizationRendererComponent,
                width: 60
            },

        ];
        
        
        let data = [
            {name: 'Boontung Pongchandaj', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'success', 'success' , 'success' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['none', 'none' , 'none' , 'none'], 6 : [ 'none', 'none' , 'none' , 'none' ] ,  7 : ['none', 'none' , 'none' , 'none'], 8 : [ 'none', 'none' , 'none' , 'none' ] ,  9 : ['none', 'none' , 'none' , 'none'],10 : [ 'none', 'none' , 'none' , 'none' ] ,  11 : ['none', 'none' , 'none' , 'none'], 12 : [ 'none', 'none' , 'none' , 'none' ] ,  13 : ['none', 'none' , 'none' , 'none'],14 : [ 'none', 'none' , 'none' , 'none' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '79' },
            {name: 'Suda Tomson', hours : { 0 : [ 'none', 'none' , 'none' , 'none' ],  1 : [ 'none', 'none' , 'none' , 'none' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['none', 'none' , 'none' , 'none'], 12 : [ 'none', 'none' , 'none' , 'none' ] ,  13 : ['none', 'none' , 'none' , 'none'],14 : [ 'none', 'none' , 'none' , 'none' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] }, utilization: '68' },
            {name: 'Krit Bunnag', hours: { 0 : [ 'none', 'none' , 'none' , 'none' ],  1 : [ 'none', 'none' , 'none' , 'none' ] ,  2 : ['none', 'none' , 'none' , 'none']  ,  3 : ['none', 'none' , 'none' , 'none'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['none', 'none' , 'none' , 'none'],14 : [ 'none', 'none' , 'none' , 'none' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '88' },
            {name: 'Kacha Poonlarp', hours : { 0 : [ 'none', 'none' , 'none' , 'none' ],  1 : [ 'none', 'none' , 'none' , 'none' ] ,  2 : ['none', 'none' , 'none' , 'none']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['none', 'none' , 'none' , 'none'],14 : [ 'none', 'none' , 'none' , 'none' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '34' },
            {name: 'Panthorn Montri', hours : { 0 : [ 'none', 'none' , 'none' , 'none' ],  1 : [ 'none', 'none' , 'none' , 'none' ] ,  2 : ['none', 'none' , 'none' , 'none']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['none', 'none' , 'none' , 'none'],14 : [ 'none', 'none' , 'none' , 'none' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '56' },
            {name: 'Brielle Williamson', hours : { 0 : [ 'none', 'none' , 'none' , 'none' ],  1 : [ 'none', 'none' , 'none' , 'none' ] ,  2 :['none', 'none' , 'none' , 'none']  ,  3 : ['none', 'none' , 'none' , 'none'] , 4 : [ 'none', 'none' , 'none' , 'none' ] ,  5 : ['none', 'none' , 'none' , 'none'], 6 : [ 'none', 'none' , 'none' , 'none' ] ,  7 : ['none', 'none' , 'none' , 'none'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'none', 'none' , 'none' , 'none' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '34' },
            {name: 'Charoen Chansiri', hours : { 0 : [ 'none', 'none' , 'none' , 'none' ],  1 : [ 'none', 'none' , 'none' , 'none' ] ,  2 : ['none', 'none' , 'none' , 'none']  ,  3 : ['none', 'none' , 'none' , 'none'] , 4 : [ 'none', 'none' , 'none' , 'none' ] ,  5 : ['none', 'none' , 'none' , 'none'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'none', 'none' , 'none' , 'none' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '56' },
            {name: 'Thanat Hitapot', hours : { 0 : [ 'none', 'none' , 'none' , 'none' ],  1 : [ 'none', 'none' , 'none' , 'none' ] ,  2 : ['none', 'none' , 'none' , 'none']  ,  3 : ['none', 'none' , 'none' , 'none'] , 4 : [ 'none', 'none' , 'none' , 'none' ] ,  5 : ['none', 'none' , 'none' , 'none'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'none', 'none' , 'none' , 'none' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] }, utilization: '67' },
            {name: 'Kraisee Thanom', hours : { 0 : [ 'none', 'none' , 'none' , 'none' ],  1 : [ 'none', 'none' , 'none' , 'none' ] ,  2 : ['none', 'none' , 'none' , 'none']  ,  3 : ['none', 'none' , 'none' , 'none'] , 4 : [ 'none', 'none' , 'none' , 'none' ] ,  5 : ['none', 'none' , 'none' , 'none'], 6 : [ 'none', 'none' , 'none' , 'none' ] ,  7 : ['none', 'none' , 'none' , 'none'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '77' },
            {name: 'Kantsom Kwaigno', hours : { 0 : [ 'none', 'none' , 'none' , 'none' ],  1 : [ 'none', 'none' , 'none' , 'none' ] ,  2 : ['none', 'none' , 'none' , 'none']  ,  3 : ['none', 'none' , 'none' , 'none'] , 4 : [ 'none', 'none' , 'none' , 'none' ] ,  5 : ['none', 'none' , 'none' , 'none'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '80' },
            {name: 'Nirawit Santisakul', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '56'},
            {name: 'Barinot Charoenkul', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Thipok Prinya', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67' },
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67'},
            {name: 'Airi Satou', hours : { 0 : [ 'danger', 'danger' , 'danger' , 'success' ],  1 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  2 : ['success', 'success' , 'danger' , 'danger']  ,  3 : ['success', 'success' , 'danger' , 'danger'] , 4 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  5 : ['success', 'success' , 'danger' , 'danger'], 6 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  7 : ['success', 'success' , 'danger' , 'danger'], 8 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  9 : ['success', 'success' , 'danger' , 'danger'],10 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  11 : ['success', 'success' , 'danger' , 'danger'], 12 : [ 'danger', 'danger' , 'danger' , 'success' ] ,  13 : ['success', 'success' , 'danger' , 'danger'],14 : [ 'danger', 'danger' , 'danger' , 'success' ] , 15 : ['none', 'none' , 'none' , 'none'],16 : [ 'none', 'none' , 'none' , 'none' ] ,  17 : ['none', 'none' , 'none' , 'none'],18 : [ 'none', 'none' , 'none' , 'none' ] ,  19 : ['none', 'none' , 'none' , 'none'],20 : [ 'none', 'none' , 'none' , 'none' ] ,  21 : ['none', 'none' , 'none' , 'none'] , 22 : ['none', 'none' , 'none' , 'none'],23 : [ 'none', 'none' , 'none' , 'none' ] } , utilization: '67'}
        ];
        
        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.setData(data);
    }
}
