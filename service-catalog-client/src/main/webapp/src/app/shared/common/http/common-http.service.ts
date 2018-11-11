import { Http, Headers, Response, RequestMethod , URLSearchParams , RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import { AuthenticationService } from '../../../login/authentication.service';
import { HttpType , ReturnType } from './http-request.metadata';

var httpRequestId = new Object();

@Injectable()
export class HttpCustomService {
      
  constructor( private http: Http  , private authService: AuthenticationService , public returnType:ReturnType) {
  }
    
  /*
 * Common Ajax request function.
 * 
 * @param requestId  Http Request ID
 * @param requestPathParam  URL of HTTP request.
 * @param dataParams  Data Set Send through HTTP request.
 * @param successCallBack  Function pointer for the function to be called on HTTP request success
 * @param errorCallBack Function pointer for the function to be called on HTTP request Error
 * @param httpTypeParam Request type Get Or POST
 * @param returnTypeParam  Return type (Ex :- json , html , text);
 * @param isAuthRequriedParam  Authorization required or not;
 * @param additionalDataParam  If the success function needs additional data, passes the additional data to the success function.
 * 
 */
  public commonHttpRequest (requestId:string, requestPathParam:string, dataParams:{} ,successCallBack: any = this.commonSuccessCallBack, errorCallBack : any = this.commonErrorCallBack ,  httpTypeParam:HttpType = HttpType.GET, returnTypeParam :string = this.returnType.APPLICATION_JSON , isAuthRequriedParam:boolean = true){
    if (httpRequestId[requestId]) {
        console.log("There is an active HTTP request for " + requestId  + ". Ignoring current http request");
        return;
    }
    httpRequestId[requestId] = true;
     
    let response = this.commonHttpRequestWithoutCallBacks(requestPathParam, dataParams, httpTypeParam, returnTypeParam, isAuthRequriedParam);  
    response.subscribe(successCallBack , errorCallBack , function() { delete httpRequestId[requestId] });
  }

  public commonHttpRequestWithoutCallBacks(requestPathParam:string, dataParams:{} ,  httpTypeParam:HttpType = HttpType.GET, returnTypeParam :string = this.returnType.APPLICATION_JSON , isAuthRequriedParam:boolean = true) :Observable<any>{
   
    let headers = this.getHeaders(returnTypeParam, isAuthRequriedParam);
      
    let params = new URLSearchParams();
    for (let key in dataParams) {
        params.append(key, dataParams[key]);
    }
      
    let options = new RequestOptions({ headers: headers, params: params , withCredentials: isAuthRequriedParam });
     
    if( httpTypeParam === HttpType.GET){
        return  this.getRequest(requestPathParam, options );
    }else{
        let method = RequestMethod.Post;
        if(httpTypeParam === HttpType.PUT){
            method = RequestMethod.Put;
        } 
        options = new RequestOptions({ method:method, body: dataParams, headers: headers, withCredentials: isAuthRequriedParam });

        return this.postRequest(requestPathParam, options );
    }
  }
    
 /*
 * Prepare HTTP header for HTTP request
 *
 * @param returnTypeParam  Return type (Ex :- json , html , text);
 * @param isAuthRequriedParam  Authorization required or not;
 */ 
   private getHeaders(returnTypeParam :string, isAuthRequriedParam:boolean){
    let headers = new Headers();
    headers.append('Accept' , returnTypeParam);
    headers.append('Content-Type' , returnTypeParam); 
    if(isAuthRequriedParam){
          headers.append('Authorization' , 'Bearer ' + this.authService.getToken());
    }
    
    return headers;
   }
 
 /*
 * Http get request
 */ 
  private getRequest(requestPathParam: string , options:any): Observable<any> {

    return this.http.get(
      requestPathParam,
      options
    )
    .map(this.extractData)
    .catch(this.checkAuth.bind(this));
  }

 /*
 * Http post request
 */
  private postRequest(requestPathParam: string , options:any): Observable<any> {
    return this.http.request(
      requestPathParam,
      options
    )
    .map(this.extractData)
    .catch(this.checkAuth.bind(this));
  }

  private extractData(res: Response) {
    //delete httpRequestId[id];
    const body = res.json();
    return body || { };
  }

  // Display error if logged in, otherwise redirect to IDP
  private checkAuth(error: any) {
    if (error && error.status === 401) {
      // this.redirectIfUnauth(error);
    } else {
      // this.displayError(error);
    }
    throw error;
  }

 /*
 * Default success handler function.
 */
  private commonSuccessCallBack(response){
    console.log("Response " + response);
  }

 /*
 * Default error handler function.
 */
  private commonErrorCallBack(error){
    console.log("There is an error " + error);
  }
}
