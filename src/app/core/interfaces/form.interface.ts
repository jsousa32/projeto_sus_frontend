import { MatFormFieldAppearance } from '@angular/material/form-field';

export interface FormInterface {
    appearance: MatFormFieldAppearance;
    placeholder: string;
    formControlName: string;
    required: boolean;
    errorMessage: string;
    label: string;
    type?: string;
    mask?: string;
}
