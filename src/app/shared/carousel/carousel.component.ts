import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Carousel } from '../../core/models/carousel.model.dto';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  protected carouselData: Carousel[] = [
    {
      title: 'Cadastramento de Consultas',
      pathImg: './../../../assets/img/logo.png',
      description: 'Agora ficou muito mais fácil cadastrar as suas consultas.',
    },
    {
      title: 'Disponibilidade de Medicamentos',
      pathImg: './../../../assets/img/logo.png',
      description: 'Através da plataforma você poderá consultar quais medicamentos estão disponíveis na UBS.',
    },
    {
      title: 'Disponibilidade de Médicos',
      pathImg: './../../../assets/img/logo.png',
      description: 'Você poderá ver quais médicos a UBS possui e seus horários de atendimento.',
    },
  ];
}
