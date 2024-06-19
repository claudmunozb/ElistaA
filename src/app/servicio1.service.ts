import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { h } from 'ionicons/dist/types/stencil-public-runtime';



@Injectable({
  providedIn: 'root'
})
export class Servicio1Service {
  HttpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-control-allow-origin': '*'
    })  
  }
// Se establece la base url del API a consumir
apiURL = 'https://jsonplaceholder.typicode.com';
// Se declara la variable http de tipo HttpClient
constructor(private http:HttpClient) { }
}
