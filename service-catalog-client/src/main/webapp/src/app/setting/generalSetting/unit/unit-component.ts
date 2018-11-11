import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdButton, MdDialogModule } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import {TreeComponent, TreeNode} from 'angular-tree-component'
import { UnitDialog } from './unit-dialog';
import { ConfirmationDialog } from '../../../shared/Dialog/confirmation-dialog';
import { HttpCustomService } from '../../../shared/common/http/common-http.service';
import { HttpType } from '../../../shared/common/http/http-request.metadata';
import { TreeType } from '../../../shared/common/util/data.component';


@Component({
    selector: 'unit-cmp',
    moduleId: module.id,
    templateUrl: 'unit-component.html',
    providers : [HttpCustomService]
})

export class UnitComponent implements OnInit {

     nodes = [{
            name: '',
            children: [
            ]
        }];
    
    @ViewChild(TreeComponent)
    private tree: TreeComponent;

    private addAction:string = "Add Level";
    private editAction:string = "Add Level";
    private removeAction:string = "Add Level";

    private isAddShow:boolean = false;
    private isEditShow:boolean = false;
    private isRemoveShow:boolean = false;

    private selectedId:string = "";
    private parentId:string = "";
    private itemLevels:any[] = []; 
    private addItemHttpUrl:string;
    private getItemHttpUrl:string;
    private removeItemHttpUrl:string; 
    private treeTitle:string = "Units";

    private isLeaf:boolean = false;

    @Input()treeType:TreeType = TreeType.UnitTree;

    constructor(private httpCustomService:HttpCustomService, private dialog:MdDialog){

    }
    ngOnInit() {
        if(this.treeType == TreeType.LocationTree){
            this.getUnitTree("location/locationTree");
             this.addItemHttpUrl = "location/addLocation";
             this.getItemHttpUrl = "location/getLocation";
             this.removeItemHttpUrl = "location/deleteLocation";
           
            this.treeTitle = "Locations"
        }else{
            this.getUnitTree("unit/unitTree");
             this.addItemHttpUrl = "unit/addUnit";
            this.getItemHttpUrl = "unit/getUnit";
            this.removeItemHttpUrl = "unit/deleteUnit";
        }
        
        
    }

    public getUnitTree(httpUrl){
        let data = {};
        this.httpCustomService.commonHttpRequest("unitTree",httpUrl, data, this.getUnitTreeSuccess.bind(this));
    }

    public getUnitTreeSuccess(data){
        if(data.success){
            this.nodes = data.itemTree;
            this.itemLevels = data.itemLevel;
        }
    }

    public addUnit(){
         let dialogRef = this.dialog.open(UnitDialog);
            dialogRef.componentInstance.setTitle(this.addAction);
            dialogRef.componentInstance.setActionButton("Add");
            var ids = this.selectedId.split("_");
            dialogRef.componentInstance.setParentUnitId(ids[1]);
            dialogRef.componentInstance.setUnitLevelId(this.getUnitLevel(ids[0]));
            
            dialogRef.afterClosed().subscribe(result => {
            if(result){
                   this.httpCustomService.commonHttpRequest("addItem",this.addItemHttpUrl, result, this.addUnitSuccess.bind(this), null, HttpType.POST);
            }
         });
    }

    addUnitSuccess(data){
        this.nodes = data.itemTree;
    }

    public editUnit(){
         var ids = this.selectedId.split("_");
         var data = {
             id :  ids[1]
         }
         this.httpCustomService.commonHttpRequest("getItem",this.getItemHttpUrl, data, this.getUnitSuccess.bind(this));
    }
    
    public removeUnit(){
         var ids = this.selectedId.split("_");
         var data = {
             id :  ids[1]
         }
        this.httpCustomService.commonHttpRequest("getItem",this.getItemHttpUrl, data, this.getUnitForRemoveSuccess.bind(this, ids[1]));
       
    }

    getUnitForRemoveSuccess(nodeId,data){
        if(data.success){
                let dialogRef = this.dialog.open(ConfirmationDialog);
            if(!this.isLeaf){
                dialogRef.componentInstance.title ="Remove "+this.removeAction;
                dialogRef.componentInstance.message = "Cannot remove a parent "+data.item.name+" please remove childs first";
                dialogRef.componentInstance.isCancelButtonVisible = false;
            }else{
                dialogRef.componentInstance.title ="Remove "+this.removeAction;
                dialogRef.componentInstance.message = "Are you sure you want to remove "+data.item.name;
                dialogRef.afterClosed().subscribe(result=>{
                if(result == true){
                        var data = {
                        id : nodeId
                    }
                        this.httpCustomService.commonHttpRequest("deleteItem",this.removeItemHttpUrl, data, this.deleteUnitSuccess.bind(this));
                    }
                });
            
            
            }
       }
    }
    public deleteUnitSuccess(data){
        if(data.success){
            this.nodes = data.itemTree;
            let  parentNode = this.tree.treeModel.getNodeById(this.parentId);
            let children:any[] = parentNode.children;
                                        /// colapse if deleted node is the last child
            if(children.length == 1){
                parentNode.collapse();
            }
        }
    }
    getUnitSuccess(data){
        if(data.success){
             let dialogRef = this.dialog.open(UnitDialog);
            dialogRef.componentInstance.setTitle(this.editAction);
            dialogRef.componentInstance.setActionButton("Edit");
            dialogRef.componentInstance.setTreeType(this.treeType);
            dialogRef.componentInstance.setFormValues(data.item);
            dialogRef.componentInstance.setIsEdit(true);
            dialogRef.afterClosed().subscribe(result => {
            if(result){
                   this.httpCustomService.commonHttpRequest("addUnit",this.addItemHttpUrl, result, this.addUnitSuccess.bind(this), null, HttpType.POST);
            }
         });
        }
    }
    getUnitLevel(id):number{
       
        let index:number = 0;
        for(let unitLevel of this.itemLevels){
            if(id == unitLevel.id){
                return  this.itemLevels[index+1].id;
            }
            index++;
        }
        return 0;
    }
    treeclickEvent(event) {
        //debugger;
        this.selectedId = event.node.id;
        this.parentId = event.node.parent.id;
        this.isLeaf = event.node.isLeaf;
        
        this.setActionButtons(this.selectedId);
    }

    public setActionButtons(id){
         let ids:number[] = id.split("_"); 
         let index:number = 0;
    
        this.isAddShow = false;
        this.isEditShow = false;
        this.isRemoveShow = false;
         for(let unitLevel of this.itemLevels){
            if(ids[0] == unitLevel.id){
                this.editAction= unitLevel.name;
                this.removeAction = unitLevel.name;
                if((index+1) <= (this.itemLevels.length -1)){ // this is the organization level
                    this.isAddShow = true;
                    this.addAction = this.itemLevels[index + 1].name;
                    this.isAddShow = true;
                }
                if(index != 0){
                    this.isEditShow = true;
                    this.isRemoveShow = true;
                }
                return false;
            }
            index++;
         }
    }
}