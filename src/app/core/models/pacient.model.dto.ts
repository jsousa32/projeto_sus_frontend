export interface Pacient {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telephone: string;
  document: string;
  susNumber: string;
}

export interface PacientPage extends Omit<Pacient, 'password'> {}

export interface PacientResume extends Omit<Pacient, 'password'> {}

export interface PacientEditableFields extends Omit<Pacient, 'id' | 'password' | 'document' | 'susNumber'> {}
