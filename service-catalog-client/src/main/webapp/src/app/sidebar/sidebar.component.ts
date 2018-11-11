import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { Location } from '@angular/common';
import { TranslateService , TranslatePipe } from '.././shared/translate';
import { AuthenticationService} from '../login/authentication.service';
import {CustomValidationService} from "../shared/common/validation/custom-validation.service";

declare var $: any;
@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

	 constructor (private customValidationService:CustomValidationService) {
    }
    public menuItems: any[];

    ngOnInit() {
        this.menuItems = ROUTES.filter(this.check);
    }
    check(element, index, array){
      if(localStorage.getItem("permissionList")!="undefined"){
        var permissions=JSON.parse(localStorage.getItem("permissionList"));
        // permissions=JSON.parse(permissions);
        if(permissions != null){
          let pos=permissions.findIndex(x=>x.permissionName==element.permission);
          if(pos>-1){
            if(element.children.length>0){
              var i=0;
              for(let route of element.children){
                // permissions=JSON.parse(permissions);
                let position=permissions.findIndex(x=>x.permissionName==route.permission);
                if(position==-1){
                  element.children.splice(i,1);
                }
                i++;
              }
              // this.customValidationService.check(element.children);
            }

              return true;

          }
          else {
            return false;
          }
        }
      }
    }
}
