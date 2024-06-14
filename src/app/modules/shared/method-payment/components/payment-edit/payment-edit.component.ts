import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { PaymentTypeSelectComponent } from '../payment-type-select/payment-type-select.component';
import { PaymentBankSelectComponent } from '../payment-bank-select/payment-bank-select.component';
import { PaymentAccountSelectComponent } from '../payment-account-select/payment-account-select.component';
import { ButtonLoadingComponent } from 'src/app/shared/components/button-loading/button-loading.component';
import { NgIf } from '@angular/common';
import { PaymentEntityInterface } from '../../interfaces/payment-entity.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-edit',
  standalone: true,
  templateUrl: './payment-edit.component.html',
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
export class PaymentEditComponent implements OnChanges {
  @Input()
  public title: string = 'Editar Datos del Pago';

  @Input()
  public payment?: PaymentEntityInterface;

  @Input()
  public isOpen: boolean = false;

  @Output()
  public eventClose = new EventEmitter();

  @Output()
  public eventSave = new EventEmitter<PaymentEntityInterface>();

  public editForm = new FormGroup({
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

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['payment']?.currentValue) {
      this.init();
    }
  }

  init() {
    if (!this.payment) return;
    this.editForm.controls.paymentTypeId.setValue(this.payment.typeId);
    this.editForm.controls.paymentTypeName.setValue(this.payment.typeName);
    this.editForm.controls.paymentBankId.setValue(this.payment.bankId);
    this.editForm.controls.paymentBankName.setValue(this.payment.bankName);
    this.editForm.controls.paymentAccountId.setValue(this.payment.accountId);
    this.editForm.controls.paymentAccountName.setValue(this.payment.accountName);
    this.editForm.controls.paymentNumber.setValue(this.payment.number);
    this.editForm.controls.paymentDate.setValue(this.payment.date);
    this.editForm.controls.paymentAmount.setValue(this.payment.amount.toString());
  }

  onSubmit() {
    this.eventSave.emit({
      typeId: this.editForm.value.paymentTypeId || '',
      typeName: this.editForm.value.paymentTypeName || '',
      bankId: this.editForm.value.paymentBankId || '',
      bankName: this.editForm.value.paymentBankName || '',
      accountId: this.editForm.value.paymentAccountId || '',
      accountName: this.editForm.value.paymentAccountName || '',
      number: this.editForm.value.paymentNumber || '',
      date: this.editForm.value.paymentDate || '',
      amount: parseFloat(this.editForm.value.paymentAmount || '0'),
    });
  }

  onClose() {
    this.eventClose.emit();
  }
}
