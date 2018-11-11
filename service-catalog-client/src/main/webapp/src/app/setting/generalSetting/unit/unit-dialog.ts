import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MdButton, MdDialogModule } from '@angular/material';
import { Component, OnInit, } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpCustomService } from '../../../shared/common/http/common-http.service';
import { TreeType } from '../../../shared/common/util/data.component';


@Component({
  selector: 'unit-dialog-cmp',
  templateUrl: 'unit-dialog.html',
  providers : [HttpCustomService]
})

export class UnitDialog implements OnInit{
    public unitForm: FormGroup; // our model driven form
    public events: any[] = []; // use later to display form changes
    private id:string = "0";
    private unitName:string = "";
    private abbreviation:string = "";
    private title:string;
    private actionButton:string = "Add Level";
    private isEdit:boolean = false;
    private unitLevelId:number = 0;
    private parentUnitId:string = "0";
    private unit:any= {};
    private treeType:TreeType = TreeType.UnitTree;
    private nameHttpUrl:string;
    private abbreviationHttpUrl:string;

    constructor(private _fb: FormBuilder,
              public dialogRef: MdDialogRef<UnitDialog>, private httpCustomService:HttpCustomService){

    }
    ngOnInit(){
         this.unitForm = this._fb.group({
            id: [this.id],
            name: [this.unitName, [<any>Validators.required], this.unitValidator.bind(this)],
            abbreviation: [this.abbreviation, [], this.abbreviationValidator.bind(this)],
            itemLevelId:[this.unitLevelId],
            parentItemId:[this.parentUnitId]
        });
    }

    unitValidator(control:FormControl):{[key:string]: any}{
         return new Observable(observer => {

             if((this.isEdit && this.unit.name == control.value) || control.value =="" ){
                  observer.next(null);
                   observer.complete();
            }else{
                 var data = {
                     value : control.value
                 }
               
                this.httpCustomService.commonHttpRequest("check"+control.value,this.nameHttpUrl, data, this.unitCheckExistSuccess.bind(this,observer));
                
             }
           
         });
        
    }

    unitCheckExistSuccess(observer, data){
        if(data.success){
            observer.next({unitAvailable:true});
        }else{
            observer.next(null);
        }
         observer.complete();
    }
   abbreviationValidator(control:FormControl):{[key:string]: any}{

          return new Observable(observer => {
             if((this.isEdit && this.unit.abbreviation == control.value) || control.value =="") {
                  observer.next(null);
                  observer.complete();
            }else{
                 var data = {
                     abbreviation : control.value
                 }
               
                this.httpCustomService.commonHttpRequest("check"+control.value,this.abbreviationHttpUrl, data, this.abbreviationExistSuccess.bind(this,observer));
                
             }
         });
       
    }

    abbreviationExistSuccess(observer, data){
        if(data.success){
            observer.next({abbreviationAvailable:true});
        }else{
            observer.next(null);
        }
         observer.complete();
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

    public setFormValues(item){
        this.id = item.id.toString();
        this.unitName = item.name;
        this.abbreviation = item.abbreviation;
         if(this.treeType == TreeType.UnitTree){
            this.parentUnitId = item.parentUnit.id.toString();
            this.unitLevelId = item.unitLevel.id;
         }else{
            this.parentUnitId = item.parentLocation.id.toString();
            this.unitLevelId = item.locationLevel.id;
         }
        this.unit = item;
    }       

    public setUnitLevelId(unitLevelId){
        this.unitLevelId = unitLevelId;
    }

    public setParentUnitId(parentUnitId){
        this.parentUnitId = parentUnitId;
    }

    public setTreeType(treeType:TreeType){
        this.treeType = treeType;
        if(this.treeType == TreeType.UnitTree){
             this.abbreviationHttpUrl  = "unit/checkAbbreviationExist";
            this.nameHttpUrl = "unit/checkUnitExist";
        }else{
            this.abbreviationHttpUrl = "location/checkAbbreviationExist";
           this.nameHttpUrl = "location/checkLocationExist";
        }
    }
}

export interface Item{
    id : number,
    name: string,
    abbreviation: string,
    unitLevelId:number,
    parentUnitId:number

}