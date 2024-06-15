import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class CompositionInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('http://localhost:8000/compositions') && req.method != 'GET') {
        
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
