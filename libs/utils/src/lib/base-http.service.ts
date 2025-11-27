import { HttpClient } from "@angular/common/http";
import { catchError, defer, EMPTY, Observable, tap } from "rxjs";

export abstract class BaseHttpService {

  constructor(
    private http: HttpClient
  ) { }

  get<T>(url: string, options?: any) {
    return defer(() => {
      return (this.http.get<T>(url, options) as Observable<T>).pipe(
        catchError((error, caught) => {
          console.error(error)
          
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
          return EMPTY;
        })
      );
    }) as Observable<T>;
  }
}