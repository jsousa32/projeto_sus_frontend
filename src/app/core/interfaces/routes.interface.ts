import { UserRole } from "../enums/user-role.enum";

export interface RouterInterface {
    routerLink: string;
    userRole: UserRole;
    icon: string;
    label: string;
}
