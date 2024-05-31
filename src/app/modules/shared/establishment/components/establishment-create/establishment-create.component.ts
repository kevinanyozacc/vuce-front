import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EstablishmentCreateService } from '../../service/establishment-create.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { EstablishmentEntityInterface } from '../../interfaces/establishment-entity.interface';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DepartamentoSelectComponent } from '../../../ubigeo/components/departamento-select/departamento-select.component';
import { ProvinciaSelectComponent } from '../../../ubigeo/components/provincia-select/provincia-select.component';
import { DistritoSelectComponent } from '../../../ubigeo/components/distrito-select/distrito-select.component';
import { JsonPipe, NgIf } from '@angular/common';
import { ButtonLoadingComponent } from 'src/app/shared/components/button-loading/button-loading.component';
import { EstablishmentTypeSelectComponent } from '../establishment-type-select/establishment-type-select.component';

@Component({
  selector: 'app-establishment-create',
  standalone: true,
  templateUrl: './establishment-create.component.html',
  imports: [
    NgIf,
    JsonPipe,
    ButtonLoadingComponent,
    ModalComponent,
    EstablishmentTypeSelectComponent,
    ReactiveFormsModule,
    DepartamentoSelectComponent,
    ProvinciaSelectComponent,
    DistritoSelectComponent,
  ],
  providers: [EstablishmentCreateService],
})
export class EstablishmentCreateComponent {
  constructor(public service: EstablishmentCreateService) {}

  @Input()
  public isOpen: boolean = false;

  @Input()
  public title: string = 'Registrar Establecimiento';

  @Output()
  public eventClose = new EventEmitter();

  @Output()
  public eventSave = new EventEmitter<EstablishmentEntityInterface>();

  public createForm = new FormGroup({
    type: new FormControl('O', Validators.required),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    ownerName: new FormControl('', Validators.required),
    ownerRuc: new FormControl('', Validators.required),
    departamentoId: new FormControl('01', Validators.required),
    provinciaId: new FormControl('01', Validators.required),
    distritoId: new FormControl('01', Validators.required),
  });

  initCreateForm() {
    this.createForm.controls.type.setValue('O');
    this.createForm.controls.departamentoId.setValue('01');
    this.createForm.controls.provinciaId.setValue('01');
    this.createForm.controls.distritoId.setValue('01');
  }

  selectType(value: string | null) {
    this.createForm.controls.type.setValue(value);
  }

  selectDepartamentoId(value: string | null) {
    this.createForm.controls.departamentoId.setValue(value);
    this.createForm.controls.provinciaId.setValue('01');
    this.createForm.controls.distritoId.setValue('01');
  }

  selectProvinciaId(value: string | null) {
    this.createForm.controls.provinciaId.setValue(value);
    this.createForm.controls.distritoId.setValue('01');
  }

  selectDistritoId(value: string | null) {
    this.createForm.controls.distritoId.setValue(value);
  }

  onClose() {
    this.eventClose.emit();
  }

  onSubmit() {
    this.service
      .createPerson(this.createForm.value as any)
      .then((data) => {
        Swal.fire({
          title: 'Success',
          text: 'Los datos se guardaron correctamente!!!',
          icon: 'success',
          confirmButtonText: 'Listo',
        });
        this.eventSave.emit(data);
        this.createForm.reset();
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error',
          text: err?.data.message || 'Algo salió mal',
          icon: 'error',
        });
      });
  }
}
