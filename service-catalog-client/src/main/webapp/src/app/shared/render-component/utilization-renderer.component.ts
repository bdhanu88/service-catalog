import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
    selector: 'full-width-cell',
    template: `<td class="text-right table-action">
               <span class="utilization-span">{{utilization}}%</span><a href="#/employees"><i class="material-icons">dvr</i></a>
               </td>`
})
export class UtilizationRendererComponent implements ICellRendererAngularComp {
    private params: any;
    public utilization: string;

    agInit(params: any): void {
        //this.params = params.uti;
        this.utilization = params.value;
    }
}