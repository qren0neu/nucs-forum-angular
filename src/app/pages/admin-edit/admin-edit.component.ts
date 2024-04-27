import {AfterViewInit, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MatOption} from "@angular/material/autocomplete";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {AsyncPipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {filter} from "rxjs";
import {AppModule} from "../../app.module";

@Component({
  selector: 'app-admin-edit',
  standalone: true,
  imports: [
    MatOption,
    MatOption,
    MatError,
    MatError,
    MatFormField,
    MatError,
    MatFormField,
    MatFormField,
    MatLabel,
    MatError,
    MatLabel,
    MatFormField,
    MatLabel,
    MatSelect,
    MatSelect,
    NgIf,
    NgIf,
    NgIf,
    NgIf,
    NgForOf,
    NgIf,
    MatButton,
    ReactiveFormsModule,
    MatButton,
    NgIf,
    NgForOf,
    MatButton,
    ReactiveFormsModule,
    MatInput,
    MatInput,
    MatInput,
    MatInput,
    AsyncPipe,
    AppModule
  ],
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.css'
})
export class AdminEditComponent implements AfterViewInit {
  form: FormGroup;
  error = '';
  waiting = false;
  user: any = {};
  schools = ['Northeastern University'];
  campuses = ['Arlington', 'Boston', 'Burlington', 'Charlotte', 'London', 'Miami', 'Nahant', 'Oakland', 'Portland', 'Seattle', 'Silicon Valley', 'Toronto', 'Vancouver'];
  showResetPasswordModal = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.form = this.fb.group({
      first: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      last: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      school: [''],
      campus: [''],
      company: ['']
    });
  }



  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      console.log('Username from query param:', username);
      if (username) {
        this.loadUser(username);
      }
    });
  }

  loadUser(username: string): void {
    this.apiService.getUser(username).subscribe({
      next: (data) => {
        this.user = data;
        this.form.patchValue(data);
      },
      error: (err) => this.error = 'Failed to load user'
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.waiting = true;
      this.apiService.updateUser(this.user.username, this.form.value).subscribe({
        next: (data) => {
          // handle successful update
          this.waiting = false;
        },
        error: (err) => {
          this.error = 'Failed to update user';
          this.waiting = false;
        }
      });
    }
  }

  isAdmin() {
    return this.authService.isAdmin();
  }


  onResetPasswordModalClosed() {
    this.showResetPasswordModal = false;
  }

  openResetPasswordModal() {
    this.showResetPasswordModal = true;
  }
}
