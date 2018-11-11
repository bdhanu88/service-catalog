import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgGridTableCustomComponent } from '../../../../shared/ag-grid/table/table.component';
import { UnitHierarchyService } from './unit-hierarchy.service';
import { UnitHierarchyAction } from './unit-hierarchy-action.component';
import { MdDialog } from '@angular/material';
import {UnitLevelDialog, Company} from './unit-level.dialog';
import { HttpCustomService } from '../../../../shared/common/http/common-http.service';
import { LevelType } from '../hierarchy-type.component';
import { HttpType } from '../../../../shared/common/http/http-request.metadata';



@Component({
    selector: 'unitHierarchy-cmp',
    moduleId: module.id,
    templateUrl: 'unit-hierarchy.component.html',
    providers: [UnitHierarchyService, HttpCustomService]
})

export class UnitHierarchy implements OnInit {

    @ViewChild(AgGridTableCustomComponent)
    private tableComponent: AgGridTableCustomComponent;

    private unitHierarchyService:UnitHierarchyService;

    agPaginationAuto:boolean = false;

    private tableData:any[] = [{ abbreviation:"tan tan", name:"wataya", id: 1}];

    @Input()levelType = LevelType.UnitLevel;

    private levelTitle;

    constructor(unitHierarchyService:UnitHierarchyService, public dialog: MdDialog, public httpCustomService:HttpCustomService){
        this.unitHierarchyService = unitHierarchyService;
    }

    ngOnInit() {
    if(this.levelType == LevelType.UnitLevel){
        this.levelTitle = "Unit Hierarchy";
        this.tableComponent.setGridOptionContext({levelType:LevelType.UnitLevel});
    }else{
        this.levelTitle = "Location Hierarchy";
        this.tableComponent.setGridOptionContext({levelType:LevelType.LocationLevel});
    }
    let columnDefs = [
            {
                headerName: "Name",
                field: "name",
                width: 120
            },
            {
                headerName: "Abbreviation",
                field: "abbreviation",
                width: 60
            },
            {
                headerName: "Action",
                cellRendererFramework: UnitHierarchyAction,
                width: 60
            }
        ];
         let data = {};
        if(this.levelType == LevelType.UnitLevel){
             this.httpCustomService.commonHttpRequest("levelData","unit/unitHierarchy", data, this.getLevelDataSuccess.bind(this));
        }else{
           
           this.httpCustomService.commonHttpRequest("levelData","location/locationHierarchy", data, this.getLevelDataSuccess.bind(this));
        }
        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
       this.tableComponent.setData(this.tableData);

    }
    
    getLevelDataSuccess(data){
        if(data.success){
            this.tableComponent.updateData(data.hierarchy);
        } 
    }
    addNewLevel(){
        let dialogRef = this.dialog.open(UnitLevelDialog);
        dialogRef.componentInstance.setTitle("Add Level");
        dialogRef.componentInstance.setActionButton("Add Level");
        dialogRef.componentInstance.setLevelType(this.levelType);

        let httpUrl = "";
          if(this.levelType == LevelType.UnitLevel ){
                httpUrl = "unit/level/add";
          }else{
                httpUrl = "location/level/add";
          }
           
        dialogRef.afterClosed().subscribe(result => {
              var cmpnyObj:Company={id:result.companyId};
              result["company"]=cmpnyObj;
            if(result){
                    this.httpCustomService.commonHttpRequest("addLevel",httpUrl, result, this.addLevelSuccess.bind(this), null, HttpType.POST);
            }
         });
    }

    addLevelSuccess(data){
        if(data.success){
            this.tableComponent.updateData(data.hierarchy);
        }
    }
    public getTableComponent():AgGridTableCustomComponent{
        return this.tableComponent;
    }
}

