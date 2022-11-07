import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../@core/guard/auth.guard';

const routes: Routes = [
	{
		path: 'employee',
		loadChildren: () =>
			import('./employee/employee.module').then((m) => m.EmployeeModule),
		canActivate: [AuthGuard],
	},
	{
		path: '',
		loadChildren: () =>
			import('./authentication/authentication.module').then(
				(m) => m.AuthenticationModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
