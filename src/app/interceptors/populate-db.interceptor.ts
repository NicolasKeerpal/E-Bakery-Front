import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PopulateDbInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url=='http://localhost:8000/populate-db') {
      
      const token = localStorage.getItem('token');
      let clonedRequest = req;
      if (token) {
        clonedRequest = req.clone({
          setHeaders: {
            Authorization: `${token}`
          }
        });
      }
      return next.handle(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An error occurred';
          return throwError(() => new Error(errorMessage));
        }));

    } else {
      return next.handle(req);
    }
  }
}
