import { Component, ViewChild , OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdButton, MdDialogModule } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TreeNode, TreeComponent } from 'angular-tree-component'
import { HttpCustomService, HttpType, ReturnType, CustomValidationService } from '../../../shared/common';
import { EmployeeStatusConfigComponent } from "./employee-status-config.component";

@Component({
  selector: 'employee-status-dialog-cmp',
  templateUrl: 'employee-status-dialog.html'
})

export class EmployeeStatusDialog implements OnInit{


  public empStatusForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  private title:string;
  private actionButton:string;
  private isEdit:boolean = false;
  private entityId:number;
  private entityName:string;
  private entityAbbreviation:string;
  private employeeStatusTypes: any[] = [];
  private employeeStatusTypeId:number = 0;
  private type:string;
  

  constructor(public dialogRef: MdDialogRef<EmployeeStatusDialog>,public customValidationService:CustomValidationService,
              private _fb: FormBuilder) {
  }

   ngOnInit() {
       this.empStatusForm = this._fb.group({
            id: [this.entityId ],
            name: [this.entityName , [<any>Validators.required], this.generateDataForCustomValidation.bind(this, true, "employeeStatusConfig/checkExist" , this.entityName ,this.isEdit)],
            abbreviation: [this.entityAbbreviation,[],this.generateDataForCustomValidation.bind(this, false, "employeeStatusConfig/checkExist" ,this.entityAbbreviation, this.isEdit)],
            employeeStatusType: [this.employeeStatusTypeId],
        });
   }
   public setActionButton(actionButtionValue:string){
      this.actionButton = actionButtionValue;
   }

   public setTitle(title:string){
        this.title = title;
   }

   public setIsEdit(isEdit:boolean){
       this.isEdit = isEdit;
   }
   public setDialogDetails(entity){
        this.entityId =  entity.id;
        this.entityName = entity.name;
        this.entityAbbreviation = entity.abbreviation;
   }

   public setEmployeeStatusTypes(employeeStatusTypesParam:any[] , selectedValue:number){
       this.employeeStatusTypeId = selectedValue;
       this.employeeStatusTypes = employeeStatusTypesParam; 
   }

    private generateDataForCustomValidation(isName:boolean, requestPath:string ,prvValue:string , isEdit:boolean, control: FormControl):{[key: string]: any}{
        let value = control.value;
        let data = {};
        data["value"] = value;
        data["isName"] = isName;
        return this.customValidationService.isExistValidator(data, requestPath, prvValue ,isEdit, control);
    }

}