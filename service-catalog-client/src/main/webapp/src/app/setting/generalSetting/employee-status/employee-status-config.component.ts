import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgGridTableCustomComponent } from '../../../shared/ag-grid/table/table.component';
import { MdDialog , MdDialogRef } from '@angular/material';
import { EmployeeStatusDialog } from "./employee-status.dialog";
import { HttpCustomService, HttpType } from '../../../shared/common';
import { EmployeeStatusActionRendererComponent } from "./employee-status-action.component";
import { ConfirmationDialog } from "../../../shared/Dialog/confirmation-dialog";
import {CustomValidationService} from "../../../shared/common/validation/custom-validation.service";


@Component({
    selector: 'employee-status-config-cmp',
    moduleId: module.id,
    templateUrl: 'employee-status-config.component.html',
})

export class EmployeeStatusConfigComponent implements OnInit {

    @ViewChild(AgGridTableCustomComponent)
    private tableComponent: AgGridTableCustomComponent;

    agPaginationAuto:boolean = false;

    private tableData:any[] = [{ abbreviation:"tan tan", name:"wataya", id: 1}];
    private employeeStatusTypes: any[] = [];

    constructor(private httpCustomService:HttpCustomService,public dialog: MdDialog
      ,private customValidation:CustomValidationService){
        this.httpCustomService.commonHttpRequest("getEmployeeStatusType" , "employeeStatusConfig/getEmployeeStatusType" , null  , this.getEmployeeStatusTypeSuccess.bind(this));
    }

    ngOnInit() {

    let columnDefs = [
            {
                headerName: "Name",
                field: "name",
                width: 40
            },
            {
                headerName: "Abbreviation",
                field: "abbreviation",
                width: 25
            },
            {
                headerName: "Employee Status Type",
                field: "employeeStatusType",
                width: 25
            },
            {
                headerName: "Action",
                cellRendererFramework: EmployeeStatusActionRendererComponent,
                width: 10
            }
        ];

        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.setData(this.tableData);
        this.tableComponent.setGridOptionContext( { parentComponent : this } );
        this.httpCustomService.commonHttpRequest("getAllEmployeeStatus" , "employeeStatusConfig/getAllEmployeeStatus" , null  , this.updateTable.bind(this));


    }

    addNewEmployeeStatus(){
          this.openEmployeeStatusGroupDialog(Action.ADD , null);
    }

    editEmployeeStatus(employeeStatus:any){
          this.openEmployeeStatusGroupDialog(Action.EDIT , employeeStatus);
    }

    removeEmployeeStatus(employeeStatusId){
        let dialogRef = this.dialog.open(ConfirmationDialog);
        dialogRef.disableClose = true;

        dialogRef.componentInstance.title ="Remove Employee Status";
        dialogRef.componentInstance.message = "Are you sure you want to remove Employee Status";
        dialogRef.afterClosed().subscribe(result=>{
            if(result == true){
                let data = { id : employeeStatusId};
                this.httpCustomService.commonHttpRequest("removeEmployeeStatus:ID_"+employeeStatusId , "employeeStatusConfig/removeEmployeeStatus" , data  , this.updateTable.bind(this));
            }
        });
    }



    private openEmployeeStatusGroupDialog(action:Action, entity:any):void {
         let dialogRef = this.dialog.open(EmployeeStatusDialog);
         dialogRef.disableClose = true;
         let empStatusTypeId = 0;
         if(entity != null){
             empStatusTypeId = this.employeeStatusTypes.indexOf(entity.employeeStatusType);
         }
         this.setActionButtonAndHeader(dialogRef, action, empStatusTypeId);
         if(entity != null){
            dialogRef.componentInstance.setDialogDetails(entity);
         }
         dialogRef.afterClosed().subscribe(data => {
            if(data){
                    let employeeStatus:EmployeeStatus = {
                       id: data.id,
                       name: data.name.trim(),
                       abbreviation: data.abbreviation.trim(),
                       employeeStatusType :data.employeeStatusType
                   };
                   this.httpCustomService.commonHttpRequest("addEmployeeStatus:ID_"+employeeStatus.id , "employeeStatusConfig/add" , employeeStatus  , this.updateTable.bind(this), null, HttpType.POST);

            }
         });
    }

    private setActionButtonAndHeader(dialogRef:MdDialogRef<EmployeeStatusDialog>, action:Action, empStatusTypeId:number):void{
        if(action === Action.ADD){
            dialogRef.componentInstance.setTitle("Add Employee Status");
            dialogRef.componentInstance.setActionButton("Add");
            dialogRef.componentInstance.setIsEdit(false);
        }else if(action == Action.EDIT){
            dialogRef.componentInstance.setTitle("Edit Employee Status");
            dialogRef.componentInstance.setActionButton("Edit");
            dialogRef.componentInstance.setIsEdit(true);
        }
        dialogRef.componentInstance.setEmployeeStatusTypes(this.employeeStatusTypes , empStatusTypeId);
    }

    private getEmployeeStatusTypeSuccess(data:any){
        this.employeeStatusTypes = data;
    }

    private updateTable(data){
        this.tableComponent.updateData(data.employeeStatus)
    }

}

export interface EmployeeStatus {
    id: number;
    name: string;
    abbreviation: string;
    employeeStatusType : number;
}

export enum Action {
    ADD,
    EDIT
}
