import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { PaymentTypeSelectComponent } from '../payment-type-select/payment-type-select.component';
import { PaymentBankSelectComponent } from '../payment-bank-select/payment-bank-select.component';
import { PaymentAccountSelectComponent } from '../payment-account-select/payment-account-select.component';
import { ButtonLoadingComponent } from 'src/app/shared/components/button-loading/button-loading.component';
import { NgIf } from '@angular/common';
import { PaymentEntityInterface } from '../../interfaces/payment-entity.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentTypeEntityInterface } from '../../interfaces/payment-type-entity.interface';
import { PaymentBankEntityInterface } from '../../interfaces/payment-bank-entity.interface';
import { PaymentAccountEntityInterface } from '../../interfaces/payment-account-entity.interface';

@Component({
  selector: 'app-payment-create',
  standalone: true,
  templateUrl: './payment-create.component.html',
  imports: [
    NgIf,
    ReactiveFormsModule,
    ModalComponent,
    ButtonLoadingComponent,
    PaymentTypeSelectComponent,
    PaymentBankSelectComponent,
    PaymentAccountSelectComponent,
  ],
})
export class PaymentCreateComponent implements OnInit {
  @Input()
  public title: string = 'Registrar Datos del Pago';

  @Input()
  public isOpen: boolean = false;

  @Output()
  public eventClose = new EventEmitter();

  @Output()
  public eventSave = new EventEmitter<PaymentEntityInterface>();

  public createForm = new FormGroup({
    paymentTypeId: new FormControl('', Validators.required),
    paymentTypeName: new FormControl('', Validators.required),
    paymentBankId: new FormControl('', Validators.required),
    paymentBankName: new FormControl('', Validators.required),
    paymentAccountId: new FormControl('', Validators.required),
    paymentAccountName: new FormControl('', Validators.required),
    paymentNumber: new FormControl('', Validators.required),
    paymentDate: new FormControl('', Validators.required),
    paymentAmount: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.createForm.controls.paymentBankId.valueChanges.subscribe((value) => {
      this.createForm.controls.paymentAccountId.setValue('');
    });
  }

  onSubmit() {
    this.eventSave.emit({
      paymentTypeId: this.createForm.value.paymentTypeId || '',
      paymentTypeName: this.createForm.value.paymentTypeName || '',
      paymentBankId: this.createForm.value.paymentBankId || '',
      paymentBankName: this.createForm.value.paymentBankName || '',
      paymentAccountId: this.createForm.value.paymentAccountId || '',
      paymentAccountName: this.createForm.value.paymentAccountName || '',
      paymentNumber: this.createForm.value.paymentNumber || '',
      paymentDate: this.createForm.value.paymentDate || '',
      paymentAmount: parseFloat(this.createForm.value.paymentAmount || '0'),
    });
    this.createForm.reset();
  }

  onClose() {
    this.eventClose.emit();
  }

  onPaymentType(obj?: PaymentTypeEntityInterface) {
    this.createForm.controls.paymentTypeId.setValue(obj?.id || '');
    this.createForm.controls.paymentTypeName.setValue(obj?.name || '');
  }

  onPaymentBank(obj?: PaymentBankEntityInterface) {
    this.createForm.controls.paymentBankId.setValue(obj?.id || '');
    this.createForm.controls.paymentBankName.setValue(obj?.name || '');
  }

  onPaymentAccount(obj?: PaymentAccountEntityInterface) {
    this.createForm.controls.paymentAccountId.setValue(obj?.id || '');
    this.createForm.controls.paymentAccountName.setValue(obj?.number || '');
  }
}
