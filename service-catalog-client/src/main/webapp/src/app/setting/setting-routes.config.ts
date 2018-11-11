import {  RouteInfo } from './setting.metadata';

export const SETTING_ROUTS: RouteInfo[] = [
    { path: 'generalsetting', title: 'General Setting', class: '', permission:'GENERAL_SETTINGS_VIEW' },
    { path: 'jobTypes', title: 'Job Types',  class: '', permission:'JOB_TYPE_VIEW' },
    { path: 'customer', title: 'Cutomer Profile',  class: '' , permission:'CUSTOMER_PROFILE_VIEW'},
    { path: 'location', title: 'Location Setting',  class: '', permission:'LOCATION_SETTINGS_VIEW' },
    { path: 'contact', title: 'Contact Support',  class: '', permission:'CONTACT_SUPPORT' }
];
