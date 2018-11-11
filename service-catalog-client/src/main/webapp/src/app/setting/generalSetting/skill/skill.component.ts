import { Component, ViewChild } from '@angular/core';
import { TreeNode, TreeComponent } from 'angular-tree-component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { HttpCustomService, HttpType, ReturnType } from '../../../shared/common';
import { SkillDialog } from "./skill-dialog.component";
import { ConfirmationDialog } from '../../../shared/Dialog/confirmation-dialog';
import {CustomValidationService} from "../../../shared/common/validation/custom-validation.service";


@Component({
    selector: 'skill-cmp',
    templateUrl: './skill.component.html',
    providers: []

})
export class SkillComponent{

    @ViewChild(TreeComponent)
    private tree: TreeComponent;

    private selectedId:any = 0;

    private isLeaf:boolean = false;

    private isSkillGroupSelected:boolean = false;

    private isSkillSelected:boolean = false;

    private skillGroups: any[] = [];

    private companyId:number=1;

    private options = {
        nodeClass: (node:TreeNode) => {

            if(node.data.icon){
                return 'tree-' + node.data.icon;
            }

        return 'tree-node-folder';
    }
   };
   private nodes = [{
        name: '',
        children: []
    }];

    constructor(private httpCustomService:HttpCustomService, private dialog: MdDialog,
                private customValidation:CustomValidationService) {
        this.httpCustomService.commonHttpRequest("getAllSkillTree" , "skill/getTree?companyId="+this.companyId , null  , this.generateSkillTree.bind(this, true));
    }

    ngOnInit() {

    }

    private generateSkillTree(isSetSelectedId:boolean,data:any) : void{
        this.nodes = data.tree;
        let skillGroups = data.skillGroups;
        this.skillGroups = skillGroups;

        if(isSetSelectedId){
            if(skillGroups.length > 0){
                this.selectedId = skillGroups[0].id;
            }else{
                this.selectedId = -1;
            }
        }
    }

    treeclickEvent(event) {
        this.selectedId = event.node.id;
        this.isLeaf = event.node.isLeaf;

        let parentId = event.node.parent.id;

        if (parentId == 0) {
            this.isSkillGroupSelected = true;
             this.isSkillSelected = false;
        }else{
            this.isSkillGroupSelected = false;
            if(this.isLeaf && this.selectedId !== 0){
                this.isSkillSelected = true;
            }else{
                this.isSkillSelected = false;
            }
        }
    }

    addEntity(isSkillGroup){
        let headerName = "Skill";
        if(isSkillGroup){
            headerName = "Skill Group";
        }
        this.openSkillGroupDialog(Action.ADD, null , headerName, isSkillGroup);
    }

    editEntity(isSkillGroup){

        let id = "sg_0";
        let url = '';
        let headerName = '';
        if(isSkillGroup){
            id = this.selectedId.replace('sg_','');
            url = "skill/getSkillGroupById";
            headerName = "Skill Group";
        }else{
            id = this.selectedId.replace('s_','');
            url = "skill/getSkillById";
            headerName = "Skill";
        }

        let data = {};
        data["id"] = id;

        this.httpCustomService.commonHttpRequest("getEntity_ID_"+id , url , data  , this.getEntitySuccess.bind(this, headerName , isSkillGroup));
    }

    removeEntity(isSkillGroup){
        let dialogRef = this.dialog.open(ConfirmationDialog);
        dialogRef.disableClose = true;

        if(isSkillGroup){

            dialogRef.componentInstance.title ="Remove Skill Group";
            if(!this.isLeaf){
                 dialogRef.componentInstance.message = "Cannot remove a Skill Group please remove skill's first";
            }else{
                dialogRef.componentInstance.message = "Are you sure you want to remove Skill Group";
                dialogRef.afterClosed().subscribe(result=>{
                    if(result == true){
                        let id = this.selectedId.replace('sg_','');
                        let data = { id : id,companyId:this.companyId};
                        this.httpCustomService.commonHttpRequest("removeSkillGroup_ID_"+id , "skill/removeSkillGroup" , data  , this.generateSkillTree.bind(this, false));

                    }
                });
            }
        }else{
            dialogRef.componentInstance.title ="Remove Skill";
            dialogRef.componentInstance.message = "Are you sure you want to remove Skill";
            dialogRef.afterClosed().subscribe(result=>{
                if(result == true){
                    let id = this.selectedId.replace('s_','');
                    let data = { id : id,companyId:this.companyId};
                    this.httpCustomService.commonHttpRequest("removeSkill_ID_"+id , "skill/removeSkill" , data  , this.generateSkillTree.bind(this, false));
                }
            });
        }
    }

    openSkillGroupDialog(action:Action, entity:any , entityType:string, isSkillGroup:boolean):void {
         let dialogRef = this.dialog.open(SkillDialog);
         dialogRef.disableClose = true;
         let skillGroupId = this.selectedId;
         if(action === Action.EDIT && !isSkillGroup){
            skillGroupId = "sg_"+entity.skillGroup.id;
         }
         this.setSkillGroupActionButtonAndHeader(dialogRef, action, entityType , isSkillGroup, skillGroupId);
         if(entity != null){
            dialogRef.componentInstance.setDialogDetails(entity);
         }
         dialogRef.afterClosed().subscribe(data => {
            if(data){
                if(isSkillGroup){
				var companyObj:Company={id:data.companyId};
                    let skillGroup:SkillGroup = {
                       id: data.id,
                       name: data.name.trim(),
                       abbreviation: data.abbreviation.trim(),
					   company:companyObj
                   };
                   this.httpCustomService.commonHttpRequest("addSkillGroup" , "skill/skillGroup/add" , skillGroup  , this.generateSkillTree.bind(this, false), null, HttpType.POST);
                }else{

                    let skill = {
                       id: data.id,
                       name: data.name.trim(),
                       abbreviation: data.abbreviation.trim(),
                       skillGroup : { id : data.skillGroup }
                    };
                   this.httpCustomService.commonHttpRequest("addSkill" , "skill/add" , skill  , this.generateSkillTree.bind(this, false), null, HttpType.POST);
                }

            }
         });
    }

    setSkillGroupActionButtonAndHeader(dialogRef:MdDialogRef<SkillDialog>, action:Action, entityType:string, isSkillGroup:boolean, skillGroupId:string):void{
        if(action === Action.ADD){
            dialogRef.componentInstance.setTitle("Add "+entityType);
            dialogRef.componentInstance.setActionButtonString("Add");
            dialogRef.componentInstance.setIsEdit(false);
        }else if(action == Action.EDIT){
            dialogRef.componentInstance.setTitle("Edit "+entityType);
            dialogRef.componentInstance.setActionButtonString("Edit");
            dialogRef.componentInstance.setIsEdit(true);
        }
        dialogRef.componentInstance.setSkillGroupDialogDetails(isSkillGroup ,this.skillGroups , skillGroupId);
    }

    getEntitySuccess( headerName:string, isSkillGroup:boolean, data:any){
        this.openSkillGroupDialog(Action.EDIT, data.entity , headerName , isSkillGroup);
    }

}

export interface SkillGroup {
    id: number;
    name: string;
    abbreviation: string;
	company:Company;
}

export interface Skill {
    id: number;
    name: string;
    abbreviation: string;
    skillGroup : SkillGroup;
}

export enum Action {
    ADD,
    EDIT
}
export interface Company{
  id:number
}
