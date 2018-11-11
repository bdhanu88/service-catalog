import { Component, OnInit, Directive, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'job-status-dialog-cmp',
    templateUrl: './job-status.dialog.html',

    //providers : [UnitHierarchyService]
})

export class JobStatusDialog implements OnInit {
    public jobStatusForm: FormGroup; // our model driven form
    public events: any[] = []; // use later to display form changes
    private id: number;
    private jobStatusName: string;
    private abbreviation: string;

    private title: string;
    private actionButton: string = "Add Job Status";
    private isEdit: boolean = false;
    public jobStatusKey: JOB_STATUS_TYPES;
    private keys;
    private jobStatus = JOB_STATUS_TYPES;

    JOB_STATUS_TYPES: typeof JOB_STATUS_TYPES = JOB_STATUS_TYPES;
  //  private active:JOB_STATUS_TYPES;

    constructor(private _fb: FormBuilder, public dialogRef: MdDialogRef<JobStatusDialog>) {
        this.keys = Object.keys(this.jobStatus).filter(Number);
    }
    ngOnInit() {
        this.jobStatusForm = this._fb.group({
            id: [this.id],
          jobStatusName: [this.jobStatusName, [<any>Validators.required]],
            abbreviation: [this.abbreviation, [<any>Validators.required]],
            jobStatusType:[this.jobStatusKey, [<any>Validators.required]]
            // this.levelValidator.bind(this)],
            // abbreviation: [this.abbreviation, [], this.abbreviationValidator.bind(this)]
        });
    }


    // abbreviationValidator(control:FormControl):{[key:string]: any}{
    //      return new Observable(observer => {
    //          this.unitHierarchyService.checkAbbreviationExistence(control.value, this.id, this.isEdit).subscribe(
    //                  data => {
    //                             if(data.success){
    //                                 observer.next({abbreviationAvailable:true});
    //                             }else{
    //                                 observer.next(null);
    //                             }
    //                             observer.complete();
    //                          },
    //              );
    //      });
    // }

    public setTitle(title: string) {
        this.title = title;
    }

    public setActionButton(buttonValue: string) {
        this.actionButton = buttonValue;
    }

    public setIsEdit(isEdit: boolean) {
        this.isEdit = isEdit;
    }

    public setFormValues(jobStatus: JobStatus) {

        this.id = jobStatus.id;
        this.jobStatusName = jobStatus.jobStatusName;
        this.abbreviation = jobStatus.abbreviation;
        this.jobStatusKey = jobStatus.jobStatusType ;
   debugger;
    //Color[green];
       // JOB_STATUS_TYPES.values()[1]

    }
}

export interface JobStatus {
    id: number,
    jobStatusName: string,
    abbreviation: string,
    jobStatusType: JOB_STATUS_TYPES
}

export enum JOB_STATUS_TYPES {
    ON_ROUTE =1,
    ONE=2 ,
    TWO=3
}
