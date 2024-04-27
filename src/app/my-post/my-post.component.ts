import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "../services/auth.service";
import { ApiService } from "../services/api.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'my-post',
  template: `
    <div *ngIf="user">
      <div class="stack">
        <h2>List</h2>
        <div *ngFor="let post of posts">
          <div class="post-item" style="cursor: pointer;" (click)="goToPost(post.uuid)">
            <span class="post-title">{{ post.title }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {
  user: any;
  posts: any[] = [];

  constructor(private http: HttpClient,
              private authService: AuthService,
              private apiService: ApiService,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.user = this.authService.getStoredCredentials();
      this.fetchPosts();
    }
  }

  fetchPosts() {
    this.apiService.searchMyPosts().subscribe(
        (data: any) => {
          this.posts = data;
        },
    );
  }

  goToPost(uuid: string) {
    window.location.assign(`/post/${uuid}`);
  }
}
