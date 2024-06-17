import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AreaSelectComponent } from 'src/app/modules/shared/area/components/area-select.component';
import { PaymentCreateComponent } from 'src/app/modules/shared/method-payment/components/payment-create/payment-create.component';
import { PersonSearchComponent } from 'src/app/modules/shared/person/components/person-search/person-search.component';
import { PersonEntityInterface } from 'src/app/modules/shared/person/interfaces/person-entity.interface';
import { ProcedureSelectComponent } from 'src/app/modules/shared/procedure/components/procedure-select/procedure-select.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { PaymentEntityInterface } from 'src/app/modules/shared/method-payment/interfaces/payment-entity.interface';
import { SedeSelectComponent } from 'src/app/modules/shared/sede/components/sede-select/sede-select.component';
import { PaymentTableComponent } from '../../../method-payment/components/payment-table/payment-table.component';
import { ProcedureServiceSelectComponent } from '../../../procedure/components/procedure-service-select/procedure-service-select.component';
import { PaymentDataTableComponent } from '../../../method-payment/components/payment-data-table/payment-data-table.component';
import { PaymentDataEntityInterface } from '../../../method-payment/interfaces/payment-data-entity.interface';
import { ProcedureServiceEntityInterface } from '../../../procedure/interfaces/procedure-service-entity.interface';
import { ProcedureCalcTarifaService } from '../../../procedure/services/procedure-calc-tarifa.service';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tupa-payment-tab',
  templateUrl: './tupa-payment-tab.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    ButtonComponent,
    PaymentCreateComponent,
    PersonSearchComponent,
    ProcedureServiceSelectComponent,
    ProcedureSelectComponent,
    SedeSelectComponent,
    AreaSelectComponent,
    PaymentDataTableComponent,
    PaymentTableComponent,
  ],
  providers: [ProcedureCalcTarifaService],
})
export class TupaPaymentTabComponent {
  constructor(public service: ProcedureCalcTarifaService) {}

  @Input()
  public canSave = false;

  @Input()
  public person?: PersonEntityInterface;

  @Input()
  public payments: PaymentEntityInterface[] = [];

  @Input()
  public services: PaymentDataEntityInterface[] = [];

  @Output()
  public eventPerson = new EventEmitter<PersonEntityInterface>();

  @Output()
  public eventPaymentDelete = new EventEmitter<number>();

  @Output()
  public eventServiceDelete = new EventEmitter<PaymentDataEntityInterface>();

  @Output()
  public eventValidate = new EventEmitter<boolean>();

  @Output()
  public eventSave = new EventEmitter();

  public total = 0;
  public createForm = new FormGroup({
    sedeId: new FormControl('01', Validators.required),
    areaId: new FormControl('', Validators.required),
    procedureId: new FormControl('', Validators.required),
    serviceId: new FormControl('', Validators.required),
    serviceName: new FormControl('', Validators.required),
  });

  public isOpenPayment = false;
  public isOpenPerson = false;

  init() {
    this.createForm.controls.sedeId.setValue('');
    this.createForm.controls.areaId.setValue('');
    this.createForm.controls.procedureId.setValue('');
    this.createForm.controls.serviceId.setValue('');
    this.createForm.controls.serviceName.setValue('');
  }

  openPayment() {
    this.isOpenPayment = true;
  }

  closePayment() {
    this.isOpenPayment = false;
  }

  openPerson() {
    this.isOpenPerson = true;
  }

  closePerson() {
    this.isOpenPerson = false;
  }

  onPerson(person: PersonEntityInterface) {
    this.eventPerson.emit(person);
    this.closePerson();
  }

  onSede(value: string) {
    this.createForm.controls.sedeId.setValue(value || '');
  }

  onArea(value: string) {
    this.createForm.controls.areaId.setValue(value || '');
    this.createForm.controls.procedureId.setValue('');
    this.createForm.controls.serviceId.setValue('');
    this.createForm.controls.serviceName.setValue('');
  }

  onProcedure(value: string) {
    this.createForm.controls.procedureId.setValue(value || '');
    this.createForm.controls.serviceId.setValue('');
    this.createForm.controls.serviceName.setValue('');
  }

  onService(value?: ProcedureServiceEntityInterface) {
    this.createForm.controls.serviceId.setValue(value?.id || '');
    this.createForm.controls.serviceName.setValue(value?.name || '');
  }

  onAdd() {
    const { procedureId, serviceId } = this.createForm.value;
    if (!procedureId) return;
    if (!serviceId) return;
    // validar servicio
    const exists = this.services.find((item) => item.serviceId == serviceId);
    if (exists) {
      Swal.fire({
        title: 'Alerta',
        icon: 'warning',
        text: 'El servicio ya está agregado',
      });
    } else {
      // obtner tarifa
      this.service
        .getApiList({
          id: procedureId,
          serviceId,
          amount: 1,
        })
        .then((price) => {
          this.services.push(
            Object.assign(this.createForm.value, {
              amount: 1,
              price,
            } as any),
          );
          this.createForm.controls.serviceId.setValue('');
          this.total = this.calcTotal();
        })
        .catch((err) => {
          Swal.fire({
            title: 'Alerta',
            icon: 'warning',
            text: err?.response?.data?.message || 'Algo salió mal!!!',
          });
        });
    }
    // validate
    this.onValidate();
  }

  onDelete(item: PaymentDataEntityInterface) {
    this.services = this.services.filter((i) => i.serviceId != item.serviceId);
    this.total = this.calcTotal();
    this.eventServiceDelete.emit(item);
    this.onValidate();
  }

  onSave() {
    this.eventSave.emit();
  }

  calcTotal() {
    if (!this.services.length) return 0;
    const arraySubTotal: number[] = this.services.map((item) => item.amount * item.price);
    return arraySubTotal.reduce((prev, current) => prev + current);
  }

  addPayment(payment: PaymentEntityInterface) {
    this.payments.push(payment);
    this.closePayment();
    this.onValidate();
  }

  deletePaymen(index: number) {
    this.payments = this.payments.filter((_, iter) => iter != index);
    this.eventPaymentDelete.emit(index);
    this.onValidate();
  }

  onValidate() {
    const isPayment = this.payments.length > 0;
    const isService = this.services.length > 0;
    const isCan = isPayment && isService;
    this.eventValidate.emit(isCan);
  }
}
