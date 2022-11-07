import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { throwError as observableThrowError } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
	providedIn: 'root',
})
export class ErrorService {
	constructor(
		private messagesService: SnackbarService,
		private readonly zone: NgZone,
		private router: Router
	) {}

	public handleError(res: HttpErrorResponse | any) {
		return observableThrowError(res.error || 'Server error');
	}

	public getErrorMessage(error: any): any {
		switch (error.status) {
			case 0:
			case 207: {
				this.zone.run(() =>
					this.messagesService.error('Multi-Status', 500)
				);
				return null;
			}
			case 400: {
				this.zone.run(() =>
					this.messagesService.error('Bad Request', 500)
				);
				return null;
			}
			case 401: {
				this.zone.run(() =>
					this.messagesService.error('Unauthorized', 500)
				);
				return null;
			}
			case 409: {
				this.zone.run(() =>
					this.messagesService.error('Conflict', 500)
				);
				return null;
			}

			case 415: {
				this.zone.run(() =>
					this.messagesService.error('Unsupported Media Type', 500)
				);
				return null;
			}

			case 403: {
				this.zone.run(() =>
					this.messagesService.error(
						'You dont have permission to access on this server',
						500
					)
				);
				this.router.navigateByUrl('/');
				return null;
			}

			case 404: {
				this.zone.run(() =>
					this.messagesService.error('Not Found', 500)
				);
				this.router.navigateByUrl('/');
				return null;
			}
			case 405: {
				this.zone.run(() =>
					this.messagesService.error('Method Not Allowed', 500)
				);
				return null;
			}
			case 500: {
				this.zone.run(() =>
					this.messagesService.error(
						'500: Internal Server Error',
						500
					)
				);
				return null;
			}
			case 502:
			case 503: {
				this.zone.run(() =>
					this.messagesService.error('Service Unavailable', 500)
				);
				return null;
			}
			default: {
				return this.messagesService.error('Service Unavailable', 500);
			}
		}
	}
}
