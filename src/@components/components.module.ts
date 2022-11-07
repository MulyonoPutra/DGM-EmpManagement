import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SideBackgroundComponent } from './side-background/side-background.component';
import { MaterialModule } from '../@core/shared/material.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
	declarations: [NavbarComponent, SideBackgroundComponent, SpinnerComponent],
	imports: [CommonModule, MaterialModule],
	exports: [NavbarComponent, SideBackgroundComponent, SpinnerComponent],
})
export class ComponentsModule {}
