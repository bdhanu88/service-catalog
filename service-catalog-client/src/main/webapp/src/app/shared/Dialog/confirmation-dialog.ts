import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    template: `
        <h2 md-dialog-title>{{title}}</h2>
        <div md-dialog-content>
            <p>{{message}}</p>
        </div>
        <div md-dialog-action>       
            <button type="button" md-button 
            (click)="dialogRef.close(true)">OK</button>            
             <button *ngIf="isCancelButtonVisible" type="button" md-button 
            (click)="dialogRef.close(false)">Cancel</button>            
        </div>
    `,
})
export class ConfirmationDialog {

    public title: string;
    public message: string;
    public isCancelButtonVisible: boolean = true;

    constructor(public dialogRef: MdDialogRef<ConfirmationDialog>) {

    }
}