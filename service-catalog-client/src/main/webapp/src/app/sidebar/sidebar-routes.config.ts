import {  RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'dashboard',  icon: 'dashboard', class: '' , children : [],permission:"DASHBOARD" },
    { path: 'joblist', title: 'jobList',  icon: 'content_paste', class: '' , children : [],permission:"JOB_LIST_VIEW" },
    { path: 'employee', title: 'employees',  icon: 'person', class: '' , children : [
        { path: 'employeeStatus', title: 'employeeStatus',  icon: 'library_books', class: '' , children : [] ,permission:"EMPLOYEE_STATUS_VIEW"},
        { path: 'employeeProfiles', title: 'employeeProfiles',  icon: 'library_books', class: '' , children : [],permission:"EMPLOYEE_PROFILE_VIEW" },
        { path: 'workTimeLine', title: 'workTimeLine',  icon: 'library_books', class: '' , children : [] ,permission:"EMPLOYEE_WORK_TIMELINE_VIEW"},
        { path: 'productivity', title: 'productivity',  icon: 'library_books', class: '' , children : [],permission:"EMPLOYEE_PRODUCTIVITY" }
     ],permission:"DASHBOARD"},
  { path: 'location', title: 'locations',  icon: 'content_paste', class: '', children : [] ,permission:"NOTIFICATIONS"},
  { path: 'reports', title: 'reports',  icon: 'library_books', class: '' , children : [],permission:"REPORTS" },
  { path: 'notifications', title: 'notifications',  icon: 'notifications_none', class: '', children : [] ,permission:"NOTIFICATIONS"},

    /*{ path: 'testPages', title: 'Units',  icon: 'person', class: '' , children : [
        { path: 'TEST', title: 'TEST',  icon: 'library_books', class: '' , children : [],permission:"" },
        { path: 'unit', title: 'Unit',  icon: 'library_books', class: '' , children : [] ,permission:""},
        { path: 'location', title: 'Location',  icon: 'location_on', class: '' , children : [],permission:"" }
     ],permission:"DASHBOARD"}*/
  { path: 'unit', title: 'Unit',  icon: 'library_books', class: '' , children : [] ,permission:"REPORTS"}
];
