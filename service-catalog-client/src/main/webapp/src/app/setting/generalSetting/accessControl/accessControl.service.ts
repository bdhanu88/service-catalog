import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../../login/authentication.service';
import { TreeviewItem } from 'ngx-treeview';
import { Role } from './accessControl.component';


@Injectable()
export class AccessControlService {

        constructor(private http: Http, private authService: AuthenticationService) {
        }

        private headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
        })

        private URL: string = "";
        getPermissionForRole(roleId: number, parentId: number): Observable<any> {
                this.URL = 'accessLevel/getPermissionsByRole?roleId=';
                this.URL += roleId;
                this.URL += '&parentId=';
                this.URL += parentId;
                return this.http.get(this.URL, { headers: this.headers })
                        .map((response: Response) => response.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        }

        getAllRolesForLoginUser(): Observable<any> {
                this.URL = 'accessLevel/getAllRolesForLoginUser';
                return this.http.get(this.URL, { headers: this.headers })
                        .map((response: Response) => response.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        }

        savePermissionsForRole(permissions: [number], roleId: number): Observable<any> {
                let options = new RequestOptions({ headers: this.headers });
                return this.http.get('accessLevel/saveRolePermissions?roleId=' + roleId + '&permissions=' + permissions, options).map((response: Response) => {
                        return response.json();
                });
        }

        checkRoleExistence(roleName: string, selectedId: number, isEdit: boolean): Observable<any> {
                if (selectedId == null) {
                        selectedId = 0;
                }
                let options = new RequestOptions({ headers: this.headers });
                return this.http.get('accessLevel/checkRoleNameExist?roleName=' + roleName + '&roleId=' + selectedId + '&isEdit=' + isEdit, options).map((response: Response) => {
                        return response.json();
                });
        }

        addRole(roleForm: Role): Observable<any> {
                debugger;
                return this.http.post('accessLevel/role/add', JSON.stringify(roleForm), { headers: this.headers }).map((response: Response) => {
                        return response.json();
                });
        }

        getAllRoles(): Observable<any[]> {
                this.URL = 'accessLevel/getAllRolesList';
                return this.http.get(this.URL, { headers: this.headers })
                        .map((response: Response) => response.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        }

        getRoleByID(selectedId: number): Observable<any> {
                if (selectedId == null) {
                        selectedId = 0;
                }
                let options = new RequestOptions({ headers: this.headers });
                return this.http.get('accessLevel/getRoleById?roleId=' + selectedId, options).map((response: Response) => {
                        return response.json();
                });
        }


        removeRole(roleId: number, parentId: number) {
                return this.http.delete('accessLevel/deleteRoleById?roleId=' + roleId+'&parentId='+ parentId, { headers: this.headers }).map((response: Response) => {
                        return response.json();
                });
        }

        moveChildRole(roleId: number, parentId: number) {
                return this.http.get('accessLevel/moveChildRole?roleId=' + roleId + '&parentId=' + parentId, { headers: this.headers }).map((response: Response) => {
                        return response.json();
                });
        }

}

