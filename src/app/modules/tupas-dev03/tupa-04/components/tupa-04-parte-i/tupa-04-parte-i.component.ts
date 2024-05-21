import { Component } from '@angular/core';
import { SolicitanteAddModalComponent } from 'src/app/modules/shared/solicitante-add/components/solicitante-add-modal/solicitante-add.component';
import { SolicitanteModalComponent } from 'src/app/modules/shared/solicitante-search/components/solicitante-modal/solicitante-modal.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-tupa-04-parte-i',
  standalone: true,
  imports: [
    ButtonComponent,
    SolicitanteModalComponent,
    SolicitanteAddModalComponent
  ],
  templateUrl: './tupa-04-parte-i.component.html',
})
export class Tupa04ParteIComponent {

}
