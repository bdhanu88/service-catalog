import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { PaginationService } from './pagination.service'
 
@Component({
    moduleId: module.id,
    selector: 'ag-grid-pagination',
    templateUrl: 'pagination.component.html',
    providers: [ PaginationService ]
})
 
export class PaginationComponent implements OnInit {
    
    constructor(private paginationService: PaginationService) { }
    
    public gridOptions: GridOptions;
 
    // pager object
    public pager: any = {};
 
    // paged items
    private pagedItems: any[];
    
    
 
    ngOnInit() {
    }
 
    setPage(page: number) {
        
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.paginationService.getPager(this.gridOptions.rowData.length, page , this.gridOptions.api , this.gridOptions.api.paginationGetPageSize());
    }
}