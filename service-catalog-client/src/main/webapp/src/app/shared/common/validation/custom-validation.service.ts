import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { HttpCustomService } from "../http/common-http.service";
import {isUndefined} from "util";

var httpRequestId = new Object();

@Injectable()
export class CustomValidationService {

  constructor(public httpCustomService:HttpCustomService) {

  }

    public isExistValidator(data:{}, requestPath:string ,prvValue:string , isEdit:boolean, control: FormControl):{[key: string]: any} {

        let value = control.value;
        if(control.dirty && !(isEdit && prvValue ===  value.trim())){
             return this.formCustomApiIsExitValidator( requestPath , data);
        }else{
            return new Observable(observer => {
                observer.next(null);
                observer.complete();
            });
        }
    }

    public formCustomApiIsExitValidator(requestPath:string, dataParam:{}):{[key: string]: any}{
        return new Observable(observer => {
             this.httpCustomService.commonHttpRequestWithoutCallBacks(requestPath , dataParam).subscribe(
                data => {
                    if(data.success){
                        observer.next({exist:true});
                    }else{
                        observer.next(null);
                    }
                    observer.complete();
                },
            );
        });
    }
  check( array){
    if( localStorage.getItem("permissionList") !="undefined"){
      var permissions=JSON.parse(localStorage.getItem("permissionList"));
      if(permissions != null){
        var i=0;
        for(let route of array){
          // permissions=JSON.parse(permissions);
          let pos=permissions.findIndex(x=>x.permissionName==route.permission);
          if(pos==-1){
            array.splice(i,1);
          }
          i++;
        }
      }
    }
  }
  filterCheck(element, index, array){
    if(localStorage.getItem("permissionList")!="undefined"){
      var permissions=JSON.parse(localStorage.getItem("permissionList"));
      // permissions=JSON.parse(permissions);
      if(permissions != null){
        let pos=permissions.findIndex(x=>x.permissionName==element.permission);
        if(pos>-1){
          return true;
        }
        else {
          return false;
        }
      }
    }
  }
  isPermissionAvailable(permission:string){
    if(localStorage.getItem("permissionList")!="undefined"){
      var permissions=JSON.parse(localStorage.getItem("permissionList"));
      // permissions=JSON.parse(permissions);
      if(permissions != null){
        let pos=permissions.findIndex(x=>x.permissionName==permission);
        if(pos>-1){
          return true;
        }
        else {
          return false;
        }
      }
    }
  }
  checkExists(requestPath:string ,prvValue:string , isEdit:boolean, control: FormControl):{[key: string]: any}{
    let value = control.value;
    let data={};
    data["value"]=value;
    return this.isExistValidator(data, requestPath, prvValue ,isEdit, control);

  }

}
