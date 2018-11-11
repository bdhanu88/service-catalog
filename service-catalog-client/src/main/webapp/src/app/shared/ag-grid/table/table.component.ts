import { Component , AfterViewInit , ViewChild, Input} from '@angular/core';
import { GridOptions , RowNode } from 'ag-grid';
import { PaginationComponent } from '../pagination/pagination.component';
import { GridHeaderComponent } from '../header/header.component';


@Component({
    selector: 'ag-grid-table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class AgGridTableCustomComponent  implements AfterViewInit{

    private gridOptions: GridOptions;
    
    @ViewChild(PaginationComponent)
    private paginationComponent: PaginationComponent;
    
    @ViewChild(GridHeaderComponent)
    private gridHeaderComponent: GridHeaderComponent;
    
    @Input() public  agPaginationAuto:boolean = false;
    
    @Input() public agHeader:boolean = true;

    @Input() public agPagination:boolean = true; 
    
    constructor() {
        this.gridOptions = <GridOptions>{};
    }
    
    ngOnInit() {
        this.gridOptions.enableSorting =  true;
        this.gridOptions.pagination = true;
        this.gridOptions.paginationPageSize = 10;
        this.gridOptions.paginationAutoPageSize = this.agPaginationAuto;
        this.gridOptions.suppressPaginationPanel = true;
        this.gridOptions.headerHeight = 40;
    }
    
    ngAfterViewInit() {
       this.paginationSet(1);
       this.headerElementSet();
       this.refreshTableView();
       
    }
    
    refreshTableView(){
        this.gridOptions.api.sizeColumnsToFit();
    }
    
    headerElementSet(){
       if(this.agHeader){
        this.gridHeaderComponent.gridOptions = this.gridOptions;
        this.gridHeaderComponent.setLengthArray();
       }
    }
    
    paginationSet(pageNum:number){
        if(this.agPagination){
            this.paginationComponent.gridOptions = this.gridOptions;
            this.paginationComponent.setPage(pageNum);   
        }
    }
    
    setColumnDef(columnDefs:any){
        this.gridOptions.columnDefs = columnDefs;
    }
    
    setData(rowData:any){
        this.gridOptions.rowData = rowData;
       
    }

    updateData(rowData:any){
         this.gridOptions.api.setRowData(rowData);
         this.gridOptions.api.sizeColumnsToFit();
    }

    setGridOptionContext(context:any){
        this.gridOptions.context = context;
    }
}
