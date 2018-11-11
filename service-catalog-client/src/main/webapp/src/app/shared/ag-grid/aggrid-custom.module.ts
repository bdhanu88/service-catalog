import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from "ag-grid-angular/main";

import { PaginationComponent } from './pagination/pagination.component';
import { GridHeaderComponent } from './header/header.component';
import { AgGridTableCustomComponent } from './table/table.component';
import { MaterialModule } from '../material/material.module';
import { NameRendererComponent } from '../render-component/name-renderer.component';
import { StatusRendererComponent } from '..//render-component/status-renderer.component';
import { ActionRendererComponent } from '../render-component/action-renderer.component';
import { DurationRendererComponent } from '../render-component/duration-renderer.component';
import { NotificationActionRendererComponent } from '../render-component/notification-action-renderer.component';
import { CheckBoxRendererComponent } from '../render-component/checkbox-renderer.component';
import { UtilizationRendererComponent } from '../render-component/utilization-renderer.component';
import { WorkTimeLineRendererComponent } from '../render-component/work-time-line-renderer.component';
import { OrderRendererComponent } from "../render-component/order-renderer.component";
import { UnitHierarchyAction } from '../../setting/generalSetting/hierarchy/unit/unit-hierarchy-action.component';
import { EmployeeStatusActionRendererComponent } from "../../setting/generalSetting/employee-status/employee-status-action.component";
import {JobTypeActionRendererComponent} from "../../job/jobType/jobType-actionRenderer";
import {EmpTypeCellActionRenderer} from "../../employees/employee-type/employee-type.component";
import {EmployeeProfileActionRendererComponent} from "../../employees/employee-profiles/employee-action.component";
import {ViewActionRendererComponent} from "../../reports/reports.component";

@NgModule({
    imports: [
        CommonModule ,
        MaterialModule ,
        FormsModule,
        AgGridModule.withComponents(
            [NameRendererComponent , StatusRendererComponent , ActionRendererComponent , DurationRendererComponent , NotificationActionRendererComponent , CheckBoxRendererComponent,  UtilizationRendererComponent, WorkTimeLineRendererComponent, OrderRendererComponent,EmployeeStatusActionRendererComponent,JobTypeActionRendererComponent,EmpTypeCellActionRenderer,EmployeeProfileActionRendererComponent,ViewActionRendererComponent]
        )
    ],
    entryComponents:[UnitHierarchyAction],
    declarations: [ PaginationComponent , GridHeaderComponent , AgGridTableCustomComponent , NameRendererComponent , StatusRendererComponent , ActionRendererComponent , DurationRendererComponent , NotificationActionRendererComponent , CheckBoxRendererComponent , UtilizationRendererComponent, WorkTimeLineRendererComponent, OrderRendererComponent, UnitHierarchyAction , EmployeeStatusActionRendererComponent,JobTypeActionRendererComponent,EmpTypeCellActionRenderer,EmployeeProfileActionRendererComponent,ViewActionRendererComponent],
    exports: [ PaginationComponent , GridHeaderComponent , AgGridTableCustomComponent]
})

export class GridCustomModule {}
