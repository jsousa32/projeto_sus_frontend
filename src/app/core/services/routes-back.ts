import { environment } from './../../../environments/environment';

export class Routes {

  static url = environment.apiUrl + '/v1'

  static RoutesAutentications = class {
    private static BASE = Routes.url + '/auth';
    private static LOGIN = this.BASE;
    private static EMAIL_CONFIRMATION = this.BASE + '/email-confirmation';
    private static FORGOT = this.BASE + '/forgot';
    private static RESET = this.BASE + '/reset';
  }

  static RoutesPacients = class {
    private static BASE = Routes.url + '/pacients';
    private static SAVE = this.BASE;
    private static ALL_PACIENTS = this.BASE + '/all';
    private static ALL_PACIENTS_UNPAGED = this.BASE + '/unpaged';
    private static PACIENT = this.BASE;
    private static UPDATE_PACIENT = this.BASE;
    private static ACTIVE_PACIENT = this.BASE + '/active';
    private static DESACTIVE_PACIENT = this.BASE;
  }

  static RoutesDoctors = class {
    private static BASE = Routes.url + '/doctors';
    private static SAVE = this.BASE;
    private static ALL_DOCTORS = this.BASE + '/all';
    private static ALL_DOCTORS_UNPAGED = this.BASE + '/unpaged';
    private static DOCTOR = this.BASE;
    private static UPDATE_DOCTOR = this.BASE;
    private static ACTIVE_DOCTOR = this.BASE + '/active';
    private static DESACTIVE_DOCTOR = this.BASE;
  }

  static RoutesAdmins = class {
    private static BASE = Routes.url + '/admins';
    private static SAVE = this.BASE;
    private static ALL_ADMINS = this.BASE + '/all';
    private static ADMIN = this.BASE;
    private static UPDATE_ADMIN = this.BASE;
    private static DELETE_ADMIN = this.BASE;
  }
}
