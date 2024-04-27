import { Component, Input, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {
  @Input() props: any;
  user: any;
  follows: any[] = [];

  constructor(private userService: AuthService, private apiService: ApiService) {}

  ngOnInit() {
    this.user = this.userService.getStoredCredentials();
    this.fetchFollows();
  }

  fetchFollows() {
    const target = this.props.target;
    this.apiService.getFollowTarget(target).subscribe(
      (data: any) => {
        this.follows = data;
      }
    );
  }
}
