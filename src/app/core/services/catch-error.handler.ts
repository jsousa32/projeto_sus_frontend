import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { SwalertUtils } from '../utils/swalert.utils';

export class CatchErrorHandler {
  static err(err: HttpErrorResponse) {
    err.error != null
      ? SwalertUtils.swalertError('Error', err.error.message)
      : SwalertUtils.swalertError('Error', 'Algo inesperado aconteceu.');

    return EMPTY;
  }
}
