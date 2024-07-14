import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephone',
  standalone: true,
})
export class TelephonePipe implements PipeTransform {
  transform(value: string): string {
    const ddd = value.substring(0, 2);

    const nineDigit = value.substring(2, 3);

    const firstFourDigits = value.substring(3, 7);

    const lastFourDigits = value.substring(7, 11);

    return `(${ddd}) ${nineDigit} ${firstFourDigits}-${lastFourDigits}`;
  }
}
