import { Component, OnInit , ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid';
//import { PaginationComponent } from '../pagination/pagination.component';

@Component({
    moduleId: module.id,
    selector: 'ag-grid-header',
    templateUrl: 'header.component.html'
})

export class GridHeaderComponent implements OnInit {

    constructor() { }
    
    //@ViewChild(PaginationComponent)
   // private paginationComponent: PaginationComponent;

    public gridOptions: GridOptions;

    private selectOptions: any = [];
    
    private selectedValue:number;
    
    private searchRecord:string = '';

    ngOnInit() {
    }

    setLengthArray() {
        let api: any = this.gridOptions.api;
        this.selectedValue = api.paginationGetPageSize();
        this.selectOptions = [
            { value: api.paginationGetPageSize(), viewValue: api.paginationGetPageSize() },
            { value: 20, viewValue: 20 },
            { value: 50, viewValue: 50 },
            { value: this.gridOptions.rowData.length, viewValue: 'All' }
        ];
    }
    
    filterValue(length: number) {
        let api: any = this.gridOptions.api;
        api.paginationSetPageSize(length);
        //this.paginationComponent.setPage(this.paginationComponent.pager.currentPage);
    }
    
    onSearchRecords() {
        this.gridOptions.api.setQuickFilter(this.searchRecord);
        //this.paginationComponent.setPage(this.paginationComponent.pager.currentPage);
    }
}