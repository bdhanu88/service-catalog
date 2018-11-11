import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgGridTableCustomComponent } from '../../../../shared/ag-grid/table/table.component';
import { MdDialog } from '@angular/material';
import { HttpCustomService } from '../../../../shared/common/http/common-http.service';
import { UnitHierarchy } from '../unit/unit-hierarchy.component';
import { LevelType } from '../hierarchy-type.component';

@Component({
    selector: 'locationHierarchy-cmp',
    moduleId: module.id,
    templateUrl: 'location-hierarchy.component.html',
    providers : [HttpCustomService]
})

export class LocationHierarchy implements OnInit {

    private levelType = LevelType.LocationLevel;
    @ViewChild(UnitHierarchy)
    private unitHierarchy: UnitHierarchy;

    ngOnInit(){
        this.getLocationData();
    }

    constructor(private httpCustomService:HttpCustomService){

    }
    getLocationData(){
        let data = {};
        this.httpCustomService.commonHttpRequest("locationData","location/locationHierarchy", data, this.getLocationDataSuccess.bind(this));
    }

    getLocationDataSuccess(data){
        if(data.success){
            this.unitHierarchy.getTableComponent().updateData(data.hierarchy);
        }
    }
}

export interface LocationLevel{
    id,
    name,
    abbreviation
}