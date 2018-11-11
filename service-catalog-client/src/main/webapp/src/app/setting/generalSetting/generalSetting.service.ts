/**
 * Created by CSI on 7/17/2017.
 */

import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {AuthenticationService} from "../../login/authentication.service";
import {Company} from "./generalsetting.component";
import {Observable} from "rxjs";
@Injectable()
export class GeneralSettingService{

  constructor(private http: Http, private authService: AuthenticationService) {
  }

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken()
  })

  addcompany(company:Company):Observable<any>{
    debugger;
    return this.http.post('company/addCompany', JSON.stringify(company),{ headers: this.headers }).map((response: Response) => {
      return response.json();
    });
  }
  getCompany(id:number):Observable<any>{
    return this.http.get('company/getcompany?id='+id,{ headers: this.headers }).map((response: Response) => {
      return response.json();
    });
  }

  getTimeZones():Observable<any>{
    return this.http.get('company/getalltimezone',{ headers: this.headers }).map((response: Response) => {
      return response.json();
    });
  }

}
