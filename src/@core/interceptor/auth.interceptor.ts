/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private storageService: StorageService) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token = this.storageService.getToken();
		const tokenEncoded = atob(token);

		if (tokenEncoded) {
			request = request.clone({
				setHeaders: { Authorization: `Bearer ${tokenEncoded}` },
			});
		}
		return next.handle(request).pipe(
			catchError((err) => {
				if (err.status >= 400) {
					this.storageService.logout();
				}
				const error = err.error.message || err.statusText;
				return throwError(error);
			})
		);
	}
}
