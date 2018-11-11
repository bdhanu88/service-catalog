import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import {GeneralSettingService} from "./generalSetting.service";
import {AccessControlService} from "./accessControl/accessControl.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EMPLOEE_ATTRIBUTES, JOB_QUEUE, SYSTEM_CONFIGURATION} from "./generalSettings-routes.config";
import {CustomValidationService} from "../../shared/common/validation/custom-validation.service";

declare var $: any;

@Component({
    selector: 'generalsetting-cmp',
    moduleId: module.id,
    templateUrl: 'generalsetting.component.html',
    providers: [GeneralSettingService]
})

export class GeneralSettingComponent implements OnInit {
  public companyForm: FormGroup;
  private id:number;
  private roleName:string;
  private address:string;
  private country:string;
  private phoneNo:string;
  private timeZone:number;
  private timeFormat:number;
  private operationalHours:number;
  private licenseNo:number;
  private validdate:Date;
  private timeZones:[any];
  private weekDays:[any];
  private weekStartDay:any;
  private employeeAttributes:any[];
  private jobQueueAttributes:any[];
  private systemConfiguration:any[];


  constructor(private generalsettingsService:GeneralSettingService,private _fb: FormBuilder,private customValidationService :CustomValidationService){

  }
  ngOnInit(){
    this.companyForm = this._fb.group({
      id: [this.id],
      name: [this.roleName],
      address: [this.address],
      country:[this.country],
      phoneNo:[this.phoneNo],
      timeZone:[this.timeZone],
      timeFormat:[this.timeFormat],
      operationalHours:[this.operationalHours],
      licenseNo:[this.licenseNo],
      validDate:[this.validdate],
      weekStartDay:[this.weekStartDay]

      // orderId:[this.orderId]
    });
    this.employeeAttributes=EMPLOEE_ATTRIBUTES.filter(this.customValidationService.filterCheck);
    this.jobQueueAttributes=JOB_QUEUE.filter(this.customValidationService.filterCheck);
    this.systemConfiguration=SYSTEM_CONFIGURATION.filter(this.customValidationService.filterCheck)
    this.getAllTimeZones();
    var id=1;
    this.getCompanyDetails(id);
  }
  saveCompany(company:Company):void{
    this.generalsettingsService.addcompany(company).subscribe(
      data=>{}
    );
  }
  getCompanyDetails(id:number){
    this.generalsettingsService.getCompany(id).subscribe(
      data=>{
        if(data.companyObj != null){
          this.setCompanyDetails(data.companyObj);
        }
        else {
          this.companyForm = this._fb.group({
            id: [0],
          });
        }
      }
    )
  }



  setCompanyDetails(company:Company){

    if (company.id>0){
      this.id=company.id;
      this.roleName=company.name;
      this.address=company.address;
      this.country=company.country;
      this.phoneNo=company.phoneNo;
      this.timeZone=company.timeZone;
      this.timeFormat=company.timeFormat;
      this.operationalHours=company.operationalHours;
      this.licenseNo=company.licenseNo;
      this.validdate=company.validDate;
      this.weekStartDay=company.weekStartDay;
      this.companyForm = this._fb.group({
        id: [this.id],
        name: [this.roleName],
        address: [this.address],
        country:[this.country],
        phoneNo:[this.phoneNo],
        timeZone:[this.timeZone],
        timeFormat:[this.timeFormat],
        operationalHours:[this.operationalHours],
        licenseNo:[this.licenseNo],
        validDate:[this.validdate],
        weekStartDay:[this.weekStartDay]
        // orderId:[this.orderId]
      });
    }
  }
  getAllTimeZones(){
    this.generalsettingsService.getTimeZones().subscribe(
      data=>{
        this.timeZones=data.zoneList;
        this.weekDays=data.weekdays;
      }
    )  }

}

export interface Company{
  id:number,
  name:string,
  address:string,
  country:string,
  phoneNo:string,
  timeZone:number,
  timeFormat:number,
  operationalHours:number,
  licenseNo:number,
  validDate:Date,
  weekStartDay:any
}


