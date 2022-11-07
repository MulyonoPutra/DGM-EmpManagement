import { Pipe, PipeTransform } from '@angular/core';

const padding = '000000';

@Pipe({
	name: 'rupiahCurrency',
})
export class RupiahCurrencyPipe implements PipeTransform {
	private prefix: string;
	private decimal_separator: string;
	private thousands_separator: string;
	private suffix: string;

	constructor() {
		this.prefix = 'Rp. ';
		this.suffix = '';
		this.decimal_separator = ',';
		this.thousands_separator = '.';
	}

	transform(value: number | string, fractionSize = 0): string {
		if (typeof value == 'number') {
			value = value.toString();
		}
		let [integer, fraction = ''] = (value || '').split('.');
		fraction =
			fractionSize > 0
				? this.decimal_separator +
				  (fraction + padding).substring(0, fractionSize)
				: '';
		integer = integer.replace(
			/\B(?=(\d{3})+(?!\d))/g,
			this.thousands_separator
		);
		if (isNaN(parseFloat(integer))) {
			integer = '0';
		}

		if (integer.substring(0, 1) == '0' && integer.length > 1) {
			do {
				if (integer.substring(0, 1) == '0') {
					integer = integer.slice(1, integer.length);
				}

				if (integer.substring(0, 1) == '.') {
					integer = integer.slice(1, integer.length);
				}
			} while (integer.substring(0, 1) === '0');
		}

		return this.prefix + integer + fraction + this.suffix;
	}
}
