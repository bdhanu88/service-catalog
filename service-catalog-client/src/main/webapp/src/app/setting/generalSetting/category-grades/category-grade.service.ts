import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AuthenticationService} from '../../../login/authentication.service';
import {Category, Grade} from './category-grade.component';


@Injectable()
export class CategoryGradeService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: Http, private authenticationService: AuthenticationService) {
  }

  getCategoryGradeArray(companyId: number): Observable<any> {
    let token;
    return this.http.get('category/category?companyId=' + companyId, {headers: this.headers}).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json().categoryTree;
    });
  }

  addCategory(categoryForm: Category): Observable<any> {
    return this.http.post('category/category/add', JSON.stringify(categoryForm), {headers: this.headers}).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json();
    });
  }

  checkCategoryExistence(categoryName: string, selectedId: number, isEdit: boolean, companyId: number): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('categoryName', categoryName);

    if (selectedId == null) {
      selectedId = 0;
    }
    let options = new RequestOptions({headers: this.headers, params: params});

    return this.http.get('category/category/checkExist?categoryName=' + categoryName + '&categoryId=' + selectedId + '&isEdit=' + isEdit + '&companyId=' + companyId, options).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json();
    });
  }

  /**
   * service to check category and grade abbreviation existence
   *
   */
  checkAbbreviationExistence(abbreviation: string, isCategory: boolean, selectedId: number, isEdit: boolean) {

    if (selectedId == null) {
      selectedId = 0;
    }
    return this.http.get('category/abbreviation/checkExist?abbreviation=' + abbreviation + '&isCategory=' + isCategory + '&id=' + selectedId + '&isEdit=' + isEdit, {headers: this.headers}).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json();
    });

  }

  getCategoryFromId(categoryId: number) {
    return this.http.get('category/getCategory?categoryId=' + categoryId, {headers: this.headers}).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json();
    });
  }

  removeCategory(categoryId: number) {
    return this.http.get('category/remove/category?categoryId=' + categoryId, {headers: this.headers}).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json();
    });
  }

  getCategories() {
    return this.http.get('category/getAllCategories', {headers: this.headers}).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json();
    });
  }

  addGrade(gradeForm: Grade): Observable<any> {
    return this.http.post('category/grade/add', JSON.stringify(gradeForm), {headers: this.headers}).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json();
    });
  }

  checkGradeExistence(gradeName: string, selectedId: number, isEdit: boolean): Observable<any> {

    if (selectedId == null) {
      selectedId = 0;
    }
    return this.http.get('category/grade/checkExist?gradeName=' + gradeName + '&gradeId=' + selectedId + '&isEdit=' + isEdit, {headers: this.headers}).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json();
    });
  }

  getGradeFromId(gradeId: number) {

    return this.http.get('category/getGrade?gradeId=' + gradeId, {headers: this.headers}).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json();
    });
  }

  removeGrade(gradeId: number) {

    return this.http.get('category/remove/grade?gradeId=' + gradeId, {headers: this.headers}).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json();
    });
  }

  orderCategoryAndGrades(gradeIds: number[], categoryIds: number[]) {

    return this.http.get('category/order?gradeIds=' + gradeIds + '&categoryIds=' + categoryIds, {headers: this.headers}).map((response: Response) => {
      // login successful if there's a jwt token in the response
      return response.json();
    });
  }

}
