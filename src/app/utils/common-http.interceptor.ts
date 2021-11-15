import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class CommonHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const reqWithAuth = request.clone({
      setHeaders: {
        Authorization: 'Bearer 2435324f-r4r55q-432fr45-5543f6',
        'Content-Type': 'application/json',
      },
    });

    return next.handle(reqWithAuth).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.error(
          `Http failure response for: ${request.url}`,
          `Error Message: ${error.message}`
        );
        return throwError(error);
      })
    );
  }
}
