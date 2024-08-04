import { Doctor } from './doctors.model.dto';
import { Pacient } from './pacient.model.dto';

export interface Appointment {
  id?: string;
  date: Date;
  hour: string;
  doctor: Doctor;
  pacient: Pacient;
}

export interface AppointmentPage extends Appointment {}

export interface AppointmentCreate extends Omit<Appointment, 'id' | 'doctor'> {}

export interface AppointmentEditableFields extends Omit<Appointment, 'id' | 'doctor'> {}
