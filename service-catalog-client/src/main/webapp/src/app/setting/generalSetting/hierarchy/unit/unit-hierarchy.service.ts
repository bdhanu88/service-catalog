import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../../../../login/authentication.service';
import { UnitLevel } from './unit-level.dialog';

@Injectable()
export class UnitHierarchyService {
     private headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
     });

    constructor(private http:Http, private authenticationService:AuthenticationService) { }

     getUnitHierarchyList(companyId:number){
          return this.http.get('unit/unitHierarchy?companyId='+companyId, {headers: this.headers}).map((response: Response) => {
                // login successful if there's a jwt token in the response
               return response.json();
            });
     }

     checkAbbreviationExistence(abbreviation:string,  selectedId:number, isEdit:boolean,companyId:number){

          if(selectedId == null){
            selectedId = 0;
          }
         return this.http.get('unit/level/abbreviation/checkExist?abbreviation='+abbreviation+'&id='+selectedId+'&isEdit='+isEdit+'&companyId='+companyId, {headers: this.headers}).map((response: Response) => {
                // login successful if there's a jwt token in the response
               return response.json();
         });

    }

   checkLevelExistence(levelName: string, selectedId:number, isEdit:boolean,companyId:number):Observable<any>{

      if(selectedId == null){
            selectedId = 0;
      }
      return this.http.get('unit/level/checkExist?levelName='+levelName+'&levelId='+selectedId+'&isEdit='+isEdit+'&companyId='+companyId, {headers: this.headers}).map((response: Response) => {
                // login successful if there's a jwt token in the response
            return response.json();
      });
    }

    addUnitLevel(unitLevelForm: UnitLevel):Observable<any>{
         return this.http.post('unit/level/add',JSON.stringify(unitLevelForm) , {headers: this.headers}).map((response: Response) => {
                // login successful if there's a jwt token in the response
               return response.json();
            });
    }

     deleteUnitLevel(selectedId:number):Observable<any>{

      return this.http.get('unit/level/delete?id='+selectedId, {headers: this.headers}).map((response: Response) => {
                // login successful if there's a jwt token in the response
            return response.json();
      });
    }

}
