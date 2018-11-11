/**
 * Created by CSI on 7/31/2017.
 */
import {Component, ViewChild, Input} from "@angular/core";
import {JobTypeService} from "./jobType.service";
import {FormBuilder} from "@angular/forms";
import {AgGridTableCustomComponent} from "../../shared/ag-grid/table/table.component";
import {ActionRendererComponent} from "../../shared/render-component/action-renderer.component";
import {HttpCustomService} from "../../shared/common/http/common-http.service";
import {JobTypeDialog, JobType, Skill} from "./jobType-dialog.component";
import {MdDialog, MdDialogRef} from "@angular/material";
import {Action} from "rxjs/scheduler/Action";
import {HttpType} from "../../shared/common/http/http-request.metadata";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {JobTypeActionRendererComponent} from "./jobType-actionRenderer";
import {ConfirmationDialog} from "../../shared/Dialog/confirmation-dialog";
import {CustomValidationService} from "../../shared/common/validation/custom-validation.service";
@Component({
  selector: 'jobtype-cmp',
  moduleId: module.id,
  templateUrl: 'jobType.component.html',
  providers: [JobTypeService]
})

export class JobTypeComponent {
  @ViewChild(AgGridTableCustomComponent)
  private jobTypeTableComponent: AgGridTableCustomComponent;
  private rowData = [];
  @Input() agPaginationAuto: boolean = false;

  constructor(private httpCustomService: HttpCustomService, private _fb: FormBuilder, private dialog: MdDialog
    ,private customValidation:CustomValidationService) {
    this.httpCustomService.commonHttpRequest("getalljobtype", "jobtype/getalljobtypes", null, this.generateJobtypeTable.bind(this), null, HttpType.GET);
  }

  ngOnInit() {
    let columnDefs = [

      {
        headerName: "Name",
        field: "name",
        width: 100
      },
      {
        headerName: "Category",
        field: "category",
        width: 100
      },
      {
        headerName: "Required Skills",
        field: "requiredSkills",
        width: 100
      },
      {
        headerName: "Optional Skills",
        field: "optionalSkills",
        width: 100
      },
      {
        headerName: "Action",
        field: "action",
        cellRendererFramework: JobTypeActionRendererComponent,
        width: 40
      },


    ];


    this.jobTypeTableComponent.agPaginationAuto = this.agPaginationAuto;
    this.jobTypeTableComponent.setColumnDef(columnDefs);
    this.jobTypeTableComponent.setData(this.rowData);
    this.jobTypeTableComponent.setGridOptionContext({parentComponent: this});


  }

  openJobTypeDialog(entity: any) {
    let dialogRef = this.dialog.open(JobTypeDialog);
    dialogRef.disableClose = true;
    dialogRef.componentInstance.setDialogDetails(entity);
    if(entity==null){
      this.setJobTypeActionButtonAndHeader(dialogRef,"add");
    }
    else{
      this.setJobTypeActionButtonAndHeader(dialogRef,"edit");
    }
    dialogRef.afterClosed().subscribe(data => {
      if (data) {

        let jobType: JobType = {
          id: data.id,
          name: data.name,
          requiredSkills: data.requiredSkills,
          optionalSkills: data.optionalSkills,
          category: data.category
        }
        var param = {jobtype: jobType};

        this.httpCustomService.commonHttpRequest("addjobtype", "jobtype/add/jobtype", jobType, this.generateJobtypeTable.bind(this), null, HttpType.POST);
      }
    });
  }

  setJobTypeActionButtonAndHeader(dialogRef: MdDialogRef<JobTypeDialog>, type: string): void {
    if (type == "add") {
      dialogRef.componentInstance.setTitle("Add Job Type");
      dialogRef.componentInstance.setActionButtonString("Add");
    } else if (type=="edit") {
      dialogRef.componentInstance.setTitle("Edit Job Type");
      dialogRef.componentInstance.setActionButtonString("Edit");
    }
  }

  generateJobtypeTable(result) {
    this.rowData = [];
    let jobTypes = result.jobTypes;
    for (let item of jobTypes) {
      var reqList = [];
      var optList = [];
      for (let req of item.requiredSkills) {
        reqList.push(req.name);
      }
      for (let opt of item.optionalSkills) {
        optList.push(opt.name);
      }
      let obj = {
        category: item.category.name,
        name: item.name,
        requiredSkills: reqList,
        optionalSkills: optList,
        action: {url: ""},
        id: item.id
      }
      this.rowData.push(obj);
    }
    this.jobTypeTableComponent.updateData(this.rowData);
  }

  setEntityDetails(entity) {
    var data = {id: entity.id};
    this.httpCustomService.commonHttpRequest("getjobtype:"+entity.id, "jobtype/getjobtypebyid", data, this.openJobTypeDialog.bind(this), null, HttpType.GET);
    // this.openJobTypeDialog(entity);
  }
  removeJobType(id:number){
    let dialogRef = this.dialog.open(ConfirmationDialog);
    dialogRef.disableClose = true;

    dialogRef.componentInstance.title ="Remove Job Type";
    dialogRef.componentInstance.message = "Are you sure you want to remove Jobtype?";
    dialogRef.afterClosed().subscribe(result=>{
      if(result == true){
        let data = { id : id};
        this.httpCustomService.commonHttpRequest("deleteJobType:ID_"+id , "jobtype/removejobtype" , data  , this.generateJobtypeTable.bind(this),null,HttpType.GET);
      }
    });
  }

}








