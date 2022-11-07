import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data, Employee } from '../../../@core/models/employee';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../@core/services/employee.service';
import { SnackbarService } from '../../../@core/services/snackbar.service';
import { ErrorService } from '../../../@core/services/error.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit, OnDestroy {
    public subscription: Subscription[] = [];
    displayedColumns = [
        '_id',
        'username',
        'email',
        'birthDate',
        'salary',
        'status',
        'group',
        'description',
        'actions',
    ];
    dataSource!: MatTableDataSource<Employee>;
    employee!: Employee[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private snackbar: SnackbarService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
      this.findAllEmployees();
  }

  findAllEmployees(): void {
      this.subscription.push(
          this.employeeService.findAll().subscribe({
              next: (response: Data) => {
                  this.employee = response.data;
                  this.dataSource = new MatTableDataSource(response.data);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
              },
          })
      );
  }

  trackById(index:number, item:Employee): string | undefined {
      return item._id;
  }

  applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
  }

  onCreate(): void {
      this.router.navigateByUrl('/employee/create');
  }

  onViewDetails(_id?: string) {
      this.router.navigateByUrl(`/employee/details/${_id}`);
  }

  onDelete(id: string): void {
      this.subscription.push(
          this.employeeService.remove(id).subscribe({
              next: () => {
                  this.snackbar.error('Deleted!', 2000);
                  this.findAllEmployees();
              },
              error: (error) => {
                  this.snackbar.error(error, 1000);
                  this.errorService.getErrorMessage(error);
              },
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
}
