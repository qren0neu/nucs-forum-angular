import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  // Simulates the login by setting isAuthenticated to true
  login(username: string, password: string): Observable<boolean> {
    // Here, you would ideally call your backend API to validate credentials
    this.isAuthenticatedSubject.next(true);
    return of(true); // Simulating successful login
  }

  // Checks the current authentication status
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Simulates the logout by setting isAuthenticated to false
  logout(): Observable<boolean> {
    this.isAuthenticatedSubject.next(false);
    return of(true); // Simulating successful logout
  }
}
