import { Speciality } from '../enums/speciality.enum';

export interface Doctor {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telephone: string;
  document: string;
  crm: string;
  speciality: Speciality;
}

export interface DoctorPage extends Omit<Doctor, 'password'> {}

export interface DoctorResume extends Omit<Doctor, 'password'> {}

export interface DoctorEditableFields extends Omit<Doctor, 'id' | 'password' | 'document' | 'crm' | 'speciality'> {}
