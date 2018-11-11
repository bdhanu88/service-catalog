import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
    selector: 'full-width-cell',
    template: `<div class="text-{{ className }}">{{ values }}</div>`
})
export class DurationRendererComponent implements ICellRendererAngularComp {
    private params: any;
    public values: string;
     public className: string;
    
    agInit(params: any): void {
        this.params = params;
        this.values = `${params.data.duration.value}`;
        this.className = `${params.data.duration.className}`;
    }
}