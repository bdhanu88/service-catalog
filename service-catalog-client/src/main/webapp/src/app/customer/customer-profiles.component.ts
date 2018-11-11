/**
 * Created by sachithra on 8/28/2017.
 */
import {Component, ViewChild, Input} from "@angular/core";
import {NameRendererComponent} from "../shared/render-component/name-renderer.component";
import {AgGridTableCustomComponent} from "../shared/ag-grid/table/table.component";
import {HttpCustomService} from "../shared/common/http/common-http.service";
import {HttpType} from "../shared/common/http/http-request.metadata";
import {EmployeeProfileActionRendererComponent} from "../employees/employee-profiles/employee-action.component";
import {ConfirmationDialog} from "../shared/Dialog/confirmation-dialog";
import {MdDialog} from "@angular/material";
import {CustomValidationService} from "../shared/common/validation/custom-validation.service";
@Component({
  selector: "customer-profiles",
  templateUrl: "customer-profiles.component.html"
})

export class CustomerProfiles {
  @ViewChild(AgGridTableCustomComponent)
  private tableComponent: AgGridTableCustomComponent;
  @Input() agPaginationAuto: boolean = false;

  constructor(private httpCustomService:HttpCustomService,private dialog:MdDialog
    ,private customValidation:CustomValidationService) {

  }

  ngOnInit() {
    this.httpCustomService.commonHttpRequest("getAllCustomers","employee/getallcustomers",null,this.createTable.bind(this),null,HttpType.GET)
    let columnDefs = [
      {
        headerName: "Employee",
        field: "name",
        cellRendererFramework: NameRendererComponent,
        width: 120
      },
      {
        headerName: "Address",
        field: "address",
        width: 100
      },
      {
        headerName: "Nationality",
        field: "nationality",
        width: 100
      },
      {
        headerName: "Mobile",
        field: "mobile",
        width: 100
      },
      {
        headerName: "Action",
        width: 40,
        cellRendererFramework:EmployeeProfileActionRendererComponent
      },

    ];


    let data = [];

    this.tableComponent.agPaginationAuto = this.agPaginationAuto;
    this.tableComponent.setColumnDef(columnDefs);
    this.tableComponent.setGridOptionContext({parentComponent: this});
    this.tableComponent.setData(data);
  }
  createTable(result){
    let data=[];
    var profileList=result.profileList;
    for (let obj of profileList){
      var profile= {name: obj.name,id:obj.id, address:obj.address, mobile : obj.mobileNo ,nationality:obj.nationality, action : { url : "customerprofile?id="+obj.id }};
      data.push(profile);
    }
    this.tableComponent.updateData(data);
  }
  deactivateEmployee(profileId:number){
    let dialogRef = this.dialog.open(ConfirmationDialog);
    dialogRef.disableClose = true;
    dialogRef.componentInstance.title ="Remove Customer";
    dialogRef.componentInstance.message = "Are you sure you want to remove this Customer?";
    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        let param={};
        param["id"]=profileId;
        param["isCustomer"]=true;
        this.httpCustomService.commonHttpRequest("removeEmployee_"+profileId,"employee/deactivateEmployee",param,this.createTable.bind(this),null,HttpType.GET);
      }
    })
  }

}

