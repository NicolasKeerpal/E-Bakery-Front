import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorCustomerInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method == 'POST' && req.url == 'http://localhost:8000/customers') {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An error occurred';
          if (error.status === 422) {
            errorMessage = 'This mail is already linked on an account';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
