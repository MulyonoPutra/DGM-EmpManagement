import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../@core/models/employee';
import { EmployeeService } from '../../../@core/services/employee.service';
import { ErrorService } from '../../../@core/services/error.service';
import { SnackbarService } from '../../../@core/services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
    public subscription: Subscription[] = [];
    employee!: Employee;

    constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private snackbar: SnackbarService,
    private errorService: ErrorService
    ) {}

    ngOnInit(): void {
        this.findById();
    }

    findById() {
        const id = this.route.snapshot.paramMap.get('id') ?? '';
        this.subscription.push(
            this.employeeService.findById(id).subscribe({
                next: (response) => {
                    this.employee = response.data;
                    this.snackbar.warning('Successfully Retrieved...', 1000);
                },
                error: (error) => {
                    this.snackbar.error(error, 1000);
                    this.errorService.getErrorMessage(error);
                },
                complete: () => {
                    console.clear();
                }
            })
        );
    }

    // 👇 Unsubscribe: avoid memory leaks
    ngOnDestroy(): void {
        if (this.subscription && this.subscription.length > 0) {
            this.subscription.forEach((subs) => {
                subs.unsubscribe();
            });
        }
    }

    onBack(): void {
        this.router.navigateByUrl('/employee/list');
    }
}
