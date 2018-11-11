import {SharedModule} from "../shared/shared.module";
import {GENERAL_SETTING_MODULE_COMPONENTS, GENERAL_SETTING_MODULE_ROUTES} from "./setting.routes";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SettingComponent} from "./setting.component";
import {UnitLevelDialog} from "./generalSetting/hierarchy/unit/unit-level.dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {UnitDialog} from "./generalSetting/unit/unit-dialog";
import {JobTypeComponent} from "../job/jobType/jobType.component";
import {JobStatusConfig} from "./generalSetting/job-status-config/job-status-config.comoponent";
import {JobStatusAction} from "./generalSetting/job-status-config/job-status-action.component";
import {JobStatusDialog} from "./generalSetting/job-status-config/job-status.dialog";

@NgModule({
    imports: [
      RouterModule.forChild(GENERAL_SETTING_MODULE_ROUTES) , SharedModule, FormsModule, ReactiveFormsModule,
      BrowserModule, CommonModule
    ],
    entryComponents : [UnitLevelDialog, UnitDialog, JobStatusAction, JobStatusDialog,JobTypeComponent],
    declarations: [ GENERAL_SETTING_MODULE_COMPONENTS , SettingComponent, UnitLevelDialog, UnitDialog,
       JobTypeComponent, JobStatusConfig, JobStatusAction, JobStatusDialog],
    exports : [GENERAL_SETTING_MODULE_COMPONENTS , SettingComponent , SharedModule]
})

export class SettingModule {}
