import { Speciality } from '../../../core/enums/speciality.enum';
import { Options } from '../../../core/models/options.model.dto';

export const specialityOptions: Options[] = [
  {
    name: 'Cardiologista',
    value: Speciality.CARDIOLOGY,
  },
  {
    name: 'Dermatologista',
    value: Speciality.DERMATOLOGY,
  },
  {
    name: 'Endocrinologista',
    value: Speciality.ENDOCRINOLOGY,
  },
  {
    name: 'Pediatra',
    value: Speciality.PEDIATRICS,
  },
];
