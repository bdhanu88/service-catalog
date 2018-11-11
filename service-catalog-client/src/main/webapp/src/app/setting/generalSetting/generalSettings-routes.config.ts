import {RouteInfo} from "../setting.metadata";
/**
 * Created by sachithra on 9/12/2017.
 */

export const EMPLOEE_ATTRIBUTES: RouteInfo[] = [
  { path: '', title: 'Departments', class: '', permission:'DEPARTMENT_VIEW' },
  { path: 'category', title: 'Categories & Grade',  class: '', permission:'CATEGORY_VIEW' },
  { path: 'skill', title: 'Skills',  class: '' , permission:'SKILL_VIEW'},
  { path: 'employeeStatusConfig', title: 'Status List',  class: '', permission:'EMPLOYEE_STATUS_VIEW' },
  { path: 'emptypeconfig', title: 'Employee Type List',  class: '', permission:'EMPLOYEE_TYPE_VIEW' },
  { path: 'employeeStatus', title: 'Employee Status List',  class: '', permission:'EMPLOYEE_STATUS_VIEW' }
];

export const JOB_QUEUE: RouteInfo[] = [
  { path: '', title: 'Queues', class: '', permission:'DEPARTMENT_VIEW' },
  { path: '', title: 'Job Routing',  class: '', permission:'DEPARTMENT_VIEW' },
  { path: 'jobStatusConfig', title: 'Job Status List',  class: '' , permission:'SKILL_VIEW'},
  { path: '', title: 'Escalations',  class: '', permission:'SKILL_VIEW' }
];

export const SYSTEM_CONFIGURATION: RouteInfo[] = [
  { path: 'accessControl', title: 'Access Control', class: '', permission:'DEPARTMENT_VIEW' },
  { path: '', title: 'Interfaces and Data Uploads',  class: '', permission:'DEPARTMENT_VIEW' },
  { path: 'jobStatusConfig', title: 'Email Setting',  class: '' , permission:'SKILL_VIEW'},
  { path: '', title: 'System Settings',  class: '', permission:'SKILL_VIEW' },
  { path: 'unitHierarchy', title: 'Unit Hierarchy',  class: '', permission:'SKILL_VIEW' },
  { path: 'locationHierarchy', title: 'Location Hierarchy',  class: '', permission:'SKILL_VIEW' }
];
