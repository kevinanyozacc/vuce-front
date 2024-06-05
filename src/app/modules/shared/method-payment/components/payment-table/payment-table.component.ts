import { Component, Input } from '@angular/core';
import { PaymentEntityInterface } from '../../interfaces/payment-entity.interface';
import { NgFor } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PaymentEditComponent } from '../payment-edit/payment-edit.component';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  templateUrl: './payment-table.component.html',
  imports: [NgFor, AngularSvgIconModule, PaymentEditComponent],
})
export class PaymentTableComponent {
  @Input()
  public data: PaymentEntityInterface[] = [];

  public isOpen = false;
  public payment?: PaymentEntityInterface;
  public index = 0;

  openEdit() {
    this.isOpen = true;
  }

  closeEdit() {
    this.isOpen = false;
  }

  deleteItem(index: number) {
    this.data = this.data.filter((_, iter) => iter !== index);
  }

  editItem(index: number, payment: PaymentEntityInterface) {
    this.index = index;
    this.payment = payment;
    this.openEdit();
  }

  editPayment(payment: PaymentEntityInterface) {
    this.data[this.index] = payment;
    this.closeEdit();
  }
}
