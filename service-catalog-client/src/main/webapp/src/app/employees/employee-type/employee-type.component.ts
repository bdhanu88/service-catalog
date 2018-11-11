import {MdDialog, MdDialogRef} from "@angular/material";
import {FormBuilder} from "@angular/forms";
import {HttpCustomService} from "../../shared/common/http/common-http.service";
import {AgGridTableCustomComponent} from "../../shared/ag-grid/table/table.component";
import {ViewChild, Input, Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {EmpTypeDialog} from "./emp-type.dialog";
import {HttpType} from "../../shared/common/http/http-request.metadata";
import {CustomValidationService} from "../../shared/common/validation/custom-validation.service";
/**
 * Created by CSI on 8/11/2017.
 */
@Component({
  selector:"emp-type-cmp",
  moduleId: module.id,
  templateUrl: 'employee-type.component.html',
})
export class EmployeeTypesComponent {
  @ViewChild(AgGridTableCustomComponent)
  private empTypeTableComponent: AgGridTableCustomComponent;
  private rowData = [];
  @Input() agPaginationAuto: boolean = false;
  constructor(private dialog:MdDialog,private _fb:FormBuilder,private httpCustomService:HttpCustomService,
              private customValidation:CustomValidationService) {
    this.httpCustomService.commonHttpRequest("getallemptypes", "employee/getallemptypes", null, this.generateEmpTypeTable.bind(this), null, HttpType.GET);

  }

  ngOnInit() {
    let columnDef=[
      {headerName: "Name",
        field: "name",
        width: 100},
      {headerName: "Abbreviation",
        field: "abbreviation",
        width: 100},

      {
        headerName: "Action",
        field: "action",
        cellRendererFramework: EmpTypeCellActionRenderer,
        width: 40
      },
    ]
    this.empTypeTableComponent.agPaginationAuto = this.agPaginationAuto;
    this.empTypeTableComponent.setColumnDef(columnDef);
    this.empTypeTableComponent.setData(this.rowData);
    this.empTypeTableComponent.setGridOptionContext({parentComponent: this});
  }
  openEmpTypeDialog(entity){
    let dialogRef = this.dialog.open(EmpTypeDialog);
    dialogRef.disableClose = true;
    dialogRef.componentInstance.setDialogDetails(entity);
    if(entity==null){
      this.setEmpTypeActionButtonAndHeader(dialogRef,"add");
    }
    else{
      this.setEmpTypeActionButtonAndHeader(dialogRef,"edit");
    }
    dialogRef.afterClosed().subscribe(data => {
      if (data) {

        let empType: EmpType = {
          id: data.id,
          name: data.name,
          abbreviation:data.abbreviation

        }


        this.httpCustomService.commonHttpRequest("addemptype", "employee/addemptype", empType, this.generateEmpTypeTable.bind(this), null, HttpType.POST);
      }
    });
  }
  setEmpTypeActionButtonAndHeader(dialogRef: MdDialogRef<EmpTypeDialog>, type: string): void {
    if (type == "add") {
      dialogRef.componentInstance.setTitle("Add Employee Type");
      dialogRef.componentInstance.setActionButtonString("Add");
    } else if (type=="edit") {
      dialogRef.componentInstance.setTitle("Edit Employee Type");
      dialogRef.componentInstance.setActionButtonString("Edit");
    }
  }
  generateEmpTypeTable(result){
    this.rowData = [];
    let empTypes = result.empTypes;
    for (let item of empTypes) {

      let obj = {
        name: item.name,
        abbreviation:item.abbreviation,
        id: item.id
      }
      this.rowData.push(obj);
    }
    this.empTypeTableComponent.updateData(this.rowData);
  }
}
export interface EmpType{
  id:number;
  name:string;
  abbreviation:string;
}

@Component({
  selector: 'full-width-cell',
  template: `<td class="text-right table-action" *ngIf="customValidation.isPermissionAvailable('EMPLOYEE_TYPE_EDIT')">
               <button type="button" rel="tooltip" title="" class="btn btn-primary btn-simple btn-xs"
				data-original-title="Edit Level" (click)="editEmpType()"><i class="material-icons">dvr</i><div class="ripple-container"></div></button>
               <button type="button" rel="tooltip" title="" class="btn btn-primary btn-simple btn-xs"
				data-original-title="Remove Level" (click)="removeEmpType()"><i class="material-icons">delete</i></button>
               </td>`

})

export class EmpTypeCellActionRenderer implements ICellRendererAngularComp{

  private params: any;
  private empTypeComponent: any;
  private empType:any;
  constructor(private customValidation:CustomValidationService){

  }
  agInit(params: any): void {
    this.params = params;
    this.empType=params.data;
    this.empTypeComponent = params.context.parentComponent;
  }
  editEmpType(){
    this.empTypeComponent.openEmpTypeDialog(this.empType);
  }
  removeEmpType(){}

}
