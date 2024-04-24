import {Component, OnInit} from '@angular/core';
import {NsLayoutComponent} from "../../ns-layout/ns-layout.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
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
    MatCardContent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
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
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confPassword: ['', Validators.required],
      school: [''],  // Optional field
      campus: [''],  // Optional field
      company: ['']  // Optional field
    });
  }

  // ngOnInit(): void {
  //   this.signUpForm = this.fb.group({
  //     first: ['', Validators.required],
  //     last: ['', Validators.required],
  //     // Define other fields similarly...
  //   });
  // }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      // Implement your API call logic here
    }
  }
}
