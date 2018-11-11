import {EmployeesComponent} from '../employees/employee-status/employees.component';
import {EmployeesWorkTimeLineComponent} from '../employees/work-time-line/work-time-line.component';
import {JobListComponent} from '../job/jobList/joblist.component';
import {NotificationsComponent} from '../notifications/notifications.component';
import {ReportsComponent} from '../reports/reports.component';
import {Route} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {HomeComponent} from './../home/home.component';
import {LoginComponent} from '../login/login.component';
import {CanActivateAuthGuard} from '../can-activate.authguard';
import {CategoryComponent} from './../setting/generalSetting/category-grades/category-grade.component';
import {AccessControlComponent} from "./../setting/generalSetting/accessControl/accessControl.component";
import {BookComponent} from '../book/book.component';
import {BasicTreeComponent} from '../basicTree/basictree.component';
import {JobStatusComponent} from "../job/jobStatus/job-status.component";
import {EmployeeProfilesComponent} from "../employees/employee-profiles/employee-profiles.component";
import {EmployeeProfileComponent} from "../employees/employee-profile/employee-profile.component";
import {SkillComponent} from '../setting/generalSetting/skill/skill.component';
import {UnitComponent} from '../setting/generalSetting/unit/unit-component';
import {LocationComponent} from '../setting/generalSetting/location/location.component';
import {EmployeeStatusConfigComponent} from '../setting/generalSetting/employee-status/employee-status-config.component';
import {ConfirmationDialog} from '../shared/Dialog/confirmation-dialog';
import {GradeDialog} from '../setting/generalSetting/category-grades/category-grade.component';
import {RoleDialog} from '../setting/generalSetting/accessControl/accessControl.component';
import {SkillDialog} from "../setting/generalSetting/skill/skill-dialog.component";
import {EmployeeStatusDialog} from "../setting/generalSetting/employee-status/employee-status.dialog";
import {JobTypeDialog} from "../job/jobType/jobType-dialog.component";
import {EmployeeTypesComponent} from "../employees/employee-type/employee-type.component";
import {EmpTypeDialog} from "../employees/employee-type/emp-type.dialog";
import {SkillTreeDialog} from "../employees/employee-profile/emp-skills.dialog.component";
import {JobComponent} from "../job/jobList/job.component";
import {EmergencyJobComponent} from "../job/jobList/emergencyJob.component";
import {CustomGrid} from "../job/jobList/gridCustom.component";
import {LocationDetailView} from "../setting/generalSetting/location/location-detail-view.component";


export const MODULE_ROUTES: Route[] = [
  {path: 'dashboard', component: HomeComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'joblist', component: JobListComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'employeeStatus', component: EmployeesComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'workTimeLine', component: EmployeesWorkTimeLineComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'reports', component: ReportsComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'notifications', component: NotificationsComponent, canActivate: [CanActivateAuthGuard]},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [CanActivateAuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'basicTree', component: BasicTreeComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'accessControl', component: AccessControlComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'jsTree', component: BookComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'jobStatus', component: JobStatusComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'employeeProfiles', component: EmployeeProfilesComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'employeeProfile', component: EmployeeProfileComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'skill', component: SkillComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'unit', component: UnitComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'employeeStatusConfig', component: EmployeeStatusConfigComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'location', component: LocationComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'emptypeconfig', component: EmployeeTypesComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'addjob', component: JobComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'emergency', component: EmergencyJobComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'locationDetailView', component: LocationDetailView, canActivate: [CanActivateAuthGuard]}
]

export const MODULE_COMPONENTS = [
  HomeComponent,
  ReportsComponent,
  EmployeesComponent,
  JobListComponent,
  NotificationsComponent,
  CategoryComponent,
  AccessControlComponent,
  BookComponent,
  BasicTreeComponent,
  EmployeesWorkTimeLineComponent,
  JobStatusComponent,
  EmployeeProfilesComponent,
  EmployeeProfileComponent,
  SkillComponent,
  UnitComponent,
  LocationComponent,
  EmployeeStatusConfigComponent,
  JobComponent,
  EmergencyJobComponent,
  CustomGrid,
  LocationDetailView
];


export const DIALOG_COMPONENTS = [
  ConfirmationDialog,
  GradeDialog,
  RoleDialog,
  RoleDialog,
  SkillDialog,
  EmployeeStatusDialog,
  JobTypeDialog,
  EmpTypeDialog,
  SkillTreeDialog
];
