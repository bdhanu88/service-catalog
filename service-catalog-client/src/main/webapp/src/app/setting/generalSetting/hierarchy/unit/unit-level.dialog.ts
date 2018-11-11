import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MdButton, MdDialogModule } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UnitHierarchyService } from './unit-hierarchy.service';
import { NotificationActionRendererComponent } from '../../../../shared/render-component/notification-action-renderer.component';
import { ConfirmationDialog } from '../../../../shared/Dialog/confirmation-dialog';
import { CustomValidationService } from '../../../../shared/common/validation/custom-validation.service';
import { LevelType } from '../hierarchy-type.component';



@Component({
  selector: 'unit-level-dialog-cmp',
  templateUrl: 'unit-level.dialog.html',
  providers : [UnitHierarchyService, CustomValidationService]
})

export class UnitLevelDialog implements OnInit{
    public unitLevelForm: FormGroup; // our model driven form
    public events: any[] = []; // use later to display form changes
    private id:number;
    private levelName:string;
    private abbreviation:string;
    private title:string;
    private actionButton:string = "Add Level";
    private isEdit:boolean = false;
    private levelType:LevelType = LevelType.UnitLevel;
    public companyId:number=1;

    

    constructor(private _fb: FormBuilder, private unitHierarchyService:UnitHierarchyService,
              public dialogRef: MdDialogRef<UnitLevelDialog>, public customValidationService:CustomValidationService){

    }
    ngOnInit(){
         this.unitLevelForm = this._fb.group({
            id: [this.id],
            name: [this.levelName, [<any>Validators.required], this.generateDataForCustomValidation.bind(this, true, "unit/level/checkExist" , this.levelName ,this.isEdit)],
            abbreviation: [this.abbreviation, [], this.generateDataForCustomValidation.bind(this, false, "unit/level/abbreviation/checkExist" ,this.abbreviation, this.isEdit)]
        });
    }


    abbreviationValidator(control:FormControl):{[key:string]: any}{
         return new Observable(observer => {
             this.unitHierarchyService.checkAbbreviationExistence(control.value, this.id, this.isEdit,this.companyId).subscribe(
                     data => {
                                if(data.success){
                                    observer.next({abbreviationAvailable:true});
                                }else{
                                    observer.next(null);
                                }
                                observer.complete();
                             },
                 );
         });
    }

    public setTitle(title:string){
        this.title = title;
    }

    public setActionButton(buttonValue:string){
        this.actionButton = buttonValue;
    }

    public setIsEdit(isEdit:boolean){
        this.isEdit = isEdit;
    }

    public setFormValues(unitLevel:UnitLevel){
        this.id = unitLevel.id;
        this.levelName = unitLevel.name;
        this.abbreviation = unitLevel.abbreviation;
    }

    private generateDataForCustomValidation(isName:boolean, requestPath:string ,prvValue:string , isEdit:boolean, control: FormControl):{[key: string]: any}{
        let value = control.value;
        if(this.levelType == LevelType.LocationLevel && isName){
            requestPath = "location/level/checkExist";
        }else if(this.levelType == LevelType.LocationLevel && !isName){
             requestPath = "location/level/abbreviation/checkExist";
        }    
        let data = {
            value : value
        };
        return this.customValidationService.isExistValidator(data, requestPath, prvValue ,isEdit, control);
    }

    public setLevelType(levelType:LevelType){
        this.levelType = levelType;
    }
}


export interface UnitLevel{
    id : number,
    name: string,
    abbreviation: string,
    company:Company
}

export interface Company{
  id:number
}
