import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
    selector: 'full-width-cell',
    template: `<div class="col-sm-9 employee-status"><button type="button" class="btn btn-{{ className }} btn-block">{{ values }}<div class="ripple-container"></div></button></div>`
})
export class StatusRendererComponent implements ICellRendererAngularComp {
    private params: any;
    public values: string;
     public className: string;
    
    agInit(params: any): void {
        this.params = params;
        this.values = `${params.data.status.value}`;
        this.className = `${params.data.status.className}`;
    }
}