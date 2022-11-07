import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../../@core/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../@components/components.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [
		CommonModule,
		AuthenticationRoutingModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		ComponentsModule,
	],
	exports: [LoginComponent, RegisterComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthenticationModule {}
