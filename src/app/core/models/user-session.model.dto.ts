import { Permissions } from '../enums/permissions.enum';

export interface UserSession {
  accessToken: string;
  userId: string;
  emailConfirmed: boolean;
  permissions: Permissions[];
  name: string;
  createdAt: Date;
  expiresAt: Date;
}
