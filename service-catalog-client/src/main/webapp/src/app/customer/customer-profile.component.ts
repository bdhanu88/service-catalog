/**
 * Created by sachithra on 8/28/2017.
 */
import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {HttpType} from "../shared/common/http/http-request.metadata";
import {HttpCustomService} from "../shared/common/http/common-http.service";
import {CustomValidationService} from "../shared/common/validation/custom-validation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications/dist";
import {CommonNotificationService} from "../shared/Dialog/common-notification.service";
@Component({
  selector:"customer-profile",
  templateUrl:"customer-profile.component.html",
  moduleId:module.id
})
export class CustomerProfile{
  constructor(route: ActivatedRoute,private _fb:FormBuilder,private httpCustomService:HttpCustomService,
              private customValidationService:CustomValidationService,private notificationService:CommonNotificationService,private router: Router){
    this.httpCustomService.commonHttpRequest("getValues", "employee/getdetails", null, this.getValuesuccess.bind(this), null, HttpType.GET);
    this.id = route.snapshot.queryParams['id'];
    let data={};
    data["id"]=this.id;
    if (this.id>0){
      this.isEdit=true;
    }
    this.httpCustomService.commonHttpRequest("getCustomerdetails"+this.id, "employee/getempprofiledetail", data, this.fillData.bind(this), null, HttpType.GET);
  }


  private customerForm: FormGroup;
  private id:number;
  private name: string;
  private empid: string;
  private address: string;
  private nationality: any;
  private email: string;
  private phoneNo: string;
  private mobileNo: string;
  private gender: any;
  private maritalStatus: any;
  private dob: Date;
  private genderLst=[];
  private statusList=[];
  private retList=[];
  private isEdit=false;
  private userName:string;
  private password:string;
  private joinedDate:any;

  ngOnInit(){
    this.customerForm = this._fb.group({
      name: this.name,
      employeeId: [this.empid,[<any>Validators.required],this.checkExists.bind(this,"employee/checkempid",this.empid,this.isEdit)],
      id:this.id,
      address: this.address,
      nationality: this.nationality,
      email: this.email,
      phoneNo: this.phoneNo,
      mobileNo: this.mobileNo,
      gender: this.gender,
      maritalStatus: this.maritalStatus,
      dob: this.dob,
      username:[this.userName,[<any>Validators.required],this.checkExists.bind(this,"employee/checkusername",this.userName,this.isEdit)],
      password:this.password,
      joinedDate:this.joinedDate
    });
  }

  getValuesuccess(result){
    this.genderLst=result.genders;
    this.statusList=result.maritalStatus;
  }
  saveCustomerProfile(entity){
    this.httpCustomService.commonHttpRequest("addcustomer","employee/addcustomer",entity,this.addCustomerSuccess.bind(this),null,HttpType.POST);
    entity=null;
  }
  addCustomerSuccess(){
    this.notificationService.createSuccessNotification("Customer Profile","Customer Added Successfully");
    this.router.navigate(['/customer'])
  }
  checkExists(requestPath:string ,prvValue:string , isEdit:boolean, control: FormControl):{[key: string]: any}{
    let value = control.value;
    let data={};
    data["value"]=value;
    return this.customValidationService.isExistValidator(data, requestPath, prvValue ,isEdit, control);

  }
  fillData(result){
    if(result.profile !=null){
      this.isEdit=true;
      let profile=result.profile;
      this.customerForm = this._fb.group({
        name: profile.name,
        employeeId: profile.employeeId,
        id:profile.id,
        address: profile.address,
        nationality: profile.nationality,
        email: profile.email,
        phoneNo: profile.phoneNo,
        mobileNo: profile.mobileNo,
        gender: profile.gender,
        maritalStatus: profile.maritalStatus,
        dob: profile.dob,
        joinedDate:profile.joinedDate
      });
    }else{
      this.isEdit=false;
    }


  }
}

