import {Http, Headers} from "@angular/http";
import {AuthenticationService} from "../../login/authentication.service";
import {Injectable} from "@angular/core";
/**
 * Created by CSI on 7/31/2017.
 */
@Injectable()
export class JobTypeService{
  constructor(private http: Http, private authService: AuthenticationService ){

  }
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authService.getToken()
  })
}
