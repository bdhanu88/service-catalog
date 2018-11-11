import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
    selector: 'full-width-cell',
    template: `<div *ngFor="let value of values" class="pull-left btn-{{value}}"  [ngStyle]="{'width': '25%' , 'height': '100%'}">&nbsp;</div>`
})
export class WorkTimeLineRendererComponent implements ICellRendererAngularComp {
    private params: any;
    public values: any;
    public width:number;
    
    agInit(params: any): void {
        this.params = params;
        this.values = params.value;
        this.width = 100/this.values.length;
    }
}