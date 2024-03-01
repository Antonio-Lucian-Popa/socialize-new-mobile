import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interface/post';
import { Page } from '../interface/page';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private URL_LINK = 'http://localhost:8081/api/v1/posts';

  postCreateEmmitter = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  // createPost():Observable<Notification[]> {
  //   return this.http.get<any[]>(this.URL_LINK);
  // }

  createPost(userId: string, createPostDto: any, images: string[]): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('createPostDto', new Blob([JSON.stringify(createPostDto)], { type: 'application/json' }));

    images.forEach((image, index) => {
      const blob = this.dataURLtoBlob(image);
      formData.append('files', blob, `file${index}.${this.getFileExtension(blob.type)}`);
    });

    // Create a new HttpRequest with reportProgress set to true
    const req = new HttpRequest('POST', `${this.URL_LINK}/create/${userId}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    // Send the request and return the event stream
    return this.http.request(req);
  }

  getUserPosts(userId: string, page: number, size: number): Observable<Page<Post>> {
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<Page<Post>>(`${this.URL_LINK}/${userId}`, { params });
  }

  /**
   *
   * @param userId my user id
   * @param page
   * @param size
   * @returns a list of post from the user and the users that the user is following
   */
  getFollowingUsersPosts(userId: string, page: number, size: number): Observable<Page<Post>> {
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<Page<Post>>(`${this.URL_LINK}/posts/${userId}`, { params });
  }

  findPopularPosts():Observable<Post[]> {
    return this.http.get<Post[]>(this.URL_LINK);
  }

  getPosts():Observable<Post[]> {
    return this.http.get<Post[]>(this.URL_LINK);
  }

  private dataURLtoBlob(dataurl: string): Blob {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {type: mime});
  }

  private getFileExtension(mimeType: string): string {
    switch (mimeType) {
      case 'image/jpeg':
        return 'jpg';
      case 'image/png':
        return 'png';
      default:
        return 'dat';
    }
  }
}
