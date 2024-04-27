import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatOption} from "@angular/material/autocomplete";
import {MatFormField} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {ApiService} from "../../services/api.service";
import {Constants} from "../../constant";

@Component({
  selector: 'app-serach-page',
  standalone: true,
  imports: [
    MatOption,
    MatOption,
    MatOption,
    MatOption,
    MatFormField,
    MatFormField,
    MatSelect,
    NgForOf,
    FormsModule,
    MatButton,
    MatButton,
    MatInput
  ],
  templateUrl: './serach-page.component.html',
  styleUrl: './serach-page.component.css'
})
export class SearchPageComponent implements OnInit {
  filter = 'title';
  search = '';
  posts: any[] = [];

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onFilterChange(event: any) {
    this.filter = event.value;
    this.fetchPosts();
  }

  onSearchChange(event: any) {
    this.search = event.target.value;
  }

  lookForPosts() {
    this.fetchPosts();
  }

  clearSearch() {
    this.filter = 'title';
    this.search = '';
    this.fetchPosts();
  }

  fetchPosts() {
    let url = `${Constants.API_BASE}/post/all`;
    if (this.search) {
      url = `${Constants.API_BASE}/post/search?filter=${this.filter}&search=${this.search}`;
    } else if (this.filter === 'mine') {
      url = `${Constants.API_BASE}/post/search?filter=${this.filter}`;
    }
    this.apiService.get(url).subscribe(
      (data: any) => {
        this.posts = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  goToPost(uuid: string) {
    window.location.assign(`/post/${uuid}`);
  }
}
