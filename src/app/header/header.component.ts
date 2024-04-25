import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {map, Observable} from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'NUCS Forum';
  sections = [
    {title: 'Home', url: '/', requirement: 'user'},
    {title: 'Dashboard', url: '/admin', requirement: 'user'},
    {title: 'Admin', url: '/admin', requirement: 'admin'},
    {title: 'My', url: '/admin', requirement: 'user'},
    {title: 'All', url: '/admin', requirement: 'admin'},
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
}
