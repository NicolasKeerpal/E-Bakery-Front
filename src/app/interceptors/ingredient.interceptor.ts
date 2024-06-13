import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class IngredientInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('http://localhost:8000/ingredients')) {
      
      const token = localStorage.getItem('token');
      let clonedRequest = req;
      if (token) {
        clonedRequest = req.clone({
          setHeaders: {
            Authorization: `${token}`
          }
        });
      }

      if (req.method == 'POST') {
        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An error occurred';
            if (error.status == 400) {
              errorMessage = 'The stock must be over 0';
            }
            return throwError(() => new Error(errorMessage));
          })
        );
      } else if (req.method == 'PUT') {
        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An error occurred';
            if (error.status == 400) {
              errorMessage = 'The stock must be over 0';
            }
            return throwError(() => new Error(errorMessage));
          })
        );
      } else {
        return next.handle(clonedRequest);
      }
    }else {
      return next.handle(req);
    }
  }
}
