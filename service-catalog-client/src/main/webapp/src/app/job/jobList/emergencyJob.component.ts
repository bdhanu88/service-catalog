import {Component, ViewChild, Input} from "@angular/core";
import {selector} from "rxjs/operator/publish";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CustomGrid} from "./gridCustom.component";
/**
 * Created by Sachithra on 2/27/2018.
 */
@Component({
  selector:"emergency-Job-cmp",
  moduleId:module.id,
  templateUrl:"emergencyJob.component.html"
})
export class EmergencyJobComponent{

  private emergencyJobForm:FormGroup;
  private type:string;
  private location:string;
  private id:number;
  private comment:string;
  private alertType:string;
  private numOfStaff:number;
  @ViewChild(CustomGrid)
  private customGrid:CustomGrid;
  public list: JobDetail[];


  constructor( private _fb: FormBuilder){
    this.emergencyJobForm = this._fb.group({
      type: this.type,
      id:this.id,
      location: this.location,
      comment: this.comment,
      alertType: this.alertType,
      numOfStaff:this.numOfStaff
    });
  }

  ngOnInit(){
    document.getElementById("customGrid").classList.add("hide");
    this.list =[
      {"time":"12","name":"James","currArea":{"area":"Cafetaria","location":"Main Building"},"destArea":{"area":"Operation Theatre","location":"Main Building"},"isJobAssigned":"false","jobId":"123-4560E","status":"1"},
      {"time":"10","name":"Johnathan","currArea":{"area":"Dispensary","location":"Building A"},"destArea":{"area":"Emergency Room","location":"Clinic A"},"isJobAssigned":"true","jobId":"123-4561E","status":"2"}
      ,{"time":"9","name":"Andrew","currArea":{"area":"Emergency Room","location":"Main Building"},"destArea":{"area":"ICU","location":"Clinic B"},"isJobAssigned":"true","jobId":"123-4562E","status":"3"},
      {"time":"5","name":"Abraham","currArea":{"area":"Cafetaria","location":"Main Building"},"destArea":{"area":"Dispensary","location":"Building A"},"isJobAssigned":"false","jobId":"123-4563E","status":"4"}
      ,{"time":"12","name":"Ethan","currArea":{"area":"Cafetaria","location":"Main Building"},"destArea":{"area":"Ward 10","location":"Clinic A"},"isJobAssigned":"true","jobId":"123-4564E","status":"2"},
      {"time":"10","name":"Cortez","currArea":{"area":"ICU","location":"Building A"},"destArea":{"area":"Ward 11","location":"Clinic B"},"isJobAssigned":"true","jobId":"123-4565E","status":"3"}
      ,{"time":"10","name":"Eldrige","currArea":{"area":"Dispensary","location":"Building A"},"destArea":{"area":"ICU","location":"Building A"},"isJobAssigned":"false","jobId":"123-4566E","status":"1"},
      {"time":"15","name":"Bert","currArea":{"area":"Pharmacy","location":""},"destArea":{"area":"Emergency Room","location":"Main Building"},"isJobAssigned":"true","jobId":"123-4567E","status":"3"}
      ,{"time":"12","name":"Augustus","currArea":{"area":"ICU","location":"Building A"},"destArea":{"area":"Operation Theatre","location":"Main Building"},"isJobAssigned":"true","jobId":"123-4568E","status":"2"},
      {"time":"10","name":"Timothy","currArea":{"area":"Dispensary","location":"Building A"},"destArea":{"area":"Emergency Room","location":"Clinic B"},"isJobAssigned":"false","jobId":"123-4569E","status":"1"}
      ,{"time":"10","name":"Milton","currArea":{"area":"Cafetaria","location":"Main Building"},"destArea":{"area":"Dispensary","location":"Clinic B"},"isJobAssigned":"true","jobId":"123-4570E","status":"3"}
      ,{"time":"12","name":"Buford","currArea":{"area":"Cafetaria","location":"Main Building"},"destArea":{"area":"Ward 12","location":"Main Building"},"isJobAssigned":"false","jobId":"123-4571E","status":"4"},
      {"time":"10","name":"Elliott","currArea":{"area":"Dispensary","location":"Building A"},"destArea":{"area":"Ward 11","location":"Clinic A"},"isJobAssigned":"false","jobId":"123-4572E","status":"1"}
      ,{"time":"10","name":"Luther","currArea":{"area":"Emergency Room","location":"Main Building"},"destArea":{"area":"ICU","location":"Building A"},"isJobAssigned":"true","jobId":"123-4573E","status":"2"}

    ];

    //this.customGrid.setGridList(list);
  }


   changeBtn(){
    let btn= document.getElementsByName("btn");
    let headerDiv= document.getElementById("responseDivHeader");
    let customGrid= document.getElementById("customGrid");
    let element=btn[0];
    let type= element.getAttribute("data-type");
    if(type=="send"){
      element.innerHTML="Stop The Alert";
      headerDiv.innerHTML="Responded Staff";
      element.setAttribute("data-type","cancel");
      document.getElementById("noGrid").classList.add("hide");
      document.getElementById("customGrid").classList.remove("hide");
    }
    else{
      element.innerHTML="Send Alert";
      headerDiv.innerHTML="Staff Responses";
      element.setAttribute("data-type","send");
      document.getElementById("noGrid").classList.remove("hide");
      document.getElementById("customGrid").classList.add("hide");
    }

  }

}

export class JobDetail {
  time:string;
  name:string;
  currArea:Location;
  destArea:Location;
  isJobAssigned:string;
  jobId:string;
  status:string;
}

export class Location {
  area:string;
  location:string;
}
