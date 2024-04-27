import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AppModule} from "../../app.module";
import {isPlatformBrowser, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AppModule,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  posts: any[] = [];
  follows: any[] | null = null;
  views: any;
  likes: any;
  saves: any;

  constructor(private apiService: ApiService,
              private authService: AuthService,
              @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadData();
    }
  }

  loadData(): void {
    this.apiService.getPosts('mine').subscribe(data => this.posts = data);
    this.apiService.getViews().subscribe(data => this.views = data);
    this.apiService.getSaves().subscribe(data => this.saves = data);
    this.apiService.getLikes().subscribe(data => this.likes = data);
    this.authService.isAdmin().subscribe(isAdmin => {
      if (!isAdmin) {
        this.apiService.getFollows().subscribe(data => this.follows = data);
      }
    })
  }
}
