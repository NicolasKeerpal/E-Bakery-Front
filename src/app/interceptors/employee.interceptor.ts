import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('http://localhost:8000/employees')) {
      
      const token = localStorage.getItem('token');
      let clonedRequest = req;
      if (token) {
        clonedRequest = req.clone({
          setHeaders: {
            Authorization: `${token}`
          }
        });
      }

      if (req.method == 'PUT') {
        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An error occurred';
            if (error.status === 422) {
              errorMessage = 'This mail is already linked on an account.';
            }
            return throwError(() => new Error(errorMessage));
          })
        );
      } else {
        return next.handle(clonedRequest);
      }
      
    } else {
      return next.handle(req);
    }
  }
}
