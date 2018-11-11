import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {AgGridTableCustomComponent} from "../shared/ag-grid/table/table.component";
import {ActionRendererComponent} from "../shared/render-component/action-renderer.component";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'reports-cmp',
    moduleId: module.id,
    templateUrl: 'reports.component.html'
})

export class ReportsComponent implements OnInit {
  time = {hour: 13, minute: 30};
  @ViewChild(AgGridTableCustomComponent)
  private tableComponent: AgGridTableCustomComponent;

  @Input()agPaginationAuto:boolean = false;
  private name:string;
  private generalReportForm:FormGroup;
    ngOnInit() {
      this.generalReportForm=this._fb.group({
        name:this.name
      })
      let columnDefs = [
        {
          headerName: "Employee",
          field: "name",
          width: 120
        },
        {
          headerName: "Employee ID",
          field: "empId",
          width: 120
        },
        {
          headerName: "Department",
          field: "department",
          width: 120
        },
        {
          headerName: "Event",
          field: "event",
          width: 80
        },
        {
          headerName: "Modified Entity",
          field: "modifiedEvent",
          width: 100
        },
        {
          headerName: "Action",
          cellRendererFramework: ViewActionRendererComponent,
          width: 80
        },

      ];


      let data = [
        {"time":"12","name":"James","event":"","modifiedEvent":"","department":"Porters Unit","empId":"BIH-0060E","status":"1"},
        {"time":"10","name":"Johnathan","event":"","modifiedEvent":"","department":"Porters Unit","empId":"BIH-0061E","status":"1"}
        ,{"time":"9","name":"Abraham","event":"","modifiedEvent":"","department":"Porters Unit","empId":"BIH-0062E","status":"1"},
        {"time":"5","name":"Ethan","event":"","modifiedEvent":"","department":"Porters Unit","empId":"BIH-0063E","status":"1"},
        {"time":"5","name":"Cortez","event":"","modifiedEvent":"","department":"Porters Unit","empId":"BIH-0063E","status":"1"},
        {"time":"5","name":"Eldridge","event":"","modifiedEvent":"","department":"Porters Unit","empId":"BIH-0063E","status":"1"},
        {"time":"12","name":"Bert","event":"","modifiedEvent":"","department":"Porters Unit","empId":"BIH-0064E","status":"1"},
        {"time":"10","name":"Augustus","event":"","modifiedEvent":"","department":"Interpreters","empId":"BIH-0065E","status":"2"}
        ,{"time":"10","name":"Andrew","event":"","modifiedEvent":"","department":"Interpreters","empId":"BIH-0066E","status":"3"},
        {"time":"15","name":"Timothy","event":"","modifiedEvent":"","department":"Interpreters","empId":"BIH-0067E","status":"2"},
        {"time":"12","name":"Milton","event":"","modifiedEvent":"","department":"Porters Unit","empId":"BIH-0068E","status":"4"},
        {"time":"10","name":"Buford","event":"","modifiedEvent":"","department":"Porters Unit","empId":"BIH-0069E","status":"1"}
        ,{"time":"10","name":"Elliott","event":"","modifiedEvent":"","department":"Interpreters","empId":"BIH-0070E","status":"2"},
        {"time":"12","name":"Luther","event":"","modifiedEvent":"","department":"Porters Unit","empId":"BIH-0071E","status":"1"},
        {"time":"10","name":"Larry","event":"","modifiedEvent":"","department":"Porters Unit","empId":"BIH-0072E","status":"1"}
        ,{"time":"10","name":"Mose","event":"","modifiedEvent":"","department":"Interpreters","empId":"BIH-0073E","status":"3"},
        {"time":"12","name":"Jewel","event":"","modifiedEvent":"","department":"Interpreters","empId":"BIH-0074E","status":"2"},
        {"time":"10","name":"Kennith","event":"","modifiedEvent":"","department":"Porters Unit","empId":"BIH-0075E","status":"1"}
        ,{"time":"10","name":"Amos","event":"","modifiedEvent":"","department":"Interpreters","empId":"BIH-0076E","status":"3"}

      ];

      this.tableComponent.agPaginationAuto = this.agPaginationAuto;
      this.tableComponent.setColumnDef(columnDefs);
      this.tableComponent.agHeader=false;
      this.tableComponent.setData(data);
    }

    constructor(private _fb: FormBuilder){}
    tabChangeFunction(tabDiv){
      let elementArr= document.getElementsByClassName("content-div");
      for (var i=0;i<elementArr.length;i++){
        let contentDiv= elementArr[i];
        if(contentDiv.id==tabDiv.currentTarget.id+"Div"){
          document.getElementById(contentDiv.id).classList.remove("hide");
        }
        else{
          document.getElementById(contentDiv.id).classList.add("hide");;
        }
      }
    }
}
@Component({
  selector: 'full-width-cell',
  template: `<td class="text-right table-action">
               <a [href]="action?'#/'+ action.url : ''"><i class="material-icons">dvr</i><div class="ripple-container"></div></a>
               
               </td>`
})
export class ViewActionRendererComponent implements ICellRendererAngularComp {
  private params: any;
  public action: any;

  agInit(params: any): void {
    this.params = params;
    this.action = params.data.action;
  }
}
