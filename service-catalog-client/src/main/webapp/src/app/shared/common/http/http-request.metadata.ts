import { Injectable } from '@angular/core';

export enum HttpType {
    GET,
    POST,
    PUT
}

@Injectable()
export class ReturnType {
     public APPLICATION_JSON :string = "application/json";
}