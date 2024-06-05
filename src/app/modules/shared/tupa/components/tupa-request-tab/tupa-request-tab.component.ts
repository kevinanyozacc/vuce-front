import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentTypeSelectComponent } from 'src/app/modules/shared/document-type/components/document-type-select.component';
import { PersonCreateComponent } from 'src/app/modules/shared/person/components/person-create/person-create.component';
import { PersonRepresentanteSelectComponent } from 'src/app/modules/shared/person/components/person-representante-select/person-representante-select.component';
import { PersonSearchComponent } from 'src/app/modules/shared/person/components/person-search/person-search.component';
import { PersonEntityInterface } from 'src/app/modules/shared/person/interfaces/person-entity.interface';
import { RepresentanteEntityInterface } from 'src/app/modules/shared/person/interfaces/representante-entity.interface';
import { PersonSearchService } from 'src/app/modules/shared/person/services/person-search.service';
import { SolicitanteAddModalComponent } from 'src/app/modules/shared/solicitante-add/components/solicitante-add-modal/solicitante-add.component';
import { SolicitanteModalComponent } from 'src/app/modules/shared/solicitante-search/components/solicitante-modal/solicitante-modal.component';
import { ButtonLoadingComponent } from 'src/app/shared/components/button-loading/button-loading.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-tupa-request-tab',
  templateUrl: './tupa-request-tab.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    ButtonComponent,
    LoadingComponent,
    ButtonLoadingComponent,
    SolicitanteModalComponent,
    SolicitanteAddModalComponent,
    DocumentTypeSelectComponent,
    PersonCreateComponent,
    PersonSearchComponent,
    PersonRepresentanteSelectComponent,
  ],
  providers: [PersonSearchService],
})
export class TupaRequestTabComponent {
  @Input()
  public person?: PersonEntityInterface | null;

  @Input()
  public representante?: RepresentanteEntityInterface | null;

  @Output()
  public eventPerson = new EventEmitter<PersonEntityInterface | undefined>();

  @Output()
  public eventRepresentante = new EventEmitter<RepresentanteEntityInterface | undefined>();

  public personCreateModal = false;
  public personSearchModal = false;

  personCreateModalOpen() {
    this.personCreateModal = true;
  }

  personCreateModalClose() {
    this.personCreateModal = false;
  }

  personSearchModalOpen() {
    this.personSearchModal = true;
  }

  personSearchModalClose() {
    this.personSearchModal = false;
  }

  onSavePerson(person: PersonEntityInterface) {
    this.eventPerson.emit(person);
    this.personCreateModalClose();
  }

  onSelectPerson(person: PersonEntityInterface) {
    this.eventPerson.emit(person);
    this.personSearchModalClose();
  }

  onSelectRepresentante(representante?: RepresentanteEntityInterface) {
    this.eventRepresentante.emit(representante);
  }

  clearPerson() {
    this.eventPerson.emit(undefined);
  }
}
