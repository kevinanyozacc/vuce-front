import { Component } from '@angular/core';
import { SolicitanteModalComponent } from 'src/app/modules/shared/solicitante-search/components/solicitante-modal/solicitante-modal.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-tupa-05-parte-i',
  templateUrl: './tupa-05-parte-i.component.html',
  standalone: true,
  imports: [
    ButtonComponent,
    SolicitanteModalComponent
  ],
})
export class Tup05ParteIComponent {}
