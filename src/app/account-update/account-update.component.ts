import {AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";

@Component({
    selector: 'app-account-update',
    templateUrl: './account-update.component.html',
    styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements AfterViewInit {
    form: FormGroup;
    error = '';
    waiting = false;
    user: any = {};
    schools = ['Northeastern University'];
    campuses = ['Arlington', 'Boston', 'Burlington', 'Charlotte', 'London', 'Miami', 'Nahant', 'Oakland', 'Portland', 'Seattle', 'Silicon Valley', 'Toronto', 'Vancouver'];
    showResetPasswordModal: boolean = false;

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
        if (isPlatformBrowser(this.platformId)) {
            const cred = this.authService.getStoredCredentials();
            if (cred) {
                this.loadUser(cred.email);
            }
        }
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
                    if (this.form.value.email !== this.user.email) {
                        this.authService.logout();
                        this.router.navigate(['login']);
                    }
                },
                error: (err) => {
                    this.error = 'Failed to update user';
                    this.waiting = false;
                }
            });
        } else {
            window.alert('invalid!')
        }
    }

    onResetPasswordModalClosed() {
        this.showResetPasswordModal = false;
    }

    openResetPasswordModal() {
        this.showResetPasswordModal = true;
    }
}
