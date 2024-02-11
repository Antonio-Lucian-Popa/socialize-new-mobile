import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/shared/interface/user';

import * as moment from "moment";
import { jwtDecode } from "jwt-decode";
import { UserRegisterForm } from '../interfaces/user-register-form';
import { UserLoginForm } from '../interfaces/user-login-form';

export interface Token {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_LINK = 'http://localhost:3000/users';
  private accessToken = '';


  constructor(private http: HttpClient) { }

  register(userRegisterForm: UserRegisterForm): Observable<any> {
    return this.http.post<any>(`${this.URL_LINK}/register`, userRegisterForm);
  }

  login(userLoginForm: UserLoginForm): Observable<any> {
    // to get the refresh token we need to add { withCredential: true }
    return this.http.post<any>(`${this.URL_LINK}/authenticate`, userLoginForm)
      .pipe(
        map(res => {
          this.setSession(res);
          return res;
        })
      );
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.URL_LINK}/refresh-token`, {}, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.URL_LINK}/logout`, {}, { withCredentials: true });
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  clearAccessToken(): void {
    this.accessToken = '';
  }

  private setSession(token: Token) {
    if (token) {
      const decodedToken = this.getDecodedAccessToken(token.access_token);
      const expiresAt = moment().add(decodedToken.exp, 'second');
      this.setAccessToken(token.access_token);
      // localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
      localStorage.setItem("token", token.access_token);
      localStorage.setItem("user_id", decodedToken.userId);
      console.log(this.getAccessToken());
    }
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  // TODO: apply username on the BE call
  findUserByUsername(username: string):Observable<User[]> {
    return this.http.get<User[]>(this.URL_LINK);
  }

  getUserInfo(): any {
    return JSON.parse(localStorage.getItem('userInfo')!);
  }
}
