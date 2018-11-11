import { Component , ViewChild , Input } from '@angular/core';
import { NameRendererComponent } from '../../shared/render-component/name-renderer.component';
import { ActionRendererComponent } from '../../shared/render-component/action-renderer.component';
import { AgGridTableCustomComponent } from '../../shared/ag-grid/table/table.component';
import {EmployeeProfileActionRendererComponent} from "./employee-action.component";
import {EmployeeProfileComponent} from "../employee-profile/employee-profile.component";
import {EmployeeProfileService} from "../employee-profile/emp-profile.service";
import {HttpCustomService} from "../../shared/common/http/common-http.service";
import {HttpType} from "../../shared/common/http/http-request.metadata";
import {ConfirmationDialog} from "../../shared/Dialog/confirmation-dialog";
import {MdDialog} from "@angular/material";
import {CustomValidationService} from "../../shared/common/validation/custom-validation.service";

@Component({
    selector: 'employee-profiles-cmp',
    moduleId: module.id,
    templateUrl: 'employee-profiles.component.html'
})

export class EmployeeProfilesComponent {

    @ViewChild(AgGridTableCustomComponent)
    private tableComponent: AgGridTableCustomComponent;
    @Input()agPaginationAuto:boolean = false;

  @ViewChild(EmployeeProfileComponent)
  private empComponent: EmployeeProfileComponent;
  @Input()profileId:number ;

    constructor(private empProfileService:EmployeeProfileService,
                private httpCustomService: HttpCustomService,private dialog:MdDialog,
                private customValidation:CustomValidationService) {
    }

    ngOnInit() {
      this.httpCustomService.commonHttpRequest("getAllEmpProfiles","employee/getallempprofiles",null,this.createTable.bind(this),null,HttpType.GET)

    let columnDefs = [
            {
                headerName: "Employee",
                field: "name",
                cellRendererFramework: NameRendererComponent,
                width: 120
            },
            {
                headerName: "Emp ID",
                field: "empId",
                width: 60
            },
            {
                headerName: "Type",
                field: "type",
                width: 60
            },
            {
                headerName: "Unit",
                field: "unit",
                width: 80
            },

            {
                headerName: "Grade",
                field: "grade",
                width: 80
            },
            {
                headerName: "Role",
                field: "role",
                width: 80
            },
            {
                headerName: "Mobile",
                field: "mobile",
                width: 100
            },
            {
                headerName: "Action",
                cellRendererFramework: EmployeeProfileActionRendererComponent,
                width: 40
            },

        ];


        let data = [
            ];

        this.tableComponent.agPaginationAuto = this.agPaginationAuto;
        this.tableComponent.setColumnDef(columnDefs);
        this.tableComponent.setGridOptionContext({parentComponent: this});
        this.tableComponent.setData(data);
    }
  setEmployeeDetails(profileId:number){
    this.empProfileService.setProfileId(profileId);
    // this.httpCustomService.commonHttpRequest("getempprofiledetail_1", "employee/getempprofiledetail", data, this.fillData.bind(this), null, HttpType.GET);
  }
  createTable(result){
    let data=[];
    var profileList=result.profileList;
    for (let obj of profileList){
      var profile= {name: obj.name,id:obj.id, empId: obj.employeeId , type: obj.employeeType.name , unit: obj.unit.name ,grade: obj.grade.name , role: obj.role.roleName , mobile : obj.mobileNo , action : { url : "employeeProfile?id="+obj.id }};
      data.push(profile);
    }
    this.tableComponent.updateData(data);
  }

  deactivateEmployee(profileId:number){
    let dialogRef = this.dialog.open(ConfirmationDialog);
    dialogRef.disableClose = true;
    dialogRef.componentInstance.title ="Remove Employee";
    dialogRef.componentInstance.message = "Are you sure you want to remove this employee?";
    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        let param={};
        param["id"]=profileId;
        param["isCustomer"]=false;
        this.httpCustomService.commonHttpRequest("removeEmployee_"+profileId,"employee/deactivateEmployee",param,this.deactivesuccess.bind(this),null,HttpType.GET);
      }
    })
  }
  deactivesuccess(result){
    // this.tableComponent();
  }

}
