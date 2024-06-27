import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AreaSelectComponent } from 'src/app/modules/shared/area/components/area-select.component';
import { PaymentCreateComponent } from 'src/app/modules/shared/method-payment/components/payment-create/payment-create.component';
import { PersonSearchComponent } from 'src/app/modules/shared/person/components/person-search/person-search.component';
import { PersonEntityInterface } from 'src/app/modules/shared/person/interfaces/person-entity.interface';
import { ProcedureSelectComponent } from 'src/app/modules/shared/procedure/components/procedure-select/procedure-select.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { SedeSelectComponent } from 'src/app/modules/shared/sede/components/sede-select/sede-select.component';
import { PaymentTableComponent } from '../../../method-payment/components/payment-table/payment-table.component';
import { ProcedureServiceSelectComponent } from '../../../procedure/components/procedure-service-select/procedure-service-select.component';
import { PaymentServiceTableComponent } from '../../../method-payment/components/payment-service-table/payment-service-table.component';
import { ProcedureServiceEntityInterface } from '../../../procedure/interfaces/procedure-service-entity.interface';
import { NgIf } from '@angular/common';
import { TupaPaymentService } from '../../services/tupa-payment.service';
import { ProcedureInfoInterface } from '../../../procedure/interfaces/procedure-info.interface';
import { PaymentServiceEntityInterface } from '../../../method-payment/interfaces/payment-service-entity.interface';
import { PaymentEntityInterface } from '../../../method-payment/interfaces/payment-entity.interface';
import { AuthProfileService } from 'src/app/core/auth/services/auth-profile.service';
import { SedeEntityInterface } from '../../../sede/interfaces/sede-entity.interface';

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
    PaymentServiceTableComponent,
    PaymentTableComponent,
  ],
  providers: [TupaPaymentService],
})
export class TupaPaymentTabComponent implements OnInit {
  @Input()
  public paymentService: TupaPaymentService = inject(TupaPaymentService);

  public profileService = inject(AuthProfileService);
  public sede?: SedeEntityInterface;
  public procedureInfo?: ProcedureInfoInterface;
  public personPayment?: PersonEntityInterface;
  public createForm = new FormGroup({
    sedeId: new FormControl('01', Validators.required),
    serviceId: new FormControl('', Validators.required),
    serviceName: new FormControl('', Validators.required),
  });

  public isOpenPayment = false;
  public isOpenPerson = false;

  ngOnInit(): void {
    this.paymentService.$getSede().subscribe((data) => {
      this.sede = data;
    });

    this.paymentService.$getProcedureInfo().subscribe((data) => {
      this.procedureInfo = data;
    });

    this.paymentService.$getPersonPayment().subscribe((data) => {
      this.personPayment = data;
    });
  }

  init() {
    this.createForm.controls.sedeId.setValue('');
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
    this.paymentService.setPersonPayment(person);
    this.closePerson();
  }

  onService(value?: ProcedureServiceEntityInterface) {
    this.createForm.controls.serviceId.setValue(value?.id || '');
    this.createForm.controls.serviceName.setValue(value?.name || '');
  }

  addService() {
    const payload = Object.assign({ ...this.procedureInfo }, this.createForm.value);
    this.paymentService.addService(payload as PaymentServiceEntityInterface);
  }

  addPayment(payload: PaymentEntityInterface) {
    this.paymentService.addPayment(payload);
    this.closePayment();
  }

  editPayment() {}
}
