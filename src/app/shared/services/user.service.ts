import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_LINK = 'http://localhost:8081/api/v1/users';

  constructor(private http: HttpClient) { }

  findUserById(userId: string):Observable<any> {
    return this.http.get<any>(`${this.URL_LINK}/${userId}`);
  }

  getProfileImage(userId: string): Observable<Blob> {
    const url = `${this.URL_LINK}/image/${userId}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((response: Blob) => {
        return response;
      })
    );
  }
}
