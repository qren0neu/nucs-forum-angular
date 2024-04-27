import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {MatChip, MatChipListbox} from "@angular/material/chips";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute, Router} from "@angular/router";
import {MarkdownComponent} from "ngx-markdown";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    MatChip,
    MatLabel,
    MatLabel,
    MatFormField,
    MatFormField,
    MatFormField,
    MatLabel,
    MatIcon,
    ReactiveFormsModule,
    NgForOf,
    MatButton,
    MatButton,
    MatButton,
    NgIf,
    MatInput,
    MatInput,
    MatInput,
    MatChipListbox,
    MarkdownComponent
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements AfterViewInit {
  form: FormGroup;
  tags: string[] = [];
  modalOpen = false;
  titleControl = new FormControl('Default Title');
  tagControl = new FormControl('');

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private apiService: ApiService,
              private router: Router) {
    this.form = this.fb.group({
      markdown: ['Type **anything** in the *Markdown* style:'],
    });
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        console.log('id!', id)
        this.apiService.getPost(id).subscribe(data => {
          console.log(data)
          this.form.patchValue({
            markdown: data.content
          });
          this.tags = data.tags;
          this.titleControl.patchValue(data.title);
        });
      }
    });
  }

  savePost(): void {
    this.modalOpen = true;
  }

  submitPost(): void {
    this.modalOpen = false;
    this.apiService.createPost({
      title: this.titleControl.value!,
      tags: this.tags,
      content: this.form.value.markdown
    }).subscribe({
      next: () => window.location.assign('/post-explore'),
      error: () => alert('Save failed')
    });
  }

  addTag(): void {
    console.log(this.tagControl.value, this.tags);
    if (this.tagControl.value && !this.tags.includes(this.tagControl.value)) {
      this.tags.push(this.tagControl.value);
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  goBack() {
    this.router.navigate(['/post-explore'])
  }
}
