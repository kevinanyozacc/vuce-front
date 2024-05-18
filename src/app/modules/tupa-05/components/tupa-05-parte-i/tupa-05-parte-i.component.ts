import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentTypeSelectComponent } from 'src/app/modules/shared/document-type/components/document-type-select.component';
import { PersonCreateComponent } from 'src/app/modules/shared/person/components/person-create/person-create.component';
import { PersonEntityInterface } from 'src/app/modules/shared/person/interfaces/person-entity.interface';
import { PersonSearchService } from 'src/app/modules/shared/person/services/person-search.service';
import { SolicitanteAddModalComponent } from 'src/app/modules/shared/solicitante-add/components/solicitante-add-modal/solicitante-add.component';
import { SolicitanteModalComponent } from 'src/app/modules/shared/solicitante-search/components/solicitante-modal/solicitante-modal.component';
import { ButtonLoadingComponent } from 'src/app/shared/components/button-loading/button-loading.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tupa-05-parte-i',
  templateUrl: './tupa-05-parte-i.component.html',
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
  ],
  providers: [PersonSearchService],
})
export class Tup05ParteIComponent implements OnInit, OnChanges {
  constructor(public personSearchService: PersonSearchService) {}

  @Input()
  public person?: PersonEntityInterface | null;

  @Output()
  public eventPerson = new EventEmitter<PersonEntityInterface | undefined>();

  public personCreateModal = false;

  public searchForm = new FormGroup({
    documentType: new FormControl('01', Validators.required),
    documentNumber: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.settingSearchPerson();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['person']) {
      this.settingSearchPerson();
    }
  }

  settingSearchPerson() {
    if (!this.person) return;
    this.searchForm.setValue({
      documentNumber: this.person.documentNumber,
      documentType: this.person.documentType,
    });
  }

  personCreateModalOpen() {
    this.personCreateModal = true;
  }

  personCreateModalClose() {
    this.personCreateModal = false;
  }

  searchPerson() {
    this.personSearchService
      .getApiData({
        documentNumber: this.searchForm.value.documentNumber || '',
        documentType: this.searchForm.value.documentType || '',
      })
      .then((data) => this.eventPerson.emit(data))
      .catch(() => {
        Swal.fire({
          title: 'Error',
          text: 'No se encontró el registro',
          icon: 'error',
          confirmButtonText: 'ok',
        });
        this.eventPerson.emit(undefined);
      });
  }

  onSavePerson(person: PersonEntityInterface) {
    this.eventPerson.emit(person);
    this.personCreateModalClose();
  }

  selectDocumentType(value: string | null) {
    this.searchForm.setControl('documentType', new FormControl(value, Validators.required));
  }

  clearPerson() {
    this.eventPerson.emit(undefined);
    this.searchForm.setControl('documentNumber', new FormControl('', Validators.required));
  }
}
