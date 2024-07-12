import { Permissions } from '../enums/permissions.enum';

export interface AuthResponse {
  accessToken: string;
  emailConfirmed: boolean;
  permissions: Permissions[];
  name: string;
  createdAt: Date;
  expiresAt: Date;
}
