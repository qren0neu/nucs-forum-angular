import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NsLayoutComponent} from "../../ns-layout/ns-layout.component";
import {MatGridList} from "@angular/material/grid-list";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardTitle,
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
    MatGridList
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInForm: FormGroup;
  hide = true;
  authError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.authService.login(this.signInForm.value).subscribe({
        next: (val) => {
          if (val) {
            this.router.navigate(['/post/explore'])
          } else {
            this.authError = 'Your email or password is not correct'
          }
        },
        error: (err) => this.authError = 'Your email or password is not correct'
      });
    }
  }

  navigateBack(): void {
    this.router.navigateByUrl('/');
  }

  getErrorMessage(control: any): string {
    if (control.errors?.required) {
      return 'You must enter a value';
    } else if (control.errors?.email) {
      return 'Not a valid email';
    }
    return '';
  }
}
