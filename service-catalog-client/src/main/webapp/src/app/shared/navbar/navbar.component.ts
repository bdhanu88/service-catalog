import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebar-routes.config';
import { SETTING_ROUTS } from '../../setting/setting-routes.config';
import { TranslateService } from '../translate';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { LANGUAGE_ROUTS } from './language-routes.config';
import { AuthenticationService} from '../../login/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    private settingMenuItems: any[];
    private languageMenuItems: any[];
    private location: Location;
    constructor(location: Location , private _translate: TranslateService , private authService : AuthenticationService) {
        this.location = location;
    }
    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        this.settingMenuItems = SETTING_ROUTS.filter(settingMenuItem => settingMenuItem);
        this.languageMenuItems = LANGUAGE_ROUTS.filter(languageMenuItem => languageMenuItem);
        // set current langage
        this.selectLang('en');

        //componentHandler.upgradeAllRegistered();
    }
    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice( 2 );
        }
        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this._translate.instant(this.listTitles[item].title);
            }


        }

        for (let item = 0; item < this.settingMenuItems.length; item++) {
            if (this.settingMenuItems[item].path === titlee) {
                return this._translate.instant(this.settingMenuItems[item].title);
            }
        }

        return this._translate.instant('dashboard');
    }

    isCurrentLang(lang: string) {
        // check if the selected lang is current lang
        return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
        // set current lang;
        this._translate.use(lang);
    }

    logout() {
        if (this.authService.isLoggedIn()) {
            this.authService.logout();
        }
    }


}
