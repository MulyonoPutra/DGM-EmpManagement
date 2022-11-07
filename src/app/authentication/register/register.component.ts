import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../../@core/models/register';
import { AuthenticationService } from '../../../@core/services/authentication.service';
import { ErrorService } from '../../../@core/services/error.service';
import { SnackbarService } from '../../../@core/services/snackbar.service';
import { StorageService } from '../../../@core/services/storage.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['../login/login.component.scss'],
})
export class RegisterComponent implements OnInit {
	registerForms!: FormGroup;
	hide = true;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authService: AuthenticationService,
		private snackbar: SnackbarService,
		private storage: StorageService,
		private errorService: ErrorService
	) {}

	ngOnInit(): void {
		this.initForms();
	}

	initForms(): void {
		this.registerForms = this.fb.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}
	get formCtrlValue(): Register {
		return {
			name: this.registerForms.get('name')?.value,
			email: this.registerForms.get('email')?.value,
			password: this.registerForms.get('password')?.value,
		};
	}

	register() {
		this.authService.register(this.formCtrlValue).subscribe({
			next: () => {
				this.snackbar.success('Registered!', 1000);
				setTimeout(() => {
					this.router.navigateByUrl('/');
				}, 1100);
			},
			error: (error) => {
				this.errorService.getErrorMessage(error);
				this.snackbar.error(error, 1000);
			},
		});
	}

	loginPage() {
		this.router.navigateByUrl('/');
	}
}
