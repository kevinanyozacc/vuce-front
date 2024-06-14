import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentDataEntityInterface } from '../../interfaces/payment-data-entity.interface';
import { NgFor } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-payment-data-table',
  standalone: true,
  templateUrl: './payment-data-table.component.html',
  imports: [NgFor, AngularSvgIconModule],
})
export class PaymentDataTableComponent {
  @Input()
  public data: PaymentDataEntityInterface[] = [];

  @Input()
  public total = 0;

  @Output()
  public eventDelete = new EventEmitter<PaymentDataEntityInterface>();

  onDelete(item: PaymentDataEntityInterface) {
    this.eventDelete.emit(item);
  }
}
