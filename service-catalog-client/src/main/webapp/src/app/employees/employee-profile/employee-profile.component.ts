import {Component, OnInit, ViewChild, Input} from "@angular/core";
import {AgGridTableCustomComponent} from "../../shared/ag-grid/table/table.component";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpCustomService} from "../../shared/common/http/common-http.service";
import {HttpType} from "../../shared/common/http/http-request.metadata";
import {EmployeeProfileService} from "./emp-profile.service";
import {isUndefined} from "util";
import {SkillTreeDialog} from "./emp-skills.dialog.component";
import {MdDialog} from "@angular/material";
import {TreeNode} from "angular-tree-component";
import {CustomValidationService} from "../../shared/common/validation/custom-validation.service";
import {Router, ActivatedRoute} from "@angular/router";
import {NotificationsService, PushNotificationsService} from "angular2-notifications/dist";
import {CommonNotificationService} from "../../shared/Dialog/common-notification.service";

declare var $: any;

@Component({
  selector: 'employee-profile-cmp',
  moduleId: module.id,
  templateUrl: 'employee-profile.component.html'
})

export class EmployeeProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute,private httpCustomService: HttpCustomService, private _fb: FormBuilder,private empProfileService:EmployeeProfileService,
              private dialog:MdDialog,public customValidationService:CustomValidationService,private router: Router,
              private notificationService:CommonNotificationService) {
    this.httpCustomService.commonHttpRequest("getGrades", "category/getgrades", null, this.generateGradeDropDown.bind(this), null, HttpType.GET);
    this.httpCustomService.commonHttpRequest("getValues", "employee/getdetails", null, this.generateDropDowns.bind(this), null, HttpType.GET);
    this.id=route.snapshot.queryParams['id'];
    this.setEmployeeDetails(this.id);
  }

  @ViewChild(AgGridTableCustomComponent)

  private empProfileForm: FormGroup;
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
  private employeeType: any;
  private joinedDate: any;
  private contractEndDate: Date;
  private unit: any;
  private grade: any;
  private unitAccess=[];
  private role:any;
  private skills:any;
  private username:string;
  private password:string;
  private unitList=[];
  private gradeList=[];
  private genderLst=[];
  private statusList=[];
  private empTypes=[];
  private roleList=[];
  private retList=[];
  private skillList=[];
  private systemAccessTypes=[];
  private selectedUnitList=[];
  private skillGroups: any[] = [];
  private isEdit=false;
  private systemAccess=[];
  private nodes = [{
    name: '',
    children: [],
    icon:"done"
  }];
  private fullTree= [{
    name: '',
    children: [],
    icon:"done"
  }];
  treeoptions = {
    nodeClass: (node: TreeNode) => {
      if (node.data.icon) {
        return 'tree-' + node.data.icon;
      }
      return 'tree-node-folder';
    },
    allowDrag: (node) => node.isLeaf,
    allowDrop: (element, {parent, index}) => index>0,
  };

  @Input() profileId:number;


  ngOnInit(): void {
    this.empProfileForm = this._fb.group({
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
      employeeType: this.employeeType,
      joinedDate: this.joinedDate,
      contractEndDate: this.contractEndDate,
      unit: this.unit,
      grade: this.grade,
      unitAccess: this.unitAccess,
      role:this.role,
      username:[this.username,[<any>Validators.required],this.checkExists.bind(this,"employee/checkusername",this.username,this.isEdit)],
      password:this.password,
      systemAccess:this.systemAccess
    });




  }

  generateGradeDropDown(result){
    this.gradeList=result;
  }
  generateDropDowns(result){
    this.genderLst=result.genders;
    this.statusList=result.maritalStatus;
    this.empTypes=result.empTypes;
    this.unitList= result.unitList;
    var roleObject=result.roleList;
    this.systemAccessTypes=result.sysAccess;
    this.retList.push(roleObject)
    this.hasChildren(roleObject);
  }
  setEmployeeDetails(profileId:number){
    if( !isUndefined(profileId) && profileId != null){
      var data={id:profileId};
      this.httpCustomService.commonHttpRequest("getempprofiledetail", "employee/getempprofiledetail", data, this.fillData.bind(this), null, HttpType.GET);
    }
    else{
      this.fillData(null);
    }
  }
  fillData(result){
    if(result == null){
      this.isEdit=false;
      this.skillList=[];
      this.empProfileForm = this._fb.group({
        id:0,
        name: "",
        employeeId: ["",[<any>Validators.required],this.checkExists.bind(this,"employee/checkempid",this.empid,this.isEdit)],
        address: "",
        nationality: "",
        email: "",
        phoneNo: "",
        mobileNo: "",
        gender: "",
        maritalStatus: "",
        dob: "",
        employeeType: "",
        joinedDate: "",
        contractEndDate: "",
        unit: "",
        grade: "",
        unitAccess:"",
        role:"",
        username:["",[<any>Validators.required],this.checkExists.bind(this,"employee/checkusername",this.username,this.isEdit)],
        password:"",

      });
    }
    else{
      this.isEdit=true;
      let obj=result.profile;
      this.skillList=obj.skills;

      this.empProfileForm = this._fb.group({
        id:obj.id,
        name: obj.name,
        employeeId: [obj.employeeId,[<any>Validators.required],this.checkExists.bind(this,"employee/checkempid",obj.employeeId,this.isEdit)],
        address: obj.address,
        nationality: obj.nationality,
        email: obj.email,
        phoneNo: obj.phoneNo,
        mobileNo: obj.mobileNo,
        gender: obj.gender,
        maritalStatus: obj.maritalStatus,
        dob: obj.dob,
        employeeType: obj.employeeType.id,
        joinedDate: obj.joinedDate,
        contractEndDate: obj.contractEndDate,
        unit: obj.unit.id,
        grade: obj.grade.id,
        unitAccess:[obj.unitAccess,""],
        role:obj.role.id,
        systemAccess:[obj.systemAccess,""]
      });

    }
    this.httpCustomService.commonHttpRequest("getAllSkillTree" , "skill/getTree" , null  , this.generateSkillTree.bind(this, true));
    this.empProfileService.setProfileId(null);

  }
  saveEmpProfile(entity){
    entity.role={id:entity.role};
    entity["skills"]=this.skillList;
    entity.unit={id:entity.unit};
    entity.grade={id:entity.grade};
    entity.employeeType={id:entity.employeeType};
    this.httpCustomService.commonHttpRequest("addEmpProfile","employee/addempprofile",entity,this.addEmpProfileSuccess.bind(this),null,HttpType.POST);
    entity=null;
  }
  addEmpProfileSuccess(){
    this.notificationService.createSuccessNotification('Employee Profile','Employee Added Successfully');
    this.router.navigate(['/employeeProfiles'])
  }

  hasChildren(role:any):any{

    let returnVal=true;
    var childRoleList=role.childrenRoles;
    if(childRoleList.length>0){
      this.retList=this.retList.concat(childRoleList);
      for(let roleObj of childRoleList){
        this.hasChildren(roleObj);
      }
    }
    return this.retList;
  }

  openSkillDialog(){

    let dialogRef= this.dialog.open(SkillTreeDialog);
    dialogRef.disableClose;
    dialogRef.componentInstance.selectedSkills=this.skillList;
    dialogRef.componentInstance.nodes=this.fullTree;
    dialogRef.componentInstance.skillGroups=this.skillGroups;
    dialogRef.componentInstance.treenodes=this.nodes;
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.skillList=this.empProfileService.getSkills();
        this.nodes=this.empProfileService.getSkillNodeArray();
      }
      else{
        this.empProfileService.setSkillNodeArray(this.nodes);
        this.empProfileService.setSkills(this.skillList);
      }
    });
  }
  private generateSkillTree(isSetSelectedId:boolean,data:any) : void{

    let skillGroups = data.skillGroups;
    this.skillGroups = skillGroups;
    this.fullTree = data.tree;

    let selected= this.skillList;
    let treeNodes=[{
      name: 'Selected Skills',
      children: [],
      icon:"done"
    }];
    if(selected.length>0){
      for(let skill of selected){
        for(let skillGroup of skillGroups){
          let index = skillGroup.skills.findIndex(x => x.id==skill.id);
          if(index>-1){
            let node={name:skillGroup.name,children:[skill],icon:""};
            let pos = treeNodes.findIndex(x => x.name == skillGroup.name);
            if(pos>-1){
              let childArray=treeNodes[pos].children;
              childArray.push(skill);
            }
            else {
              treeNodes.push(node);
            }
            skillGroup.skills[index].selected=true;
          }
        }
      }
    }
    this.nodes=treeNodes;
    // this.nodes.shift();


  }
  moveNode(result){
    var nodes= result.treeModel.nodes;
    this.skillList=[];
    for (let node of nodes){
      this.skillList=this.skillList.concat(node.children);
    }
  }
  treeclickEvent(event) {

  }
  treeExpanded(event){

  }
  checkExists(requestPath:string ,prvValue:string , isEdit:boolean, control: FormControl):{[key: string]: any}{
    let value = control.value;
    let data={};
    data["value"]=value;
    return this.customValidationService.isExistValidator(data, requestPath, prvValue ,isEdit, control);

  }


}

