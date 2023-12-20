import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../interface/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private URL_LINK = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) { }

  findLastNotifications():Observable<Notification[]> {
    return this.http.get<any[]>(this.URL_LINK);
  }

  setReadNotification(id: number): Observable<any> {
    return this.http.put(`${this.URL_LINK}/${id}`, {});
  }

  setAllReadNotifications(): Observable<any> {
    return this.http.put(`${this.URL_LINK}`, {});
  }
}
