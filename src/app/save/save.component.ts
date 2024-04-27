import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "../services/auth.service";
import { ApiService } from "../services/api.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'save',
  template: `
    <div *ngIf="user">
      <h2>List</h2>
      <div *ngFor="let post of posts; let i = index">
        <div *ngIf="post.extra" style="cursor: pointer;" (click)="goToPost(post.uuid)">
          <span>{{ post.extra.title }}</span>
        </div>
        <hr>
      </div>
    </div>
  `,
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {
  user: any;
  posts: any[] = [];

  constructor(private http: HttpClient,
              private authService: AuthService,
              private apiService: ApiService,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.user = this.authService.getStoredCredentials();
      if (this.user) {
        this.fetchPosts();
      }
    }
  }

  fetchPosts() {
    this.apiService.getMySaves().subscribe(
        (data: any) => {
          const seen = {};
          this.posts = data.filter((item: any) => {
            if (!item.extra || seen.hasOwnProperty(item.uuid)) {
              return false;
            } else {
              // @ts-ignore
              seen[item.uuid] = true;
              return true;
            }
          });
        },
        error => {
          console.error('Error fetching saved posts:', error);
        }
    );
  }

  goToPost(uuid: string) {
    window.location.assign(`/post/${uuid}`);
  }
}
