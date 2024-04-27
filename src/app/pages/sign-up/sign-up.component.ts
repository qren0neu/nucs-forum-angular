import {Component, OnInit} from '@angular/core';
import {NsLayoutComponent} from "../../ns-layout/ns-layout.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    NsLayoutComponent,
    MatCardHeader,
    MatCardTitle,
    MatCard,
    MatError,
    MatGridTile,
    MatError,
    MatFormField,
    MatLabel,
    MatGridList,
    MatIcon,
    NgIf,
    ReactiveFormsModule,
    ReactiveFormsModule,
    NgIf,
    MatButton,
    MatButton,
    MatInput,
    MatInput,
    MatIconButton,
    MatIconButton,
    MatCardContent,
    MatAnchor
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  hide = true;
  hideConfirmPassword = true;
  authError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      last: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confPassword: ['', Validators.required],
      school: [''],  // Optional field
      campus: [''],  // Optional field
      company: ['']  // Optional field
    });
  }


  ngOnInit(): void {
    // Redirect if already signed in
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.redirectIfSessionExists();
      }
    });
  }

  private redirectIfSessionExists(): void {
    // Add additional checks or a specific route if necessary
    this.router.navigate(['/post-explore']);
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      if (this.signUpForm.value.confPassword !== this.signUpForm.value.password) {
        this.authError = 'password mismatch';
        return;
      }
      // Implement your API call logic here
      this.authService.handleCreateAccountWithCredentials(this.signUpForm.value)
        .then(data => {
          if (data.hasError) {
            this.authError = 'sign up failed';
          } else {
            this.authService.login({
              email: this.signUpForm.value.email,
              password: this.signUpForm.value.password
            }).then(obs => {
              obs.subscribe({
                next: (val) => {
                  if (val) {
                    this.router.navigate(['/post-explore'])
                  } else {
                    this.authError = 'failed'
                  }
                },
                error: (err) => this.authError = 'failed'
              });
            }).catch(() => {
              this.authError ='failed'
            })
          }
        }).catch((err) => {
        this.authError = 'sign up failed';
      })
    } else {
      window.alert('invalid!')
    }
  }
}
