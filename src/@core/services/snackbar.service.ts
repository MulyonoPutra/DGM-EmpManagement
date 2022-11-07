import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class SnackbarService {
	constructor(private messageService: MatSnackBar) {}

	private showMessage(message: string, duration: number, styleClass: string) {
		const config = new MatSnackBarConfig();
		config.panelClass = ['snackbar-global', `${styleClass}`];
		config.duration = duration;
		config.horizontalPosition = 'right';
		this.messageService.open(message, '', config);
	}

	public warning(message: string, duration: number) {
		this.showMessage(message, duration, 'background-yellow');
	}

	public success(message: string, duration: number) {
		this.showMessage(message, duration, 'background-green');
	}

	public info(message: string, duration: number) {
		this.showMessage(message, duration, 'background-purple');
	}

	public error(message: string, duration: number) {
		this.showMessage(message, duration, 'background-red');
	}
}
