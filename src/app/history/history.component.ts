import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
    selector: 'history',
    template: `
        <div *ngIf="user">
            <div class="stack">
                <h2>List</h2>
                <div *ngFor="let post of posts">
                    <div class="post-item" (click)="goToPost(post.uuid)">
                        <mat-icon mat-list-icon>history</mat-icon>
                        <div mat-line class="post-title">{{ post.extra.title }}</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    user: any;
    posts: any[] = [];

    constructor(private http: HttpClient,
                private authService: AuthService,
                private apiService: ApiService,
                @Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.user = this.authService.getStoredCredentials();
            if (this.user) {
                this.fetchPosts();
            }
        }
    }

    fetchPosts() {
        this.apiService.getViewHistory().subscribe(
            (data: any[]) => {
                const seen = {};
                this.posts = data.filter((item) => {
                    if (!item.extra || seen.hasOwnProperty(item.uuid)) {
                        return false;
                    } else {
                        // @ts-ignore
                        seen[item.uuid] = true;
                        return true;
                    }
                });
            },
            (error) => {
                console.error('Error fetching posts:', error);
            }
        );
    }

    goToPost(uuid: string) {
        window.location.assign(`/post/${uuid}`);
    }
}
