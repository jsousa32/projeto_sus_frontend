import { environment } from './../../../environments/environment';

export class Routes {
  static url = environment.apiUrl + 'v1';

  static RoutesAuthentications = class {
    private static BASE = Routes.url + '/auth';
    public static LOGIN = this.BASE;
    public static EMAIL_CONFIRMATION = this.BASE + '/email-confirmation';
    public static FORGOT = this.BASE + '/forgot';
    public static RESET = this.BASE + '/reset';
  };

  static RoutesAppointments = class {
    private static BASE = Routes.url + '/appointments';
    public static SAVE = this.BASE;
    public static ALL_APPOINTMENTS = this.BASE + '/all';
    public static APPOINTMENT = this.BASE;
    public static AVALIABLE_TIMES = this.BASE + '/avaliable-times'
    public static UPDATE_APPOINTMENTS = this.BASE;
    public static DELETE_APPOINTMENTS = this.BASE;
  };

  static RoutesPacients = class {
    private static BASE = Routes.url + '/pacients';
    public static SAVE = this.BASE;
    public static SAVE_INTERNAL = this.BASE + '/internal';
    public static ALL_PACIENTS = this.BASE + '/all';
    public static ALL_PACIENTS_UNPAGED = this.BASE + '/unpaged';
    public static PACIENT = this.BASE;
    public static UPDATE_PACIENT = this.BASE;
    public static ACTIVE_PACIENT = this.BASE + '/active';
    public static ABSENT_PACIENT = this.BASE + '/absent';
    public static REMOVE_BLOCK = this.BASE + '/remove-block';
    public static DESACTIVE_PACIENT = this.BASE;
  };

  static RoutesDoctors = class {
    private static BASE = Routes.url + '/doctors';
    public static SAVE = this.BASE;
    public static ALL_DOCTORS = this.BASE + '/all';
    public static ALL_DOCTORS_UNPAGED = this.BASE + '/unpaged';
    public static DOCTOR = this.BASE;
    public static UPDATE_DOCTOR = this.BASE;
    public static ACTIVE_DOCTOR = this.BASE + '/active';
    public static DESACTIVE_DOCTOR = this.BASE;
  };

  static RoutesAdmins = class {
    private static BASE = Routes.url + '/admins';
    public static SAVE = this.BASE;
    public static ALL_ADMINS = this.BASE + '/all';
    public static ADMIN = this.BASE;
    public static UPDATE_ADMIN = this.BASE;
    public static DELETE_ADMIN = this.BASE;
  };
}
