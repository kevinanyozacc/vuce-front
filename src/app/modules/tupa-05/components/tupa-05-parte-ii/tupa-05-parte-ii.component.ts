import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EstablishmentSearchService } from 'src/app/modules/shared/establishment/service/establishment-search.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { EstablishmentSearchComponent } from '../../../shared/establishment/components/establishment-search/establishment-search.component';
import { EstablishmentCreateComponent } from '../../../shared/establishment/components/establishment-create/establishment-create.component';
import { EstablishmentEntityInterface } from 'src/app/modules/shared/establishment/interfaces/establishment-entity.interface';
import { NgIf } from '@angular/common';
import { EstablishmentTypeSelectComponent } from 'src/app/modules/shared/establishment/components/establishment-type-select/establishment-type-select.component';
import { PersonEntityInterface } from 'src/app/modules/shared/person/interfaces/person-entity.interface';
import { PersonSearchComponent } from 'src/app/modules/shared/person/components/person-search/person-search.component';
import { PersonCreateComponent } from 'src/app/modules/shared/person/components/person-create/person-create.component';

@Component({
  selector: 'app-tupa-05-parte-ii',
  templateUrl: './tupa-05-parte-ii.component.html',
  standalone: true,
  imports: [
    NgIf,
    ButtonComponent,
    ReactiveFormsModule,
    EstablishmentSearchComponent,
    EstablishmentCreateComponent,
    EstablishmentTypeSelectComponent,
    PersonSearchComponent,
    PersonCreateComponent,
  ],
  providers: [EstablishmentSearchService],
})
export class Tup05ParteIIComponent {
  @Input()
  public establishment?: EstablishmentEntityInterface | null;

  @Input()
  public technical?: PersonEntityInterface | null;

  @Output()
  public eventEstablishment = new EventEmitter<EstablishmentEntityInterface | undefined>();

  @Output()
  public eventTechnical = new EventEmitter<PersonEntityInterface | undefined>();

  public isCreateModal = false;
  public isSearchModal = false;
  public isPersonCreateModal = false;
  public isPersonSearchModal = false;

  createModalOpen() {
    this.isCreateModal = true;
  }

  createModalClose() {
    this.isCreateModal = false;
  }

  searchModalOpen() {
    this.isSearchModal = true;
  }

  searchModalClose() {
    this.isSearchModal = false;
  }

  createPersonModalOpen() {
    this.isPersonCreateModal = true;
  }

  createPersonModalClose() {
    this.isPersonCreateModal = false;
  }

  searchPersonModalOpen() {
    this.isPersonSearchModal = true;
  }

  searchPersonModalClose() {
    this.isPersonSearchModal = false;
  }

  onSaveEstablishment(establishment: EstablishmentEntityInterface) {
    this.eventEstablishment.emit(establishment);
    this.createModalClose();
  }

  onSelectEstablishment(establishment: EstablishmentEntityInterface) {
    this.eventEstablishment.emit(establishment);
    this.searchModalClose();
  }

  clearEstablishment() {
    this.eventEstablishment.emit(undefined);
  }

  onSaveTechnical(technical: PersonEntityInterface) {
    this.eventTechnical.emit(technical);
    this.createPersonModalClose();
  }

  onSelectTechnical(technical: PersonEntityInterface) {
    this.eventTechnical.emit(technical);
    this.searchPersonModalClose();
  }

  clearTechnical() {
    this.eventTechnical.emit(undefined);
  }
}
