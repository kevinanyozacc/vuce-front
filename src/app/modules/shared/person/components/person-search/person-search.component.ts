import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { DocumentTypeSelectComponent } from '../../../document-type/components/document-type-select.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { PersonSearchService } from '../../services/person-search.service';
import { PersonSearchNamesService } from '../../services/person-search-names.service';
import { PersonEntityInterface } from '../../interfaces/person-entity.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-person-search',
  standalone: true,
  templateUrl: './person-search.component.html',
  imports: [ModalComponent, DocumentTypeSelectComponent, ReactiveFormsModule, NgIf],
  providers: [PersonSearchService, PersonSearchNamesService],
})
export class PersonSearchComponent implements OnInit {
  constructor(public serviceSearch: PersonSearchService, public serviceNames: PersonSearchNamesService) {}

  @Input()
  public isOpen: boolean = false;

  @Input()
  public title: string = 'Buscar Persona';

  @Output()
  public eventSelect = new EventEmitter<PersonEntityInterface>();

  @Output()
  public eventNotFound = new EventEmitter<Error>();

  @Output()
  public eventClose = new EventEmitter();

  public searchForm = new FormGroup({
    type: new FormControl('DOCUMENTO', Validators.required),
    documentType: new FormControl('01', Validators.required),
    documentNumber: new FormControl('', Validators.required),
    fullname: new FormControl(''),
  });

  ngOnInit(): void {
    this.searchForm.controls.type.valueChanges.subscribe((value) => {
      if (value === 'DOCUMENTO') {
        this.searchForm.controls.documentType.setValidators(Validators.required);
        this.searchForm.controls.documentNumber.setValidators(Validators.required);
        this.searchForm.setControl('fullname', new FormControl(''));
      } else if (value === 'NOMBRE') {
        this.searchForm.controls.fullname.setValidators(Validators.required);
        this.searchForm.setControl('documentType', new FormControl(''));
        this.searchForm.setControl('documentNumber', new FormControl(''));
      }
    });
  }

  onClose() {
    this.eventClose.emit();
  }

  onSubmit() {
    if (this.searchForm.value.type === 'DOCUMENTO') {
      const documentType = this.searchForm.get('documentType')?.value || '01';
      const documentNumber = this.searchForm.get('documentNumber')?.value || '';
      this.serviceSearch
        .getApiData({ documentType, documentNumber })
        .then((data) => this.eventSelect.emit(data))
        .catch((err) => {
          this.eventNotFound.emit(err);
          this.messageNotFound();
        });
    } else if (this.searchForm.value.type === 'NOMBRE') {
      const fullname = this.searchForm.get('fullname')?.value || '';
      this.serviceNames.getApiData(fullname).catch((err) => {
        this.eventNotFound.emit(err);
        this.messageNotFound();
      });
    }
  }

  selectDocumentType(value: string | null) {
    this.searchForm.controls.documentType.setValue(value);
  }

  getLoading() {
    return this.serviceSearch.getLoading() || this.serviceNames.getLoading();
  }

  messageNotFound() {
    Swal.fire({
      title: 'Error',
      text: 'No se encontró el registro',
      icon: 'error',
    });
  }

  messageSuccess() {
    Swal.fire({
      title: 'Success',
      text: 'Registro encontrado!!!',
      icon: 'success',
    });
  }
}
