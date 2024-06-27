import { Component, EventEmitter, inject, Inject, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EstablishmentSearchService } from 'src/app/modules/shared/establishment/service/establishment-search.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { EstablishmentEntityInterface } from 'src/app/modules/shared/establishment/interfaces/establishment-entity.interface';
import { NgIf } from '@angular/common';
import { EstablishmentTypeSelectComponent } from 'src/app/modules/shared/establishment/components/establishment-type-select/establishment-type-select.component';
import { PersonEntityInterface } from 'src/app/modules/shared/person/interfaces/person-entity.interface';
import { PersonSearchComponent } from 'src/app/modules/shared/person/components/person-search/person-search.component';
import { PersonCreateComponent } from 'src/app/modules/shared/person/components/person-create/person-create.component';
import { EstablishmentSearchComponent } from '../../../establishment/components/establishment-search/establishment-search.component';
import { EstablishmentCreateComponent } from '../../../establishment/components/establishment-create/establishment-create.component';
import { TupaEstablishmentService } from '../../services/tupa-establishment.service';

@Component({
  selector: 'app-tupa-establishment-tab',
  templateUrl: './tupa-establishment-tab.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    ButtonComponent,
    EstablishmentTypeSelectComponent,
    PersonSearchComponent,
    PersonCreateComponent,
    EstablishmentSearchComponent,
    EstablishmentCreateComponent,
  ],
  providers: [EstablishmentSearchService],
})
export class TupaEstablishmentTabComponent implements OnInit {
  @Input()
  public establishmentService: TupaEstablishmentService = inject(TupaEstablishmentService);

  public establishment?: EstablishmentEntityInterface;
  public technical?: PersonEntityInterface;
  public isCreateModal = false;
  public isSearchModal = false;
  public isPersonCreateModal = false;
  public isPersonSearchModal = false;

  ngOnInit(): void {
    this.establishmentService.$getEstablishment().subscribe((data) => {
      this.establishment = data;
    });
    this.establishmentService.$getTechnical().subscribe((data) => {
      this.technical = data;
    });
  }

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
    this.establishmentService.setEstablishment(establishment);
    this.createModalClose();
  }

  onSelectEstablishment(establishment: EstablishmentEntityInterface) {
    this.establishmentService.setEstablishment(establishment);
    this.searchModalClose();
  }

  clearEstablishment() {
    this.establishmentService.setEstablishment(undefined);
  }

  onSaveTechnical(technical: PersonEntityInterface) {
    this.establishmentService.setTechnical(technical);
    this.createPersonModalClose();
  }

  onSelectTechnical(technical: PersonEntityInterface) {
    this.establishmentService.setTechnical(technical);
    this.searchPersonModalClose();
  }

  clearTechnical() {
    this.establishmentService.setTechnical(undefined);
  }
}
