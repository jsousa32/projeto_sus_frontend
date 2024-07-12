export interface Admin {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telephone: string;
  document: string;
}

export interface AdminPage extends Omit<Admin, 'password'> {}

export interface AdminResume extends Omit<Admin, 'password'> {}

export interface AdminEditableFields extends Omit<Admin, 'id' | 'password' | 'document'> {}
