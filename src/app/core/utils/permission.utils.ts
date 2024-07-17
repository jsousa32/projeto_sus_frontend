import { Permissions } from '../enums/permissions.enum';

export class PermissionsUtils {

  static isAdmin(permissions: Permissions[]) {
    return permissions.some((perm) => perm == Permissions.ADMIN);
  }

  static isDoctor(permissions: Permissions[]) {
    return permissions.some((perm) => perm == Permissions.DOCTOR);
  }

  static isPacient(permissions: Permissions[]) {
    return permissions.some((perm) => perm == Permissions.PACIENT);
  }
}
