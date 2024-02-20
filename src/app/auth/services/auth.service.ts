import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, tap, throwError } from 'rxjs';

import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from "jwt-decode";

export interface Token {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_LINK = 'http://localhost:8081/api/v1/auth';
 // private accessToken = '';

  private readonly storageKey = 'authToken';
  private _storage: Storage | null = null;


  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
  }

  async init() {
    // If using a storage module, initialize it here
    const storage = await this.storage.create();
    this._storage = storage;
  }

  register(userData: any, file?: File): Observable<any> {
    const formData = new FormData();

    // Append user data with explicit Content-Type for the JSON part
    // Note: Adding a filename for the JSON blob part ("request.json") might help.
    const userBlob = new Blob([JSON.stringify(userData)], { type: 'application/json' });
    formData.append('request', userBlob); // Notice the 'request.json' filename

    // Append file if present
    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http.post(`${this.URL_LINK}/register`, formData).pipe(
      catchError(this.handleError)
    );
  }



  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.URL_LINK}/authenticate`, { email, password }).pipe(
      tap((response: any) => {
        this.saveToken(response.token);
      })
    );
  }

  async saveToken(token: string) {
    await this._storage?.set(this.storageKey, token);
  }

  async getToken(): Promise<string | null> {
    return await this._storage?.get(this.storageKey);
  }

  async getUserId(): Promise<string | null> {
    const token = await this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token); // Use `any` or define a more specific type for your decoded token
      return decoded.userId;
    }
    return null;
  }

  isAuthenticated(): Observable<boolean> {
    return from(this.getToken().then(token => !!token));
  }

  async logout() {
    await this._storage?.remove(this.storageKey);
    // Handle other logout operations as needed, e.g., redirecting to login
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error according to your application's needs
    return throwError(error.message || 'Server error');
  }



  // register(userRegisterForm: UserRegisterForm): Observable<any> {
  //   return this.http.post<any>(`${this.URL_LINK}/register`, userRegisterForm);
  // }

  // login(userLoginForm: UserLoginForm): Observable<any> {
  //   // to get the refresh token we need to add { withCredential: true }
  //   return this.http.post<any>(`${this.URL_LINK}/authenticate`, userLoginForm)
  //     .pipe(
  //       map(res => {
  //         this.setSession(res);
  //         return res;
  //       })
  //     );
  // }

  // refreshToken(): Observable<any> {
  //   return this.http.post<any>(`${this.URL_LINK}/refresh-token`, {}, { withCredentials: true });
  // }

  // logout(): Observable<any> {
  //   return this.http.post<any>(`${this.URL_LINK}/logout`, {}, { withCredentials: true });
  // }

  // setAccessToken(token: string): void {
  //   this.accessToken = token;
  // }

  // getAccessToken(): string {
  //   return this.accessToken;
  // }

  // clearAccessToken(): void {
  //   this.accessToken = '';
  // }

  // private setSession(token: Token) {
  //   if (token) {
  //     const decodedToken = this.getDecodedAccessToken(token.access_token);
  //     const expiresAt = moment().add(decodedToken.exp, 'second');
  //     this.setAccessToken(token.access_token);
  //     // localStorage.setItem('id_token', authResult.idToken);
  //     localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  //     localStorage.setItem("token", token.access_token);
  //     localStorage.setItem("user_id", decodedToken.userId);
  //     console.log(this.getAccessToken());
  //   }
  // }

  // private getDecodedAccessToken(token: string): any {
  //   try {
  //     return jwtDecode(token);
  //   } catch (Error) {
  //     return null;
  //   }
  // }

  // // TODO: apply username on the BE call
  // findUserByUsername(username: string):Observable<User[]> {
  //   return this.http.get<User[]>(this.URL_LINK);
  // }

  // getUserInfo(): any {
  //   return JSON.parse(localStorage.getItem('userInfo')!);
  // }
}
