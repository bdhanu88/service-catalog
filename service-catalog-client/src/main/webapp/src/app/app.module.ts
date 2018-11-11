import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardModule} from "./dashboard/dashboard.module";
import {SidebarModule} from "./sidebar/sidebar.module";
import {FooterModule} from "./shared/footer/footer.module";
import {NavbarModule} from "./shared/navbar/navbar.module";
import {LoginComponent} from "./login/login.component";
import {TRANSLATION_PROVIDERS, TranslateService} from "./shared/translate";
import {AuthenticationService} from "./login/authentication.service";
import {CanActivateAuthGuard} from "./can-activate.authguard";
import {SettingModule} from "./setting/setting.module";
import {CategoryGradeService} from "./setting/generalSetting/category-grades/category-grade.service";
import {DialogResultExampleDialog} from "./setting/generalSetting/category-grades/category-grade.component";
import {HttpCustomService, ReturnType, CustomValidationService} from "./shared/common";
import {EmployeeProfileService} from "./employees/employee-profile/emp-profile.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SimpleNotificationsModule, PushNotificationsModule} from "angular2-notifications";
import {CommonNotificationService} from "./shared/Dialog/common-notification.service";
import {AccordionModule} from "ng2-accordion";


@NgModule({
  imports: [
    BrowserModule,
    DashboardModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    RouterModule.forRoot([]),
    FormsModule,
    HttpModule,
    SettingModule,
    //DataTableModule,
   // SharedModule,
   ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    PushNotificationsModule,
    AccordionModule
  ],
  declarations: [AppComponent, DashboardComponent, LoginComponent, DialogResultExampleDialog],
   entryComponents: [
    DialogResultExampleDialog
  ],
  exports: [],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}  , TRANSLATION_PROVIDERS, TranslateService, AuthenticationService, CanActivateAuthGuard,CategoryGradeService, HttpCustomService , ReturnType , CustomValidationService,EmployeeProfileService,CommonNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
