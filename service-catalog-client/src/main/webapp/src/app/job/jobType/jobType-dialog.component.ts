/**
 * Created by CSI on 8/1/2017.
 */

import {Component, OnInit} from "@angular/core";
import {JobTypeService} from "./jobType.service";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {HttpCustomService} from "../../shared/common/http/common-http.service";
import {HttpType} from "../../shared/common/http/http-request.metadata";
import {MdDialogRef} from "@angular/material";
import {CustomValidationService} from "../../shared/common/validation/custom-validation.service";
@Component({
  selector: 'jobtype-dialog-cmp',
  templateUrl: 'jobType-dialog.html',
  providers: [JobTypeService]
})

export class JobTypeDialog implements OnInit {
  public jobTypeForm: FormGroup;
  private id;
  private name;
  private optionalSkills= [];
  private requiredSkills= [];
  private title;
  private actionButton: string;
  private categoryList: [any];
  private category;
  private isEdit=false;

  constructor(public dialogRef: MdDialogRef<JobTypeDialog>, private httpCustomService: HttpCustomService
    , private _fb: FormBuilder,private customValidationService :CustomValidationService) {

  }

  private skills: [any];

  ngOnInit() {
    var data = {companyId: 1};
    this.httpCustomService.commonHttpRequest("getSkillGroup", "skill/getskillgroup", data, this.generateSkillDropDowns.bind(this), null, HttpType.GET);
    this.httpCustomService.commonHttpRequest("getCategories", "category/getAllCategories", null, this.generateCategoryDropDown.bind(this), null, HttpType.GET);
    this.jobTypeForm = this._fb.group({
      id: [this.id],
      name: [this.name,[<any>Validators.required],this.checkExists.bind(this,"jobtype/checkjobtypeexists",this.name,this.isEdit)],
      requiredSkills: [this.requiredSkills],
      optionalSkills: [this.optionalSkills],
      category: [this.category]

    });
  }

  private generateSkillDropDowns(result) {
    this.skills = result.skillGroup;
    debugger;
  }

  private generateCategoryDropDown(retval) {
    this.categoryList = retval.categories;
  }

  setTitle(title) {
    this.title = title;
  }

  public setActionButtonString(actionButtionValue: string) {
    this.actionButton = actionButtionValue;
  }

  setDialogDetails(object) {
    if (object != null) {
      this.isEdit=true;
      var reqList = [];
      var optList = [];
      for (let req of object.requiredSkills) {
        reqList.push(req.id);
      }
      for (let opt of object.optionalSkills) {
        optList.push(opt.id);
      }

      this.id = object.id;
      this.name = object.name;
      this.requiredSkills = reqList;
      this.optionalSkills = optList;
      this.category = object.category.id;


    }
    else{
      this.isEdit=false;
      this.id=0;
    }
  }

  checkExists(requestPath:string ,prvValue:string , isEdit:boolean, control: FormControl):{[key: string]: any}{
    let value = control.value;
    let data={};
    data["value"]=value;
    return this.customValidationService.isExistValidator(data, requestPath, prvValue ,isEdit, control);

  }
}
export interface JobType {
  id: number;
  name: string;
  requiredSkills: Skill[];
  optionalSkills: Skill[];
  category: Category;
}
export interface Category {
  id: number;
}
export interface Skill {
  id: number;
}
