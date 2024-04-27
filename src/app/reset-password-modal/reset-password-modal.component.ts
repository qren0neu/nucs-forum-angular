import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password-modal',
  template: `
    <div *ngIf="open" class="modal">
      <div class="modal-content">
        <h2>Reset Password</h2>
        <p>Note: You need to login again after you changed your pass</p>
        <mat-form-field>
          <mat-label>Password</mat-label>
          <input matInput type="password" [type]="showPassword ? 'text' : 'password'" [formControl]="passwordControl">
          <button mat-icon-button matSuffix (click)="togglePasswordVisibility()">
            <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
          <mat-error *ngIf="passwordControl.invalid && passwordControl.touched">
            {{ getPasswordErrorMessage() }}
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Confirm Password</mat-label>
          <input matInput type="password" [type]="showConfirmPassword ? 'text' : 'password'" [formControl]="confirmPasswordControl">
          <button mat-icon-button matSuffix (click)="toggleConfirmPasswordVisibility()">
            <mat-icon>{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
          <mat-error *ngIf="confirmPasswordControl.invalid && confirmPasswordControl.touched">
            {{ getConfirmPasswordErrorMessage() }}
          </mat-error>
        </mat-form-field>
        <p *ngIf="modalError" class="error">{{ modalError }}</p>
        <button mat-raised-button color="primary" (click)="resetPassword()">Confirm</button>
        <button mat-raised-button (click)="closeModal()">Cancel</button>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 4px;
      max-width: 400px;
      width: 100%;
    }
    .error {
      color: red;
    }
  `]
})
export class ResetPasswordModalComponent {

  @Input() username: string | undefined;
  @Input() open: boolean = false;
  @Output() closed = new EventEmitter<void>();

  constructor(private authService: AuthService,
              private apiService: ApiService,
              private router: Router) {
  }

  passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmPasswordControl = new FormControl('', [Validators.required,
    Validators.minLength(8) ]);
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  modalError: string = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getPasswordErrorMessage() {
    if (this.passwordControl.hasError('required')) {
      return 'Password is required';
    }
    if (this.passwordControl.hasError('length')) {
      return ' too short';
    }
    return '';
  }

  getConfirmPasswordErrorMessage() {
    if (this.confirmPasswordControl.hasError('required')) {
      return 'Confirm Password is required';
    }
    return '';
  }

  resetPassword() {
    if (this.passwordControl.valid && this.confirmPasswordControl.valid) {
      if (this.passwordControl.value !== this.confirmPasswordControl.value) {
        this.modalError = 'Passwords do not match';
      } else {
        const cred = this.authService.getStoredCredentials();
        if (cred) {
          console.log('reset', cred, this.passwordControl.value)
          this.apiService.updateUser(this.username ?? cred.username, {
            password: this.passwordControl.value
          }).subscribe(() => {
            console.log('Password reset successful');
            this.closeModal();
            if (cred.username !== 'admin') {
              this.authService.logout().subscribe(() => {
                this.router.navigate(['/login']);
              });
            }
          })
        }
      }
    }
  }

  closeModal() {
    this.open = false;
    this.closed.emit();
  }
}
