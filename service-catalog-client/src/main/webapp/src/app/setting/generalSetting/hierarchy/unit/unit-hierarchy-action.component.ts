import {Component} from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular/main';
import { UnitLevel, UnitLevelDialog } from './unit-level.dialog';
import { MdDialog, MdDialogRef, MdDialogModule } from '@angular/material';
import { UnitHierarchyService } from './unit-hierarchy.service';
import { ConfirmationDialog } from '../../../../shared/Dialog/confirmation-dialog';
import { HttpCustomService } from '../../../../shared/common/http/common-http.service';
import { HttpType } from '../../../../shared/common/http/http-request.metadata';
import { LevelType } from '../hierarchy-type.component';

@Component({
    selector: 'full-width-cell',
    template: `<td class="text-right table-action">
               <button type="button" rel="tooltip" title="" class="btn btn-primary btn-simple btn-xs"
				data-original-title="Edit Level" (click)="editHierarchy()"><i class="material-icons">dvr</i><div class="ripple-container"></div></button>
               <button type="button" rel="tooltip" title="" class="btn btn-primary btn-simple btn-xs"
				data-original-title="Remove Level" (click)="removeHierarchy()"><i class="material-icons">delete</i></button>
               </td>`,
    providers:[UnitHierarchyService, HttpCustomService]
})
export class UnitHierarchyAction implements ICellRendererAngularComp {
    private params: any;
    private unitLevel:UnitLevel;
    private levelType:LevelType;
    private httpAddUrl:string;
    private httpDeleteUrl:string;
    private httpCheckValidity:string;

    agInit(params: any): void {
        this.params = params;
        this.unitLevel = params.data;
        this.levelType = params.context.levelType;
     
            if(this.levelType == LevelType.UnitLevel){
                this.httpAddUrl = "unit/level/add";
                this.httpDeleteUrl = "unit/level/delete";
                this.httpCheckValidity = "unit/checkForDeleteValidity";
            }else{
                this.httpAddUrl = "location/level/add";
                this.httpDeleteUrl = "location/level/delete";
                this.httpCheckValidity = "location/checkForDeleteValidity";
            }  
    }

    constructor(public dialog:MdDialog, private unitHierarchyService:UnitHierarchyService,
                private httpCustomService:HttpCustomService){

    }

    editHierarchy(){
            let dialogRef = this.dialog.open(UnitLevelDialog);
            dialogRef.componentInstance.setTitle("Edit Level");
            dialogRef.componentInstance.setActionButton("Edit Level");
            dialogRef.componentInstance.setFormValues(this.unitLevel);
            dialogRef.componentInstance.setIsEdit(true);
            dialogRef.componentInstance.setLevelType(this.levelType);
            
            dialogRef.afterClosed().subscribe(result => {
            if(result){
                   this.httpCustomService.commonHttpRequest("addLevel",this.httpAddUrl, result, this.addLevelSuccess(this), null, HttpType.POST);
            }
         });
    }
    addLevelSuccess(data){
        if(data.success){
             this.params.api.setRowData(data.hierarchy);
        }
    }
    removeHierarchy(){
        
             this.httpCustomService.commonHttpRequest("checkForDeleteValidity",this.httpCheckValidity, this.unitLevel, this.checkForDeleteValidtiySuccess.bind(this), null, HttpType.POST);
        
    }

    checkForDeleteValidtiySuccess(data){
         let dialogRef = this.dialog.open(ConfirmationDialog);
        if(data.success){
        
                dialogRef.componentInstance.title ="Remove Unit Level";
                dialogRef.componentInstance.message = "Are you sure you want to remove "+this.unitLevel.name;
                //TODO first need to check whether its maps with any unit or not
                dialogRef.afterClosed().subscribe(result=>{
                if(result == true){
                      let data1 = {
                        id :this.unitLevel.id
                    }
                    this.httpCustomService.commonHttpRequestWithoutCallBacks(this.httpDeleteUrl, data1).subscribe(
                        data => {
                            if(data.success){
                                this.params.api.setRowData(data.hierarchy);
                             }
                        }
                    );
                   // this.httpCustomService.commonHttpRequest("deleteLevel",this.httpDeleteUrl, data1, this.deleteLevelSuccess(this));
                }
                });
           
               
           
        }else{
            if(data.isParentOrg){
                if(this.levelType == LevelType.UnitLevel){
                    dialogRef.componentInstance.title ="Remove Unit Level";
                    dialogRef.componentInstance.message = "You can not remove the oranazation level";
                    dialogRef.componentInstance.isCancelButtonVisible = false;
                }else{
                    dialogRef.componentInstance.title ="Remove Location Level";
                    dialogRef.componentInstance.message = "You can not remove the oranazation level";
                    dialogRef.componentInstance.isCancelButtonVisible = false;
                }
            }else{
                if(this.levelType == LevelType.UnitLevel){
                    dialogRef.componentInstance.title ="Remove Unit Level";
                    dialogRef.componentInstance.message = "You can not remove a Unit Level which is mapped to a unit";
                    dialogRef.componentInstance.isCancelButtonVisible = false;
                }else{
                    dialogRef.componentInstance.title ="Remove Location Level";
                    dialogRef.componentInstance.message = "You can not remove a Location Level which is mapped to a location";
                    dialogRef.componentInstance.isCancelButtonVisible = false;
                }
            }   
        }
    }

   public deleteLevelSuccess(data){
        if(data.success){
            this.params.api.setRowData(data.hierarchy);
        }
    }    
}