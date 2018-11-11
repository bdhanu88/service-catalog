import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
    selector: 'full-width-cell',
    template: `<td class="text-right table-action">
               <a [href]="action?'#/'+ action.url : ''"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>
               <a [href]="action?'#/'+ action.url : ''"><i class="material-icons">close</i></a>
               </td>`
})
export class ActionRendererComponent implements ICellRendererAngularComp {
    private params: any;
    public action: any;

    agInit(params: any): void {
        this.params = params;
        this.action = params.data.action;
    }
}
