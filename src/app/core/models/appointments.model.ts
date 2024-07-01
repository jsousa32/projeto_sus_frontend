import { Doctor } from './doctors.model.dto';
import { Pacient } from './pacient.model.dto';

export interface Appointments {
  date: Date;
  hour: string;
  doctor: Doctor;
  pacient: Pacient;
}
