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
    this.editForm.controls.paymentTypeId.setValue(this.payment.paymentTypeId);
    this.editForm.controls.paymentTypeName.setValue(this.payment.paymentTypeName);
    this.editForm.controls.paymentBankId.setValue(this.payment.paymentBankId);
    this.editForm.controls.paymentBankName.setValue(this.payment.paymentBankName);
    this.editForm.controls.paymentAccountId.setValue(this.payment.paymentAccountId);
    this.editForm.controls.paymentAccountName.setValue(this.payment.paymentAccountName);
    this.editForm.controls.paymentNumber.setValue(this.payment.paymentNumber);
    this.editForm.controls.paymentDate.setValue(this.payment.paymentDate);
    this.editForm.controls.paymentAmount.setValue(this.payment.paymentAmount.toString());
  }

  onSubmit() {
    this.eventSave.emit({
      paymentTypeId: this.editForm.value.paymentTypeId || '',
      paymentTypeName: this.editForm.value.paymentTypeName || '',
      paymentBankId: this.editForm.value.paymentBankId || '',
      paymentBankName: this.editForm.value.paymentBankName || '',
      paymentAccountId: this.editForm.value.paymentAccountId || '',
      paymentAccountName: this.editForm.value.paymentAccountName || '',
      paymentNumber: this.editForm.value.paymentNumber || '',
      paymentDate: this.editForm.value.paymentDate || '',
      paymentAmount: parseFloat(this.editForm.value.paymentAmount || '0'),
    });
  }

  onClose() {
    this.eventClose.emit();
  }
}
