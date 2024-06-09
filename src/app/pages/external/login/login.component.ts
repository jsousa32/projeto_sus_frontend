import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { InputTextComponent } from '../../../shared/inputs/input-text/input-text.component';
import { InputsComponent } from '../../../shared/inputs/inputs.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CarouselComponent, RouterLink, InputTextModule, ReactiveFormsModule, ButtonsComponent, PasswordModule, InputsComponent, InputTextComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  protected formsLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  salvar() {
    console.log(this.formsLogin)
  }
}
