import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {ApiService} from "../services/api.service";
import {AuthService} from "../services/auth.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {
  @Input() props: any;
  user: any;
  follows: any[] = [];

  constructor(private userService: AuthService,
              private apiService: ApiService,
              @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.user = this.userService.getStoredCredentials();
      this.fetchFollows();
    }
  }

  fetchFollows() {
    const target = this.props.target;
    this.apiService.getFollowTarget(target).subscribe(
      (data: any) => {
        this.follows = data;
      }
    );
  }

  followChange(from: string, to: string) {
    this.apiService.follow(from, to).subscribe(
        (data: any) => {
          this.fetchFollows()
        }
    )
  }
}
