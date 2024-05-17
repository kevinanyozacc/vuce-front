import { Component } from '@angular/core';
import { DocumentTypeSelectComponent } from 'src/app/modules/shared/document-type/components/document-type-select.component';
import { SolicitanteAddModalComponent } from 'src/app/modules/shared/solicitante-add/components/solicitante-add-modal/solicitante-add.component';
import { SolicitanteModalComponent } from 'src/app/modules/shared/solicitante-search/components/solicitante-modal/solicitante-modal.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-tupa-05-parte-i',
  templateUrl: './tupa-05-parte-i.component.html',
  standalone: true,
  imports: [ButtonComponent, SolicitanteModalComponent, SolicitanteAddModalComponent, DocumentTypeSelectComponent],
})
export class Tup05ParteIComponent {}
