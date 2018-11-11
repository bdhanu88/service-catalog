import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
    selector: 'full-width-cell',
    template: `<td class="text-right table-action">
               <a href="#/employees"><i class="material-icons">forward</i></a>
               <a href="#/employees"><i class="material-icons">reply</i></a>
               <a href="#/employees"><i class="material-icons">close</i></a>
               </td>`
})
export class NotificationActionRendererComponent implements ICellRendererAngularComp {
    private params: any;
    public values: string;

    agInit(params: any): void {
        this.params = params;
    }
}