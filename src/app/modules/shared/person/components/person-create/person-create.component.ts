import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { DocumentTypeSelectComponent } from '../../../document-type/components/document-type-select.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonCreateService } from '../../services/person-create.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { ButtonLoadingComponent } from 'src/app/shared/components/button-loading/button-loading.component';
import { PersonEntityInterface } from '../../interfaces/person-entity.interface';
import Swal from 'sweetalert2';
import { DepartamentoSelectComponent } from '../../../ubigeo/components/departamento-select/departamento-select.component';
import { ProvinciaSelectComponent } from '../../../ubigeo/components/provincia-select/provincia-select.component';
import { DistritoSelectComponent } from '../../../ubigeo/components/distrito-select/distrito-select.component';
import { PobladoSelectComponent } from '../../../ubigeo/components/poblado-select/poblado-select.component';
import { ReniecFindPersonByDniService } from '../../../reniec/service/reniect-find-person-by-dni.service';
import { ReniecFindPersonByRucService } from '../../../reniec/service/reniect-find-person-by-ruc.service';
import { ReniecPersonEntityInterface } from '../../../reniec/interfaces/reniec-person-entity.interface';

@Component({
  selector: 'app-person-create',
  standalone: true,
  templateUrl: './person-create.component.html',
  imports: [
    NgIf,
    ButtonLoadingComponent,
    ModalComponent,
    DocumentTypeSelectComponent,
    ReactiveFormsModule,
    HttpClientModule,
    DepartamentoSelectComponent,
    ProvinciaSelectComponent,
    DistritoSelectComponent,
    PobladoSelectComponent,
  ],
  providers: [PersonCreateService, ReniecFindPersonByDniService, ReniecFindPersonByRucService],
})
export class PersonCreateComponent implements OnInit {
  constructor(
    public service: PersonCreateService,
    public reniecDniService: ReniecFindPersonByDniService,
    public reniecRucService: ReniecFindPersonByRucService,
  ) {}

  @Input()
  public isOpen: boolean = false;

  @Output()
  public eventClose = new EventEmitter();

  @Output()
  public eventSave = new EventEmitter<PersonEntityInterface>();

  public validateType!: string;

  public createForm = new FormGroup({
    type: new FormControl('NATURAL', Validators.required),
    documentTypeId: new FormControl('01', Validators.required),
    documentNumber: new FormControl('', Validators.required),
    nombreRazonSocial: new FormControl('', Validators.required),
    ruc: new FormControl(''),
    names: new FormControl(''),
    lastName: new FormControl(''),
    secondaryName: new FormControl(''),
    departamentoId: new FormControl('01', Validators.required),
    provinciaId: new FormControl('01', Validators.required),
    distritoId: new FormControl('01', Validators.required),
    centroPobladoId: new FormControl(''),
    address: new FormControl(''),
    referen: new FormControl(''),
    email: new FormControl('', Validators.email),
    phone: new FormControl(''),
    cellphone: new FormControl(''),
    gender: new FormControl('1'),
  });

  ngOnInit(): void {
    this.createForm.controls.type.valueChanges.subscribe(() => {
      this.createForm.controls.names.setValue('');
      this.createForm.controls.lastName.setValue('');
      this.createForm.controls.secondaryName.setValue('');
    });

    this.createForm.controls.names.valueChanges.subscribe((value) => {
      const arrayData = [this.createForm.value.lastName || '', this.createForm.value.secondaryName || '', value || ''];
      const fullname = arrayData.join(' ');
      this.createForm.controls.nombreRazonSocial.setValue(fullname);
    });

    this.createForm.controls.lastName.valueChanges.subscribe((value) => {
      const arrayData = [value || '', this.createForm.value.secondaryName || '', this.createForm.value.names || ''];
      const fullname = arrayData.join(' ');
      this.createForm.controls.nombreRazonSocial.setValue(fullname);
    });

    this.createForm.controls.secondaryName.valueChanges.subscribe((value) => {
      const arrayData = [this.createForm.value.lastName || '', value || '', this.createForm.value.names || ''];
      const fullname = arrayData.join(' ');
      this.createForm.controls.nombreRazonSocial.setValue(fullname);
    });
  }

  initCreateForm() {
    this.createForm.controls.type.setValue('NATURAL');
    this.createForm.controls.documentTypeId.setValue('01');
    this.createForm.controls.gender.setValue('1');
    this.createForm.controls.departamentoId.setValue('01');
    this.createForm.controls.provinciaId.setValue('01');
    this.createForm.controls.distritoId.setValue('01');
  }

  selectValidateType(el: any) {
    this.validateType = el.target.value || undefined;
  }

  selectType(value: string | null) {
    this.createForm.controls.type.setValue(value);
  }

  selectDocumentType(value: string | null) {
    this.createForm.controls.documentTypeId.setValue(value);
  }

  selectDepartamentoId(value: string | null) {
    this.createForm.controls.departamentoId.setValue(value);
    this.createForm.controls.provinciaId.setValue('01');
    this.createForm.controls.distritoId.setValue('01');
    this.createForm.controls.centroPobladoId.setValue(null);
  }

  selectProvinciaId(value: string | null) {
    this.createForm.controls.provinciaId.setValue(value);
    this.createForm.controls.distritoId.setValue('01');
    this.createForm.controls.centroPobladoId.setValue(null);
  }

  selectDistritoId(value: string | null) {
    this.createForm.controls.distritoId.setValue(value);
    this.createForm.controls.centroPobladoId.setValue(null);
  }

  selectPobladoId(value: string | null) {
    this.createForm.controls.centroPobladoId.setValue(value);
  }

  settingPerson(data: ReniecPersonEntityInterface) {
    this.createForm.controls.type.setValue(data.personaTipo || 'NATURAL');
    this.createForm.controls.lastName.setValue(data.apellidoPaterno);
    this.createForm.controls.names.setValue(data.nombres);
    this.createForm.controls.secondaryName.setValue(data.apellidoMaterno);
    this.createForm.controls.ruc.setValue(data.ruc);
    this.createForm.controls.email.setValue(data.correoElectronico);
    this.createForm.controls.address.setValue(data.direccion);
    this.createForm.controls.documentTypeId.setValue(data.documentoTipo || '01');
    this.createForm.controls.documentNumber.setValue(data.documentoNumero);
    this.createForm.controls.nombreRazonSocial.setValue(data.nombreRazonSocial);
    this.createForm.controls.referen.setValue(data.referenciaDireccion);
    this.createForm.controls.phone.setValue(data.telefono);
    this.createForm.controls.cellphone.setValue(data.telefonoMovil);
    this.createForm.controls.departamentoId.setValue(data.departamentoId);
    this.createForm.controls.provinciaId.setValue(data.provinciaId);
    this.createForm.controls.distritoId.setValue(data.distritoId);
  }

  onClose() {
    this.eventClose.emit();
  }

  onValidate() {
    // validar document number
    if (!this.createForm.value.documentNumber) return;
    // validar type
    if (this.validateType === 'DNI') {
      this.reniecDniService.execute(this.createForm.value.documentNumber).then((data) => this.settingPerson(data));
    } else if (this.validateType === 'RUC') {
      this.reniecRucService.execute(this.createForm.value.documentNumber).then((data) => this.settingPerson(data));
    }
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
        this.initCreateForm();
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
