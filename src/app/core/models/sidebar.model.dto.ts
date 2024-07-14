import { Permissions } from "../enums/permissions.enum";

export interface Sidebar {
  label: string;
  icon: string;
  router: string;
  permissions: Permissions[];
}
