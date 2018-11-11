import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
    selector: 'full-width-cell',
    template: `<div class='employee'><img src="assets/img/faces/marc.jpg" class="photo">  <span class='employeeName' >{{ values }}</span>`
})
export class NameRendererComponent implements ICellRendererAngularComp {
    private params: any;
    public values: string;

    agInit(params: any): void {
        this.params = params;
        this.values = `${params.data.name}`;
    }
}