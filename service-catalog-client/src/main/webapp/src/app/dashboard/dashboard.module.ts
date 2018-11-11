
import { TranslateModule } from '../shared/translate/translate.module';
import { SharedModule } from '../shared/shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES , DIALOG_COMPONENTS } from './dashboard.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TreeviewModule } from 'ngx-treeview';
import { TreeModule } from 'angular-tree-component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import {TooltipModule} from "ngx-tooltip";
import {CountdownTimerModule} from "ngx-countdown-timer";
import {AccordionModule} from "ngx-accordion";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        RouterModule.forChild(MODULE_ROUTES),
        TranslateModule,
        FormsModule,
        HttpModule,
        CommonModule,
		SharedModule,
        TreeModule,
        TreeviewModule.forRoot(),
        ReactiveFormsModule,
        AngularDateTimePickerModule,
        TooltipModule,
      CountdownTimerModule.forRoot(),
      AccordionModule
    ],
    declarations: [MODULE_COMPONENTS,DIALOG_COMPONENTS],
	exports : [ SharedModule , MODULE_COMPONENTS],
	entryComponents: [DIALOG_COMPONENTS],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})



export class DashboardModule { }



