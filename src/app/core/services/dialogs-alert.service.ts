import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DialogsAlertService {

    private dialog = inject(MatDialog);

    openDialog(
        title: string,
        body: string,
        icon: SweetAlertIcon,
        hasConfirmButton: boolean
    ) {
        return from(
            Swal.fire({
                title: title,
                html: body,
                icon: icon,
                allowOutsideClick: false,
                showConfirmButton: true,
                showCancelButton: hasConfirmButton ? true : false,
                confirmButtonText: hasConfirmButton ? 'Sim' : 'Ok',
                cancelButtonText: 'Não',
                customClass: {
                    confirmButton: 'custom confirm-button',
                    cancelButton: 'custom cancel-button',
                    title: 'title',
                    htmlContainer: 'html',
                },
            }).then((value) => {
                return value.isConfirmed && hasConfirmButton ? true : false;
            })
        );
    }
}
