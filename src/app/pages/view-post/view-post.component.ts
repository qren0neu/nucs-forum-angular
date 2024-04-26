import {AfterViewInit, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ApiService} from "../../services/api.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NsLayoutComponent} from "../../ns-layout/ns-layout.component";
import {MatGridList} from "@angular/material/grid-list";
import {MarkdownComponent} from "ngx-markdown";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatError,
    MatLabel,
    MatFormField,
    MatIcon,
    ReactiveFormsModule,
    RouterLink,
    RouterLink,
    NgIf,
    MatButton,
    MatAnchor,
    MatIconButton,
    MatAnchor,
    MatButton,
    MatInput,
    MatInput,
    NsLayoutComponent,
    MatGridList,
    FormsModule,
    MarkdownComponent,
    NgForOf,
    MatDivider
  ],
})
export class ViewPostComponent implements OnInit, AfterViewInit {
  markdown = 'Type **anything** in the *Markdown* style:';
  content: any = {};
  comments: any[] = [];
  liked = false;
  saved = false;
  myComment = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.apiService.getPost(id).subscribe(data => {
          this.content = data;
          this.markdown = data.content;
          // Load comments
          this.loadComments(id);
        });
      }
    }
  }

  likePost(id: string): void {
    this.apiService.likePost(id).subscribe(() => {
      this.liked = !this.liked;
      this.snackBar.open('Like toggled!', 'Close', { duration: 2000 });
    });
  }

  savePost(id: string): void {
    this.apiService.savePost(id).subscribe(() => {
      this.saved = !this.saved;
      this.snackBar.open('Save toggled!', 'Close', { duration: 2000 });
    });
  }

  postComment(id: string): void {
    if (this.myComment) {
      this.apiService.postComment(id, this.myComment).subscribe(() => {
        this.myComment = '';
        this.loadComments(id);
      });
    }
  }

  loadComments(id: string): void {
    this.apiService.getComments(id).subscribe(comments => {
      this.comments = comments;
    });
    this.apiService.getLike(id).subscribe(data => {
      this.liked = data && data.by
    });
    this.apiService.getSave(id).subscribe(data => {
      this.saved = data && data.by
    });
    this.apiService.viewPost(id).subscribe(() => {});
  }

  deletePost(id: string): void {
    this.apiService.deletePost(id).subscribe(() => {
      this.snackBar.open('Post deleted!', 'Close', { duration: 2000 });
      // Redirect or update UI accordingly
    });
  }
}
