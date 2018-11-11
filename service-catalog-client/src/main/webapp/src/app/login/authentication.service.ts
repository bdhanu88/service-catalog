import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {isUndefined} from "util";

@Injectable()
export class AuthenticationService {
  private authUrl = 'auth';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
  });

  constructor(private http: Http) {
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(this.authUrl, JSON.stringify({
      username: username,
      password: password
    }), {headers: this.headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          var permissionList=[];
          permissionList = response.json().permissions;
          localStorage.setItem("permissionList", JSON.stringify(permissionList))
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: response.json().token.token}));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;

        }
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return token ? token : "";
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.setItem("token", "");
  }

  isLoggedIn(): boolean {
    var token: String = this.getToken();
    return token && token.length > 0;
  }

  hasAccess(id: number): boolean {
    var data = {};
    var retVal = true;
    if (!isUndefined(id)) {

      this.http.get('accessLevel/checkPermission?id=' + id, {headers: this.headers}).subscribe(response => {
        data = response.json();
      });

      retVal = data["success"];
    }

    return retVal;
  }

  checkPermission(id: number) {
    if (isUndefined(id)) {
      id = 0;
    }
    return this.http.get('accessLevel/checkPermission?id=' + id, {headers: this.headers}).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json();
    });
  }

  getPermissions(): string {
    var permissionList: [any];

     this.http.get("accessLevel/getpermissionforloggeduser", {headers: this.headers}).subscribe(data => {
       permissionList= data.json();
    });
    return JSON.stringify(permissionList);


  }
}
