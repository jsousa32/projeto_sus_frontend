import Swal from 'sweetalert2';

export class SwalertUtils {
  static swalertSuccessWithoutOptions(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#2857ab',
      iconColor: '#0C8E36',
    });
  }

  static swalertError(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#2857ab',
      iconColor: '#C23321',
    });
  }
}
