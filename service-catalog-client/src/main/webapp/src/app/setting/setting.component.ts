import {Component} from "@angular/core";
import {SETTING_ROUTS} from "./setting-routes.config";
import {CustomValidationService} from "../shared/common/validation/custom-validation.service";

@Component({
    selector: 'setting-cmp',
    moduleId: module.id,
    templateUrl: 'setting.component.html'
})

export class SettingComponent{
  constructor(private customeValidation:CustomValidationService){}
  private settingsMenuItems;

  ngOnInit(){
    this.customeValidation.check(SETTING_ROUTS);
  };
}
