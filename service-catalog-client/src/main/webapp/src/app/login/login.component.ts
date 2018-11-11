import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateModule} from '../shared/translate/translate.module';
import {AuthenticationService} from './authentication.service';
import {Location} from '@angular/common';
import {Http, Headers} from "@angular/http";
import {SETTING_ROUTS} from "../setting/setting-routes.config";
import {CustomValidationService} from "../shared/common/validation/custom-validation.service";
import {ROUTES} from "../sidebar/sidebar-routes.config";


@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private  http: Http,
              private customeValidation: CustomValidationService) {
  }

  model: any = {};
  loading = false;
  error = '';
  loginImageWidth: number = 300;
  loginImageMarginTop: number = 40;
  happyImageWidth: number = 30;
  happyImageMargin: number = 0;


  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {

    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {

          // login successful
          this.customeValidation.check(SETTING_ROUTS);
          this.router.navigate(['dashboard']);
          // console.log('goda');
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }, error => {
        this.loading = false;
        this.error = 'Invalid Username or Password';
      });

  }


}

