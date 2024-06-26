import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
import Swal from 'sweetalert2';

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
export class PaymentCreateComponent implements OnInit, OnChanges {
  @Input()
  public title: string = 'Registrar Datos del Pago';

  @Input()
  public isOpen: boolean = false;

  @Input()
  public total: number = 0;

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
    this.createForm.controls.paymentBankId.valueChanges.subscribe(() => {
      this.createForm.controls.paymentAccountId.setValue('');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue === true) {
      this.createForm.controls.paymentAmount.setValue(this.total.toString());
    }
  }

  onSubmit() {
    const currentAmount = parseFloat(this.createForm.value.paymentAmount || '0');
    // validar total
    if (this.total > currentAmount) {
      Swal.fire({
        icon: 'warning',
        title: 'Alerta!!!',
        text: `El monto ingresado \ndebe ser mayor/igual a ${this.total.toFixed(2)}`,
      });
    } else {
      this.eventSave.emit({
        typeId: this.createForm.value.paymentTypeId || '',
        typeName: this.createForm.value.paymentTypeName || '',
        bankId: this.createForm.value.paymentBankId || '',
        bankName: this.createForm.value.paymentBankName || '',
        accountId: this.createForm.value.paymentAccountId || '',
        accountName: this.createForm.value.paymentAccountName || '',
        number: this.createForm.value.paymentNumber || '',
        date: this.createForm.value.paymentDate || '',
        amount: currentAmount,
      });
      this.createForm.reset();
    }
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
