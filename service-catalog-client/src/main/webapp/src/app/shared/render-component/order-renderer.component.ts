import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
    selector: 'full-width-cell',
    template: `<td class="text-center table-action">{{priority}}</td>`
})
export class OrderRendererComponent implements ICellRendererAngularComp {
    private params: any;
    public priority: any;

    agInit(params: any): void {
        this.params = params;
        this.priority = params.data.priority;
    }
}