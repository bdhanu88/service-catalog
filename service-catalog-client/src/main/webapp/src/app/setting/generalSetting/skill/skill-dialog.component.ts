import { Component, ViewChild , OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdButton, MdDialogModule } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { TreeNode, TreeComponent } from 'angular-tree-component'
import { HttpCustomService, HttpType, ReturnType, CustomValidationService } from '../../../shared/common';
import { SkillComponent } from "./skill.component";

@Component({
  selector: 'skill-dialog-cmp',
  templateUrl: 'skill-dialog.html'
})

export class SkillDialog implements OnInit{


  public skillForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  private isSkillGroup:boolean = true;
  private title:string;
  private actionButton:string;
  private isEdit:boolean = false;
  private entityId:number;
  private entityName:string;
  private entityAbbreviation:string;
  private skillGroups: any[] = [];
  private skillGroupId:number = 0;
  private companyId:number=1;
  private type:string;
  

  constructor(public dialogRef: MdDialogRef<SkillDialog>,public customValidationService:CustomValidationService,
              private _fb: FormBuilder) {
  }

   ngOnInit() {
       this.skillForm = this._fb.group({
            id: [this.entityId ],
            name: [this.entityName , [<any>Validators.required], this.generateDataForCustomValidation.bind(this, true, "skill/checkExist" , this.entityName ,this.isEdit)],
            abbreviation: [this.entityAbbreviation,[],this.generateDataForCustomValidation.bind(this, false, "skill/checkExist" ,this.entityAbbreviation, this.isEdit)],
            skillGroup: [this.skillGroupId ],
            companyId:[this.companyId]
        });
   }
   public setActionButtonString(actionButtionValue:string){
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

   public setSkillGroupDialogDetails(isSkillGroup , skillGroups , skillGroupId){
       this.isSkillGroup = isSkillGroup;
       this.type = "Skill Group";
       if(!isSkillGroup){
            this.type = "Skill";
            this.skillGroups =  skillGroups;
            this.skillGroupId = parseInt(skillGroupId.replace('sg_',''));
       }
   }

    private generateDataForCustomValidation(isName:boolean, requestPath:string ,prvValue:string , isEdit:boolean, control: FormControl):{[key: string]: any}{
        let value = control.value;
        let data = {};
        data["value"] = value;
        data["isName"] = isName;
        data["isSkillGroup"] = this.isSkillGroup;
        return this.customValidationService.isExistValidator(data, requestPath, prvValue ,isEdit, control);
    }

}
