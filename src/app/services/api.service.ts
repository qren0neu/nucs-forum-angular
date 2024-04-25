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
}
