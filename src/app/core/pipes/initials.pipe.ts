import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(fullName: string): string {
    const splittedName = fullName.split(' ');

    let initials = '';

    splittedName.forEach((s) => {
      initials += s[0].toUpperCase();
    });

    return initials;
  }
}
