import { Permissions } from '../enums/permissions.enum';
import { UserSession } from '../models/user-session.model.dto';
import { StorageUtils } from './storage.utils';

export class PermissionsUtils {
  static permissions = (StorageUtils.find('userSession') as UserSession).permissions;

  static isAdmin() {
    return PermissionsUtils.permissions.some((perm) => perm == Permissions.ADMIN);
  }

  static isDoctor() {
    return PermissionsUtils.permissions.some((perm) => perm == Permissions.DOCTOR);
  }

  static isPacient() {
    return PermissionsUtils.permissions.some((perm) => perm == Permissions.PACIENT);
  }
}
