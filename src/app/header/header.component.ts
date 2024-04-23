import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Assuming you have an AuthService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'Your Header Title';
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
    // this.authService.signOut().subscribe(() => {
    //   this.router.navigateByUrl('/account/login');
    // });
  }
}
