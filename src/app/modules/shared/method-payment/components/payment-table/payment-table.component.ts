import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentEntityInterface } from '../../interfaces/payment-entity.interface';
import { NgFor } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PaymentEditComponent } from '../payment-edit/payment-edit.component';
import { TupaPayloadInterface } from '../../../tupa/interfaces/tupa-payload.interface';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  templateUrl: './payment-table.component.html',
  imports: [NgFor, AngularSvgIconModule, PaymentEditComponent],
})
export class PaymentTableComponent {
  @Input()
  public data: PaymentEntityInterface[] = [];

  @Input()
  public total: number = 0;

  @Output()
  public eventDelete = new EventEmitter<TupaPayloadInterface<PaymentEntityInterface>>();

  @Output()
  public eventEdit = new EventEmitter<TupaPayloadInterface<PaymentEntityInterface>>();

  public isOpen = false;
  public payment!: PaymentEntityInterface;
  public index = 0;

  openEdit({ payload, row }: TupaPayloadInterface<PaymentEntityInterface>) {
    this.isOpen = true;
    this.payment = payload;
    this.index = row;
  }

  closeEdit() {
    this.isOpen = false;
  }

  deleteItem(data: TupaPayloadInterface<PaymentEntityInterface>) {
    this.eventDelete.emit(data);
  }

  editItem(payload: PaymentEntityInterface) {
    this.eventEdit.emit({ payload, row: this.index });
    this.closeEdit();
  }
}
