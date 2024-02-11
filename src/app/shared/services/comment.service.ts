import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interface/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private URL_LINK = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) { }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.URL_LINK);
  }
}
