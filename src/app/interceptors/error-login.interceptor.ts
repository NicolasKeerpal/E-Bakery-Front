import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorLoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url == 'http://localhost:8000/login') {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An error occurred';
          if ((error.status === 401) || (error.status === 404)) {
            errorMessage = 'Your mail or password are wrong';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
