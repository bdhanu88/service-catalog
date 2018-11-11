import {Component, OnInit} from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import {CustomValidationService} from "./shared/common/validation/custom-validation.service";

declare var $: any;

@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  location: Location;
  constructor(location: Location) {
    this.location = location;
  }
  ngOnInit() {
  }
  public isMaps(path) {
    let titlee = this.location.prepareExternalUrl(this.location.path());

   let splitedTitle = titlee.split('/', 2);
    if (path === splitedTitle[1]) {
      return false;
    } else {
      return true;
    }
  }
}
