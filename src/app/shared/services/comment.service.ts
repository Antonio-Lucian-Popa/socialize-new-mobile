import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Comment } from '../interface/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  userComment = new Subject<Comment>();

  private URL_LINK = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) { }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.URL_LINK}/${postId}`);
  }
}
