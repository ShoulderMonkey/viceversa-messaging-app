import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AUTH_COOKIE_NAME } from './constants';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  constructor(
    @Inject(AUTH_COOKIE_NAME)private readonly authCookieName: string,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(this.authCookieName)
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
