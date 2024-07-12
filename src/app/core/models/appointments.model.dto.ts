import { Doctor } from './doctors.model.dto';

export interface Appointment {
  id?: string;
  date: Date;
  hour: string;
  doctor: Doctor;
}

export interface AppointmentPage extends Appointment {}

export interface AppointmentCreate extends Omit<Appointment, 'id' | 'doctor'> {}

export interface AppointmentEditableFields extends Omit<Appointment, 'id' | 'doctor'> {}
