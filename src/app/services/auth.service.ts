import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';  // Import StorageService

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.checkStoredCredentials();
  }

  private checkStoredCredentials(): void {
    const storedCredentials = this.storageService.load('userCredentials');
    if (storedCredentials) {
      this.isAuthenticatedSubject.next(this.validateCredentials(storedCredentials));
    }
  }

  private validateCredentials(credentials: { email: string; username: string; password: string }): boolean {
    return !!credentials.email && !!credentials.username && !!credentials.password;
  }

  login(credentials: { email: string; username: string; password: string }): Observable<boolean> {
    if (this.validateCredentials(credentials)) {
      this.storageService.save('userCredentials', credentials);
      this.isAuthenticatedSubject.next(true);
      return of(true);
    }
    return of(false);
  }

  logout(): Observable<boolean> {
    this.storageService.remove('userCredentials');
    this.isAuthenticatedSubject.next(false);
    return of(true);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
