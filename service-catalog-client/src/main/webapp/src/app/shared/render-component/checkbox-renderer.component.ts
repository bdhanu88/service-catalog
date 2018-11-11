import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
    selector: 'full-width-cell',
    template: `<div class="check-box-action"><md-checkbox></md-checkbox></div>`
})
export class CheckBoxRendererComponent implements ICellRendererAngularComp {
    private params: any;
    public values: string;

    agInit(params: any): void {
        this.params = params;
    }
}