import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AreaSelectComponent } from 'src/app/modules/shared/area/components/area-select.component';
import { PaymentCreateComponent } from 'src/app/modules/shared/method-payment/components/payment-create/payment-create.component';
import { PersonSearchComponent } from 'src/app/modules/shared/person/components/person-search/person-search.component';
import { PersonEntityInterface } from 'src/app/modules/shared/person/interfaces/person-entity.interface';
import { ProcedureSelectComponent } from 'src/app/modules/shared/procedure/components/procedure-select/procedure-select.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { PaymentTableComponent } from '../../../shared/method-payment/components/payment-table/payment-table.component';
import { PaymentEntityInterface } from 'src/app/modules/shared/method-payment/interfaces/payment-entity.interface';
import { SedeSelectComponent } from 'src/app/modules/shared/sede/components/sede-select/sede-select.component';

@Component({
  selector: 'app-tupa-05-parte-v',
  templateUrl: './tupa-05-parte-v.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    PaymentCreateComponent,
    PersonSearchComponent,
    ProcedureSelectComponent,
    SedeSelectComponent,
    AreaSelectComponent,
    PaymentTableComponent,
  ],
})
export class Tup05ParteVComponent {
  @Input()
  public person?: PersonEntityInterface;

  @Input()
  public payments: PaymentEntityInterface[] = [];

  public createForm = new FormGroup({
    sedeId: new FormControl('01', Validators.required),
    areaId: new FormControl('', Validators.required),
    procedureId: new FormControl('', Validators.required),
    service: new FormControl('', Validators.required),
  });

  public isOpenPayment = false;
  public isOpenPerson = false;

  init() {
    this.createForm.controls.sedeId.setValue('01');
    this.createForm.controls.areaId.setValue('');
    this.createForm.controls.procedureId.setValue('');
    this.createForm.controls.service.setValue('');
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

  onSede(value: string) {
    this.createForm.controls.sedeId.setValue(value);
  }

  onArea(value: string) {
    this.createForm.controls.areaId.setValue(value);
    this.createForm.controls.procedureId.setValue('');
  }

  onPerson(person: PersonEntityInterface) {
    this.person = person;
    this.closePerson();
  }

  onProcedure(value: string) {
    this.createForm.controls.procedureId.setValue(value);
  }

  onAdd() {
    this.init();
  }

  addPayment(payment: PaymentEntityInterface) {
    this.payments.push(payment);
    this.closePayment();
  }
}
