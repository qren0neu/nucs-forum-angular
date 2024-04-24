import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'NUCS Forum';
  sections = [
    { title: 'Home', url: '/', needLogin: false },
    { title: 'Admin', url: '/admin', needLogin: true }
    // Add more sections as needed
  ];

  constructor(public authService: AuthService, private router: Router) {}

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }

  signOut(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

  // protected readonly async = async;
}
