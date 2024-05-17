import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentTypeSelectComponent } from 'src/app/modules/shared/document-type/components/document-type-select.component';
import { PersonSearchInterface } from 'src/app/modules/shared/person/interfaces/person-search.interface';
import { PersonSearchService } from 'src/app/modules/shared/person/services/person-search.service';
import { SolicitanteAddModalComponent } from 'src/app/modules/shared/solicitante-add/components/solicitante-add-modal/solicitante-add.component';
import { SolicitanteModalComponent } from 'src/app/modules/shared/solicitante-search/components/solicitante-modal/solicitante-modal.component';
import { ButtonLoadingComponent } from 'src/app/shared/components/button-loading/button-loading.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

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
  ],
  providers: [PersonSearchService],
})
export class Tup05ParteIComponent {
  constructor(public personSearchService: PersonSearchService) {}

  public searchForm = new FormGroup({
    documentType: new FormControl('01', Validators.required),
    documentNumber: new FormControl('', Validators.required),
  });

  searchPerson() {
    this.personSearchService.getApiData({
      documentNumber: this.searchForm.value.documentNumber || '',
      documentType: this.searchForm.value.documentType || '',
    });
  }

  selectDocumentType(value: string | null) {
    this.searchForm.setControl('documentType', new FormControl(value, Validators.required));
  }

  clearPerson() {
    this.personSearchService.clearData();
    this.searchForm.setControl('documentNumber', new FormControl('', Validators.required));
  }
}
