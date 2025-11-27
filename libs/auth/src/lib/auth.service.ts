import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@viceversa-messaging-app/api-interfaces';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthOptions } from './auth-options';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseApiUrl: string;
  isImpersonatedUser: boolean = false;
  public userHasLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private options: AuthOptions) {
    this.baseApiUrl = this.options.baseApiUrl + '/auth';
    let user = null;
    const token = this.getJwtToken();
    if (token) {
      user = jwtDecode(token);
      if (!user) {
        this.userHasLogged.next(false);
      } else {
        this.userHasLogged.next(true);
      }
    }
  }

  login(credentials: any) {
    return this.http.post(`${this.baseApiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        this.setToken(res.access_token);
        this.userHasLogged.next(true);
      })
    );
  }


  setToken(token: string, language: string = 'it'): void {
    localStorage.setItem(this.options.authCookieName!, token);
  }

  getJwtToken(): string {
    const cookieValue = localStorage.getItem(this.options.authCookieName!);
    return cookieValue ? cookieValue.substr(2) : '';
  }

  removeJwtToken(): void {
    //localStorage.removeItem("gfp-user-token")
    localStorage.clear();
    this.userHasLogged.next(false);
  }

  getLoggedUser(): User | undefined {
    const token = this.getJwtToken();
    if (token) {
      return jwtDecode(token);
    } else {
      return undefined;
    }
  }
}
