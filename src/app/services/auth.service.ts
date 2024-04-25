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

  private async checkStoredCredentials(): Promise<void> {
    const storedCredentials = this.storageService.load('userCredentials');
    if (storedCredentials) {
      this.isAuthenticatedSubject.next(await this.validateCredentials(storedCredentials));
    }
  }

  private async validateCredentials(credentials: { email: string; password: string }): Promise<any> {
    const hasValue = !!credentials.email && !!credentials.password;
    if (hasValue) {
      const loginUser = await this.loginImpl(credentials.email, credentials.password);
      if (loginUser && loginUser.username) {
        return loginUser;
      }
      return null;
    }
    return null;
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

  private async loginImpl(email: string, password: string): Promise<any> {
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
      console.log('Login successful: ...?', response.data);
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error, possibly displaying a message to the user
    }
  }

  async login(credentials: { email: string; password: string }): Promise<Observable<boolean>> {
    const loginUser = await this.validateCredentials(credentials);
    if (loginUser) {
      console.log('succ login');
      this.storageService.save('userCredentials', {...credentials, username: loginUser.username});
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

  isAdmin(): Observable<boolean> {
    const isAuthenticated = this.isAuthenticatedSubject.value;
    const credentials = this.storageService.load('userCredentials');
    const isAdmin = credentials && credentials.email === 'admin';
    return of(isAuthenticated && isAdmin);
  }

  public guestLogin(): Observable<boolean> {
    const guestCredentials = { email: 'guest', password: 'guest' };
    this.storageService.save('userCredentials', guestCredentials);
    this.isAuthenticatedSubject.next(true);
    return of(true);
  }

  public hasSession(): Observable<boolean> {
    const isAuthenticated = this.isAuthenticatedSubject.value;
    const credentials = this.storageService.load('userCredentials');
    const isNotGuest = credentials && credentials.email !== 'guest';
    return of(isAuthenticated && isNotGuest);
  }
}
