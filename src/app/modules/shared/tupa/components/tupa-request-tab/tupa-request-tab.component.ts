import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentTypeSelectComponent } from 'src/app/modules/shared/document-type/components/document-type-select.component';
import { PersonCreateComponent } from 'src/app/modules/shared/person/components/person-create/person-create.component';
import { PersonRepresentanteSelectComponent } from 'src/app/modules/shared/person/components/person-representante-select/person-representante-select.component';
import { PersonSearchComponent } from 'src/app/modules/shared/person/components/person-search/person-search.component';
import { PersonEntityInterface } from 'src/app/modules/shared/person/interfaces/person-entity.interface';
import { RepresentanteEntityInterface } from 'src/app/modules/shared/person/interfaces/representante-entity.interface';
import { PersonSearchService } from 'src/app/modules/shared/person/services/person-search.service';
import { ButtonLoadingComponent } from 'src/app/shared/components/button-loading/button-loading.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TupaRequestService } from '../../services/tupa-request.service';

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
    DocumentTypeSelectComponent,
    PersonCreateComponent,
    PersonSearchComponent,
    PersonRepresentanteSelectComponent,
  ],
  providers: [PersonSearchService, TupaRequestService],
})
export class TupaRequestTabComponent implements OnInit {
  @Input()
  public requestService = inject(TupaRequestService);

  public person?: PersonEntityInterface;
  public representante?: RepresentanteEntityInterface;
  public personCreateModal = false;
  public personSearchModal = false;

  ngOnInit(): void {
    this.requestService.$getPerson().subscribe((data) => {
      this.person = data;
    });
    this.requestService.$getRepresentante().subscribe((data) => {
      this.representante = data;
    });
  }

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
    this.requestService.setPerson(person);
    this.personCreateModalClose();
  }

  onSelectPerson(person: PersonEntityInterface) {
    this.requestService.setPerson(person);
    this.personSearchModalClose();
  }
}
