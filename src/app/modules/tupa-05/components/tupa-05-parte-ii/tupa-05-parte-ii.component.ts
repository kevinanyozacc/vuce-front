import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EstablishmentSearchService } from 'src/app/modules/shared/establishment/service/establishment-search.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { EstablishmentSearchComponent } from '../../../shared/establishment/components/establishment-search/establishment-search.component';
import { EstablishmentCreateComponent } from '../../../shared/establishment/components/establishment-create/establishment-create.component';
import { EstablishmentEntityInterface } from 'src/app/modules/shared/establishment/interfaces/establishment-entity.interface';
import { NgIf } from '@angular/common';
import { EstablishmentTypeSelectComponent } from 'src/app/modules/shared/establishment/components/establishment-type-select/establishment-type-select.component';

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
  ],
  providers: [EstablishmentSearchService],
})
export class Tup05ParteIIComponent {
  @Input()
  public establishment?: EstablishmentEntityInterface | null;

  @Output()
  public eventEstablishment = new EventEmitter<EstablishmentEntityInterface | undefined>();

  public isCreateModal = false;
  public isSearchModal = false;

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
}
