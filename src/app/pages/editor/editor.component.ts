import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {MatChip, MatChipListbox} from "@angular/material/chips";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
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
export class EditorComponent {
  form: FormGroup;
  tags: string[] = [];
  modalOpen = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.form = this.fb.group({
      markdown: ['Type **anything** in the *Markdown* style:'],
      title: [''],
      tag: ['']
    });
  }

  savePost(): void {
    this.modalOpen = true;
  }

  submitPost(): void {
    this.modalOpen = false;
    this.apiService.createPost({
      title: this.form.value.title,
      tags: this.tags,
      content: this.form.value.markdown
    }).subscribe({
      next: () => window.location.assign('/post/explore'),
      error: () => alert('Save failed')
    });
  }

  addTag(): void {
    if (this.form.value.tag && !this.tags.includes(this.form.value.tag)) {
      this.tags.push(this.form.value.tag);
      this.form.patchValue({ tag: '' });
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  goBack() {
      this.router.navigate(['/post-explore'])
  }
}
