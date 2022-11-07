import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ILogin, Login } from '../../../@core/models/login';
import { AuthenticationService } from '../../../@core/services/authentication.service';
import { ErrorService } from '../../../@core/services/error.service';
import { SnackbarService } from '../../../@core/services/snackbar.service';
import { StorageService } from '../../../@core/services/storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
    public subscription: Subscription[] = [];
    loginForms!: FormGroup;
    hide = true;

    constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private snackbar: SnackbarService,
    private storage: StorageService,
    private errorService: ErrorService,
    ) {}

    ngOnInit(): void {
        this.initEmailForms();
    }

    initEmailForms(): void {
        this.loginForms = this.fb.group({
            email:    ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    get formCtrlValue(): Login {
        return {
            email:       this.loginForms.get('email')?.value,
            password:    this.loginForms.get('password')?.value,
        };
    }

    /**
     * Login functionality with ILogin @response entity
     * after successfully Login, token will encoded & save to Cookies
     */
    login() {
        const payload = this.formCtrlValue;
        this.subscription.push(
            this.authService.login(payload).subscribe({
                next: (response: ILogin) => {
                    const tokenBase64 = btoa(response.token);
                    this.storage.setToken(tokenBase64);
                    this.snackbar.success('Welcome!', 1000);
                    setTimeout(() => {
                        this.router.navigate(['/employee/list']).then(() => {
                            window.location.reload();
                        });
                    }, 1100);
                },
                error: (error) => {
                    this.snackbar.error(error, 1000);
                    this.errorService.getErrorMessage(error);
                }
            })
        );
    }

    registerPage() {
        this.router.navigateByUrl('/register');
    }

    // 👇 Unsubscribe: avoid memory leaks
    ngOnDestroy(): void {
        if (this.subscription && this.subscription.length > 0) {
            this.subscription.forEach((subs) => {
                subs.unsubscribe();
            });
        }
    }
}
