import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstablishmentEntityInterface } from '../../interfaces/establishment-entity.interface';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { NgIf } from '@angular/common';
import { EstablishmentSearchService } from '../../service/establishment-search.service';
import Swal from 'sweetalert2';
import { EstablishmentSearchTableComponent } from '../establishment-searh-table/establishment-search-table.component';

@Component({
  selector: 'app-establishment-search',
  standalone: true,
  templateUrl: './establishment-search.component.html',
  imports: [ReactiveFormsModule, NgIf, ModalComponent, EstablishmentSearchTableComponent],
  providers: [EstablishmentSearchService],
})
export class EstablishmentSearchComponent implements OnInit {
  constructor(public service: EstablishmentSearchService) {}

  @Input()
  public isOpen: boolean = false;

  @Input()
  public title: string = 'Buscar Persona';

  @Output()
  public eventSelect = new EventEmitter<EstablishmentEntityInterface>();

  @Output()
  public eventNotFound = new EventEmitter<Error>();

  @Output()
  public eventClose = new EventEmitter();

  public establishments: EstablishmentEntityInterface[] = [];

  public searchForm = new FormGroup({
    column: new FormControl('name', Validators.required),
    value: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  onClose() {
    this.eventClose.emit();
  }

  onSubmit() {
    this.service
      .fetch({
        column: this.searchForm.value.column || 'name',
        value: this.searchForm.value.value || '',
      })
      .then((data) => {
        if (data.length == 0) throw new Error('No se encontrarón registros');
        this.establishments = data;
      })
      .catch(() => {
        this.establishments = [];
        this.messageNotFound();
      });
  }

  selectColumn(value: string | null) {
    this.searchForm.controls.column.setValue(value);
  }

  getLoading() {
    return this.service.getLoading();
  }

  messageNotFound() {
    Swal.fire({
      title: 'Error',
      text: 'No se encontró el registro',
      icon: 'error',
    });
  }
}
