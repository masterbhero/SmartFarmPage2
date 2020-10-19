import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
}from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      retry(30),
      catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
          } else {
              // server-side error
              errorMessage = `Error Status: ${error.status} Message: ${error.message}`;
          }
          //console.log(errorMessage);
          //if(error.status == 403){
          console.log(errorMessage)
          if(errorMessage == "Error Status: 403 Message: Http failure response for https://smartflowfarm.info/api3001/user/GetUserAndVerify/: 403 Forbidden"){
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }else if(errorMessage == "Error Status: 403 Message: Http failure response for https://smartflowfarm.info/api3001/admin/GetAdminAndVerify: 403 Forbidden"){
            localStorage.removeItem('token_admin');
            this.router.navigate(['/admin-login']);
          }
          return throwError(errorMessage);
      })
    )
  }
}
