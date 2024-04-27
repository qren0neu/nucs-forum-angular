import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Constants} from "../constant";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient, private authService: AuthService) {
  }

  encodeCredentials(username: string, password: string) {
    return btoa(`${username}:${password}`);
  }

  makeHeader() {
    console.log('start to get credential')
    const credentials = this.authService.getStoredCredentials();
    const encodedCredentials = !credentials ? '' : this.encodeCredentials(credentials.email, credentials.password);
    console.log('credential is...', credentials, encodedCredentials)
    return new HttpHeaders({
      'Authorization': `Basic ${encodedCredentials}`
    });
  }

  getPost(id: string): Observable<any> {
    console.log('try to get post...')
    return this.http.get(`${Constants.API_BASE}/post/${id}`, {headers: this.makeHeader()});
  }

  likePost(id: string): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/like/${id}`, {}, {headers: this.makeHeader()});
  }

  getLike(id: string): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/like/${id}`, {headers: this.makeHeader()});
  }

  getSave(id: string): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/save/${id}`, {headers: this.makeHeader()});
  }

  viewPost(id: string): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/view/${id}`, {headers: this.makeHeader()});
  }

  savePost(id: string): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/save/${id}`, {}, {headers: this.makeHeader()});
  }

  postComment(id: string, content: string): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/comment/${id}`, {content}, {headers: this.makeHeader()});
  }

  getComments(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${Constants.API_BASE}/comment/${id}`, {headers: this.makeHeader()});
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${Constants.API_BASE}/post/${id}`, {headers: this.makeHeader()});
  }

  // Fetch the number of follows
  getFollows(): Observable<any> {
    return this.http.get<any>(`${Constants.API_BASE}/follow/mine?target=to`, { headers: this.makeHeader() });
  }

  getMyFollows(): Observable<any> {
    return this.http.get<any>(`${Constants.API_BASE}/follow/mine`, { headers: this.makeHeader() });
  }

  // Fetch the number of views
  getViews(): Observable<any> {
    return this.http.get<any>(`${Constants.API_BASE}/view/mine`, { headers: this.makeHeader() });
  }

  // Fetch the number of saves
  getSaves(): Observable<any> {
    return this.http.get<any>(`${Constants.API_BASE}/save/mine`, { headers: this.makeHeader() });
  }

  // Fetch the number of likes
  getLikes(): Observable<any> {
    return this.http.get<any>(`${Constants.API_BASE}/like/mine`, { headers: this.makeHeader() });
  }

  // Fetch posts by the current user
  getPosts(filter: string): Observable<any[]> {
    return this.http.get<any[]>(`${Constants.API_BASE}/post/search?filter=${filter}`, { headers: this.makeHeader() });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/user/all`, { headers: this.makeHeader() });
  }

  getUser(username: string): Observable<any> {
    return this.http.get(`${Constants.API_BASE}/user/${username}`, { headers: this.makeHeader() });
  }

  updateUser(username: string, userData: any): Observable<any> {
    return this.http.put(`${Constants.API_BASE}/user/${username}`, userData, { headers: this.makeHeader() });
  }

  createPost(postData: { title: string; tags: string[]; content: string }): Observable<any> {
    return this.http.post(`${Constants.API_BASE}/post/whatever`, postData, {
      headers: this.makeHeader()
    })
  }
}
