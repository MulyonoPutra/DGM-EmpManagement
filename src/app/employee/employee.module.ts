import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ComponentsModule } from '../../@components/components.module';
import { MaterialModule } from './../../@core/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RupiahCurrencyPipe } from '../../@core/pipe/currency.pipe';
import { ShortenerPipe } from '../../@core/pipe/shortener.pipe';

@NgModule({
    declarations: [
        EmployeeDetailsComponent,
        EmployeeCreateComponent,
        EmployeeListComponent,
        RupiahCurrencyPipe,
        ShortenerPipe
    ],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        ComponentsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        EmployeeDetailsComponent,
        EmployeeCreateComponent,
        EmployeeListComponent,
    ],
})
export class EmployeeModule {}
