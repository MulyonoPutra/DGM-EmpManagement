import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './../@components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Providers } from '../@core/providers/provider';
import { MaterialModule } from '../@core/shared/material.module';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
	declarations: [AppComponent],
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ComponentsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MaterialModule,
	],
	providers: [
		...Providers,
		{ provide: APP_BASE_HREF, useValue: '/' },
		CookieService,
	],
	bootstrap: [AppComponent],
	exports: [],
})
export class AppModule {}
