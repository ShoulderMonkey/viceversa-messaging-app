import { HttpClient } from "@angular/common/http";
import { catchError, defer, EMPTY, Observable, tap } from "rxjs";
import { AuthService } from "@viceversa-messaging-app/auth";
import { inject } from "@angular/core";
export abstract class BaseHttpService {

  private authService = inject(AuthService)

  constructor(
    private http: HttpClient
  ) { }

  get<T>(url: string, options?: any) {
    return defer(() => {
      return (this.http.get<T>(url, options) as Observable<T>).pipe(
        catchError((error, caught) => {
          console.error(error)
          if(error.status === 401)
            this.handleUnauthorizedExceptions()
          return EMPTY
        })
      );
    }) as Observable<T>;
  }

  post<T>(url: string, body: any, options?: any): Observable<T> {
    return defer(() => {
      return this.http.post<T>(url, body, options).pipe(
        catchError(error => {
          console.error(error)
          if(error.status === 401)
            this.handleUnauthorizedExceptions()
          return EMPTY;
        })
      );
    }) as Observable<T>;
  }

  private handleUnauthorizedExceptions(){
    this.authService.removeJwtToken();
  }
}