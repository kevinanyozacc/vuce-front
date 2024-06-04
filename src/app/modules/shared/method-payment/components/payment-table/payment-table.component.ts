import { Component, Input } from '@angular/core';
import { PaymentEntityInterface } from '../../interfaces/payment-entity.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  templateUrl: './payment-table.component.html',
  imports: [NgFor],
})
export class PaymentTableComponent {
  @Input()
  public data: PaymentEntityInterface[] = [];
}
