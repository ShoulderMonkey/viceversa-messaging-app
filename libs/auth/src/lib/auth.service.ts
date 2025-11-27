import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from '@viceversa-messaging-app/api-interfaces';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, tap } from 'rxjs';
import { API_SERVICES_BASE_URL, AUTH_COOKIE_NAME, COOKIE_ACCEPTED_COOKIE_NAME } from './constants';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl: string
  isImpersonatedUser: boolean = false
  public userHasLogged: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(
    private http: HttpClient,
    @Inject(API_SERVICES_BASE_URL) public readonly apiUrl: string,
    @Inject(AUTH_COOKIE_NAME) public readonly authCookieName: string,
    @Inject(COOKIE_ACCEPTED_COOKIE_NAME) public readonly cookiePolicyAccepted: string
  ) {
    this.baseApiUrl = this.apiUrl + '/auth'
    let user = null;
    const token = this.getJwtToken();
    if (token) {
      user = jwtDecode(token);
      if (!user) {
        this.userHasLogged.next(false)
      } else {
        this.userHasLogged.next(true)
      }
    }
  }

  sendPasswordResetEmail(email: string) {
    return this.http.get(`${this.baseApiUrl}/password-reset/${email}`)
  }

  login(credentials: any) {
    return this.http.post(`${this.baseApiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        //localStorage.setItem("gfp-dashboard-token", res.access_token)
        this.setToken(res.access_token)
        this.userHasLogged.next(true)
      }),

    )
  }

  /* register(user: User){
    return this.http.post(`${this.baseApiUrl}/register`, user)
  } */

  setToken(token: string, language: string = 'it'): void {
    const decodedToken = jwtDecode(token);

    localStorage.setItem(this.authCookieName!, token)

  }

  getJwtToken(): string {
    const cookieValue = localStorage.getItem(this.authCookieName!)
    return cookieValue ? cookieValue.substr(2) : '';

  }

  removeJwtToken(): void {
    //localStorage.removeItem("gfp-user-token")
    localStorage.clear()
    this.userHasLogged.next(false)
  }

  getLoggedUser(): User | undefined {
    const token = this.getJwtToken();
    if (token) {
      return jwtDecode(token);
    } else {
      return undefined
    }
  }
}
