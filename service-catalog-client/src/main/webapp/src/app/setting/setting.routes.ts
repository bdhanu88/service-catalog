import { Route } from '@angular/router';
import { CanActivateAuthGuard } from '../can-activate.authguard';
import { GeneralSettingComponent } from './generalSetting/generalsetting.component';
import { CategoryComponent } from './generalSetting/category-grades/category-grade.component';
import { UnitHierarchy } from './generalSetting/hierarchy/unit/unit-hierarchy.component';
import { LocationHierarchy } from './generalSetting/hierarchy/location/location-hierarchy.component';
import {JobTypeComponent} from '../job/jobType/jobType.component'
import { JobStatusConfig } from './generalSetting/job-status-config/job-status-config.comoponent';
import {EmployeeTypesComponent} from "../employees/employee-type/employee-type.component";
import {CustomerProfiles} from "../customer/customer-profiles.component";
import {CustomerProfile} from "../customer/customer-profile.component";



export const GENERAL_SETTING_MODULE_ROUTES: Route[] = [
    { path: 'generalsetting', component: GeneralSettingComponent , canActivate: [CanActivateAuthGuard]},
    { path: 'jobTypes', component: JobTypeComponent , canActivate: [CanActivateAuthGuard]},
    { path: 'employeeList', component: GeneralSettingComponent , canActivate: [CanActivateAuthGuard]},
    { path: 'customer', component: CustomerProfiles , canActivate: [CanActivateAuthGuard]},
    { path: 'location', component: GeneralSettingComponent , canActivate: [CanActivateAuthGuard]},
    { path: 'contact',  component: GeneralSettingComponent , canActivate: [CanActivateAuthGuard]},
    { path: 'categoryAndGrades',  component: CategoryComponent},
    { path: 'unitHierarchy',  component: UnitHierarchy, canActivate: [CanActivateAuthGuard]},
    { path: 'locationHierarchy',  component: LocationHierarchy, canActivate: [CanActivateAuthGuard]},
  { path: 'jobStatusConfig',  component: JobStatusConfig},
  { path: 'customerprofile',  component: CustomerProfile}

    ];

export const GENERAL_SETTING_MODULE_COMPONENTS = [
    GeneralSettingComponent,
    UnitHierarchy,
    LocationHierarchy,
    JobTypeComponent,
    EmployeeTypesComponent,
    CustomerProfiles,
    CustomerProfile
];
