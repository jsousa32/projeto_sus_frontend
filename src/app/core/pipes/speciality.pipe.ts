import { Pipe, PipeTransform } from '@angular/core';
import { Speciality } from '../enums/speciality.enum';

@Pipe({
  name: 'speciality',
  standalone: true,
})
export class SpecialityPipe implements PipeTransform {
  transform(speciality: string): string {
    switch (speciality) {
      case Speciality.CARDIOLOGY:
        return 'Cardiologista';
      case Speciality.DERMATOLOGY:
        return 'Dermatologista';
      case Speciality.ENDOCRINOLOGY:
        return 'Endocrinologista';
      case Speciality.PEDIATRICS:
        return 'Pediatra';
      default:
        return 'N/A';
    }
  }

  static translation(speciality: string): string {
    switch (speciality) {
      case Speciality.CARDIOLOGY:
        return 'Cardiologista';
      case Speciality.DERMATOLOGY:
        return 'Dermatologista';
      case Speciality.ENDOCRINOLOGY:
        return 'Endocrinologista';
      case Speciality.PEDIATRICS:
        return 'Pediatra';
      default:
        return 'N/A';
    }
  }
}
