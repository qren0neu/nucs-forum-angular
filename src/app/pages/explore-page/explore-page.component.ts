// explore-page.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {Constants} from "../../constant";

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.http.get(`${Constants.API_BASE}/post/all`)
      .subscribe(
        (data: any) => {
          this.posts = data;
        },
        (err) => {
          console.error(err);
        }
      );
  }

  navigateToPost(postId: string) {
    this.router.navigate(['/post', postId]);
  }

  navigateToNewPost() {
    this.router.navigate(['/post/edit']);
  }

  hasSession() {
    return this.authService.hasSession();
  }
}
