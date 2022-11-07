import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../../@core/services/employee.service';
import { ErrorService } from '../../../@core/services/error.service';
import { SnackbarService } from '../../../@core/services/snackbar.service';
import { Employee } from './../../../@core/models/employee';

@Component({
	selector: 'app-employee-create',
	templateUrl: './employee-create.component.html',
	styleUrls: ['./employee-create.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCreateComponent implements OnInit, OnDestroy {
	public subscription: Subscription[] = [];
	employeeForms!: FormGroup;
	employee!: Employee;
	today = new Date();
	inputReadonly = true;

	public validationMessages = {
		required: { type: 'required', message: 'Full name is required' },
		email: { type: 'email', message: 'Email address is invalid' },
		minLength: {
			type: 'minLength',
			message: 'must be at least 5 characters long.',
		},
		maxLength: {
			type: 'maxlength',
			message: 'Cannot be more than 256 characters long',
		},
	};

	groupCollections = [
		{ value: 'IT', viewValue: 'IT' },
		{ value: 'HR', viewValue: 'HR' },
		{ value: 'Marketing', viewValue: 'Marketing' },
		{ value: 'UI/UX', viewValue: 'UI/UX' },
		{ value: 'Accounting', viewValue: 'Accounting' },
		{ value: 'Finance', viewValue: 'Finance' },
		{ value: 'Sales', viewValue: 'Sales' },
		{ value: 'Risk Management', viewValue: 'Risk Management' },
		{ value: 'Logistic', viewValue: 'Logistic' },
		{ value: 'Delivery', viewValue: 'Delivery' },
	];

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private employeeService: EmployeeService,
		private snackbar: SnackbarService,
		private errorService: ErrorService
	) {}

	ngOnInit(): void {
		this.initForms();
	}

	initForms(): void {
		this.employeeForms = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(5)]],
			firstName: ['', [Validators.required, Validators.minLength(5)]],
			lastName: ['', [Validators.required, Validators.minLength(5)]],
			email: ['', [Validators.required, Validators.email]],
			birthDate: ['', Validators.required],
			salary: ['', [Validators.required, Validators.minLength(5)]],
			status: ['', [Validators.required, Validators.minLength(5)]],
			group: ['', Validators.required],
			description: ['', [Validators.required, Validators.minLength(5)]],
		});
	}

	get formCtrlValue() {
		return {
			username: this.employeeForms.get('username')?.value,
			firstName: this.employeeForms.get('firstName')?.value,
			lastName: this.employeeForms.get('lastName')?.value,
			email: this.employeeForms.get('email')?.value,
			birthDate: this.employeeForms.get('birthDate')?.value,
			salary: this.employeeForms.get('salary')?.value,
			status: this.employeeForms.get('status')?.value,
			group: this.employeeForms.get('group')?.value,
			description: this.employeeForms.get('description')?.value,
		};
	}

	private prepopulate(): void {
		this.employeeForms.patchValue({
			username: this.employee.username,
			firstName: this.employee.firstName,
			lastName: this.employee.lastName,
			email: this.employee.email,
			birthDate: this.employee.birthDate,
			salary: this.employee.salary,
			status: this.employee.status,
			group: this.employee.group,
			description: this.employee.description,
		});
	}

	get usernameTouchDirty() {
		return (
			this.employeeForms.get('username')?.dirty ||
			this.employeeForms.get('username')?.touched
		);
	}

	get firstNameTouchDirty() {
		return (
			this.employeeForms.get('firstName')?.dirty ||
			this.employeeForms.get('firstName')?.touched
		);
	}

	get lastNameTouchDirty() {
		return (
			this.employeeForms.get('lastName')?.dirty ||
			this.employeeForms.get('lastName')?.touched
		);
	}

	get emailTouchDirty() {
		return (
			this.employeeForms.get('email')?.dirty ||
			this.employeeForms.get('email')?.touched
		);
	}

	get birthDateTouchDirty() {
		return (
			this.employeeForms.get('birthDate')?.dirty ||
			this.employeeForms.get('birthDate')?.touched
		);
	}

	get salaryTouchDirty() {
		return (
			this.employeeForms.get('salary')?.dirty ||
			this.employeeForms.get('salary')?.touched
		);
	}

	get statusTouchDirty() {
		return (
			this.employeeForms.get('status')?.dirty ||
			this.employeeForms.get('status')?.touched
		);
	}

	get groupTouchDirty() {
		return (
			this.employeeForms.get('group')?.dirty ||
			this.employeeForms.get('group')?.touched
		);
	}

	get descriptionTouchDirty() {
		return (
			this.employeeForms.get('description')?.dirty ||
			this.employeeForms.get('description')?.touched
		);
	}

	public errorMessages(controlName: string, validation: string) {
		if (validation === 'required') {
			return `${controlName} is required`;
		}
		if (validation === 'email') {
			return `${controlName} address is invalid`;
		}

		if (validation === 'minLength') {
			return `${controlName} cannot be less than 3 characters long`;
		}
		if (validation === 'maxLength') {
			return `${controlName} cannot be more than 25 characters long`;
		}

		return;
	}

	public checkError = (controlName: string, errorName: string) => {
		return this.employeeForms.controls[controlName].hasError(errorName);
	};

	onSubmit(): void {
		const payload = this.formCtrlValue;
		if (this.employeeForms.invalid) {
			return;
		}

		this.subscription.push(
			this.employeeService.create(payload).subscribe({
				next: () => {
					this.snackbar.success('Created!', 1000);
					this.router.navigateByUrl('/employee/list');
				},
				error: (error) => {
					this.snackbar.error(error, 1000);
					this.errorService.getErrorMessage(error);
				},
			})
		);
	}

	onBack(): void {
		this.router.navigateByUrl('/employee/list');
	}

	ngOnDestroy(): void {
		if (this.subscription && this.subscription.length > 0) {
			this.subscription.forEach((subs) => {
				subs.unsubscribe();
			});
		}
	}
}
