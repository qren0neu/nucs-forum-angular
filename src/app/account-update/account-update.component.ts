import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-account-update',
    templateUrl: './account-update.component.html',
    styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit {
    user: any;
    show = {pass: false, confPass: false};
    error = '';
    modalError = '';
    waiting = false;
    formik: FormGroup;
    formikReset: FormGroup;
    campuses = ['Arlington', 'Boston', 'Burlington', 'Charlotte', 'London', 'Miami', 'Nahant', 'Oakland', 'Portland', 'Seattle', 'Silicon Valley', 'Toronto', 'Vancouver'];
    matcher = new ErrorStateMatcher();
    // resetPasswordModal = false;
    @ViewChild('resetPasswordModal') resetPasswordModal: TemplateRef<any> | undefined;

    constructor(
        private userService: AuthService,
        private apiService: ApiService,
        private dialog: MatDialog,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.formik = this.fb.group({
            first: ['', Validators.required],
            last: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            school: [''],
            campus: [''],
            company: ['']
        });

        this.formikReset = this.fb.group({
            password: ['', Validators.required],
            confPassword: ['',
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            ]
        });
    }

    ngOnInit() {
        this.user = this.userService.getStoredCredentials();
        // this.formik.patchValue(this.user);
        if (this.user) {
            this.apiService.getUser(this.user.username).subscribe({
                next: (data) => {
                    this.user = data;
                    this.formik.patchValue(data);
                },
                error: (err) => this.error = 'Failed to load user'
            });
        }
    }

    toggleShow(field: string) {
        // @ts-ignore
        this.show[field] = !this.show[field];
    }

    openModal() {
        if (this.resetPasswordModal) {
            this.dialog.open(this.resetPasswordModal);
        }
    }

    closeModal() {
        this.dialog.closeAll();
    }

    resetPass(event: Event) {
        event.preventDefault();
        // if (Object.keys(this.formikReset.errors).length) {
        //     console.error(this.formikReset.errors);
        //     return false;
        // }
        // if (!Object.keys(this.formikReset.touched).length) {
        //     console.log(this.formikReset.touched);
        //     return false;
        // }
        const username = this.user.username;
        this.apiService.resetPassword(username, this.formikReset.value).subscribe(
            data => {
                this.waiting = false;
                this.userService.logout().subscribe(() => {
                    this.router.navigate(['/'])
                })
            },
            error => {
                console.error(error);
                this.modalError = error.error;
            }
        );
    }

    handleSubmit(event: Event) {
        event.preventDefault();
        console.log('submit');
        const username = this.user.username;
        this.apiService.updateUser(username, this.formik.value).subscribe(
            data => {
                this.waiting = false;
                if (this.user.email !== this.formik.value.email) {
                    this.userService.logout().subscribe(() => {
                        this.router.navigate(['/'])
                    })
                } else {
                    this.apiService.getUser(this.user.username).subscribe({
                        next: (data) => {
                            this.user = data;
                            this.formik.patchValue(data);
                        },
                        error: (err) => this.error = 'Failed to load user'
                    });
                }
            },
            error => {
                console.error(error);
                this.error = error.error;
            }
        );
    }
}
