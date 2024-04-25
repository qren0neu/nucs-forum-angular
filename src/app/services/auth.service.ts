import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import axios from "axios";
import {Constants} from "../constant";  // Import StorageService

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

  private validateCredentials(credentials: { email: string; password: string }): boolean {
    const hasValue = !!credentials.email && !!credentials.password;
    if (hasValue) {
      this.loginImpl(credentials.email, credentials.password);
      return true; // Assuming you handle the response inside login and adjust based on success/failure
    }
    return false;
  }

  public async handleCreateAccountWithCredentials(values: any): Promise<any> {
    const email = values.email;
    try {
      const resp = await axios.post(`${Constants.API_BASE}/user/${email}`, values);
      return resp.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  private async loginImpl(email: string, password: string): Promise<void> {
    const apiUrl = `${Constants.API_BASE}/account/signin`; // Replace with your actual API URL
    try {
      const response = await axios.post(apiUrl, {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as required
        }
      });
      console.log('Login successful:', response.data);
      // Handle success, possibly updating the state or redirecting the user
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error, possibly displaying a message to the user
    }
  }

  login(credentials: { email: string; password: string }): Observable<boolean> {
    if (this.validateCredentials(credentials)) {
      console.log('succ login');
      this.storageService.save('userCredentials', credentials);
      this.isAuthenticatedSubject.next(true);
      return of(true);
    }
    console.log('fail login');
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
