import {Component} from "@angular/core";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpCustomService} from "../../shared/common/http/common-http.service";
import {MdDialogRef} from "@angular/material";
import {CustomValidationService} from "../../shared/common/validation/custom-validation.service";
/**
 * Created by CSI on 8/11/2017.
 */
@Component({
  selector:"emp-type-dialog",
  moduleId:module.id,
  templateUrl:"emp-type.dialog.html"
})

export class EmpTypeDialog{
  private empTypeForm:FormGroup;
  private id;
  private name;
  private abbreviation;
  private title;
  private actionButton: string;
  private isEdit=false;

  constructor(public dialogRef: MdDialogRef<EmpTypeDialog>, private httpCustomService: HttpCustomService
    , private _fb: FormBuilder,private customValidationService:CustomValidationService){

  }
  ngOnInit(){
    this.empTypeForm=this._fb.group({
      id:this.id,
      name:[this.name,[<any>Validators.required],this.checkExists.bind(this,"employee/checkemptypename",this.name,this.isEdit)],
      abbreviation:this.abbreviation

    });

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
      this.id = object.id;
      this.name = object.name;
      this.abbreviation=object.abbreviation;
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
