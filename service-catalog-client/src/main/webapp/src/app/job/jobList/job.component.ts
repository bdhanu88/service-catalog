/**
 * Created by CSI on 2/19/2018.
 */

import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {HttpCustomService} from "../../shared/common/http/common-http.service";
import {HttpType} from "../../shared/common/http/http-request.metadata";
@Component({
  selector: 'addjob-cmp',
  moduleId: module.id,
  templateUrl: 'job.component.html'
})
export class JobComponent implements OnInit {
  private addJobForm: FormGroup;
  private category: string;
  private jobType: string;
  private numOfStaff: number;
  private currLocation: string;
  private currFloor: string;
  private currArea: string;
  private destLocation: string;
  private destFloor: string;
  private destArea: string;
  private isPreSchedule: boolean;
  private id: number;
  // private date: any;
  private remark: string;
  private patientName: string;
  private patientId: string;
  private gender: string;
  private age: number;
  private requestorName: string;
  private requestorContact: string;
  date: Date = new Date();
  private empTypeList:any;
  private jobTypeList:any;
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy h:mm a',
    defaultOpen: false
  }

  constructor(private _fb: FormBuilder, private httpCustomService: HttpCustomService) {
    this.httpCustomService.commonHttpRequest("getCategoryDropDownData", "employee/getallemptypes", null, this.generateCategoryDropDown.bind(this), null, HttpType.GET);
    this.httpCustomService.commonHttpRequest("getJobTypeDropDownData", "jobtype/getalljobtypes", null, this.generateJobTypeDropDown.bind(this), null, HttpType.GET);

  }

  ngOnInit(): void {
    this.addJobForm = this._fb.group({
      id: [this.id],
      category: this.category,
      jobType: this.jobType,
      numOfStaff: this.numOfStaff,
      currLocation: this.currLocation,
      currFloor: this.currFloor,
      currArea: this.currArea,
      destLocation: this.destLocation,
      destFloor: this.destFloor,
      destArea: this.destArea,
      isPreSchedule: this.isPreSchedule,
      date: this.date,
      remark: this.remark,
      patientName: this.patientName,
      patientId: this.patientId,
      gender: this.gender,
      age: this.age,
      requestorName: this.requestorName,
      requestorContact: this.requestorContact,

    });
  }

  generateCategoryDropDown(result) {
    this.empTypeList=result.empTypes;
  }
  generateJobTypeDropDown(result) {
    this.jobTypeList=result.jobTypes;
  }
}
