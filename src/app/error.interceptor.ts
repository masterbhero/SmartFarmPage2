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
      retry(1),
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
          if(errorMessage == "Error Status: 403 Message: Http failure response for http://localhost:3000/user/verify: 403 Forbidden"){
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
          return throwError(errorMessage);
      })
    )
  }
}
