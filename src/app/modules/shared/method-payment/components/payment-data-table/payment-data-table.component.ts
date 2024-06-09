import { Component, Input } from '@angular/core';
import { PaymentDataEntityInterface } from '../../interfaces/payment-data-entity.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-payment-data-table',
  standalone: true,
  templateUrl: './payment-data-table.component.html',
  imports: [NgFor],
})
export class PaymentDataTableComponent {
  @Input()
  public data: PaymentDataEntityInterface[] = [];

  @Input()
  public total = 0;
}
