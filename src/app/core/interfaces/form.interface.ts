import { MatFormFieldAppearance } from '@angular/material/form-field';

export interface FormInterface {
    appearance: MatFormFieldAppearance;
    placeholder: string;
    formControlName: string;
    required: boolean;
    errorMessage: string;
    label: string;
    icon?: boolean;
    type?: string;
    mask?: string;
    select?: boolean;
    optionsSelect?: SelectedOptions[];
}

interface SelectedOptions {
    value: string;
    viewValue: string;
}
