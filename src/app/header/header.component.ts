import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {combineLatest, map, Observable} from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'NUCS Forum';
  sections = [
    // {title: 'Home', url: '/', requirement: 'user'},
    {title: 'Explore', url: '/post-explore', requirement: 'user'},
    {title: 'Dashboard', url: '/dashboard', requirement: 'user'},
    {title: 'Explore', url: '/post-explore', requirement: 'admin'},
    {title: 'AdminDashboard', url: '/dashboard', requirement: 'admin'},
    {title: 'My', url: '/me', requirement: 'user'},
    {title: 'All', url: '/all', requirement: 'admin'},
  ];

  constructor(public authService: AuthService, private router: Router) {
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }

  signOut(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

  showSections(): Observable<boolean> {
    const path = this.router.url;
    const pathsToExclude = ['/', '/register', '/login'];
    return this.authService.isAuthenticated().pipe(
      map(isAuthenticated => !pathsToExclude.includes(path) && isAuthenticated)
    );
  }

  // Determine if the section should be shown based on user role
  shouldDisplaySection(section: any): Observable<boolean> {
    if (section.requirement === 'admin') {
      return this.authService.isAdmin();
    } else if (section.requirement === 'user') {
      return this.authService.isUser();
    }
    return this.authService.isAuthenticated(); // Fallback to basic authentication check
  }
}
