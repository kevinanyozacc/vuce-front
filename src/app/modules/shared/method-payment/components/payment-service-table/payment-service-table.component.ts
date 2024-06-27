import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PaymentServiceEntityInterface } from '../../interfaces/payment-service-entity.interface';
import { TupaPayloadInterface } from '../../../tupa/interfaces/tupa-payload.interface';

@Component({
  selector: 'app-payment-service-table',
  standalone: true,
  templateUrl: './payment-service-table.component.html',
  imports: [NgFor, AngularSvgIconModule],
})
export class PaymentServiceTableComponent {
  @Input()
  public data: PaymentServiceEntityInterface[] = [];

  @Input()
  public total: number = 0;

  @Output()
  public eventDelete = new EventEmitter<TupaPayloadInterface<PaymentServiceEntityInterface>>();

  public onDelete(data: TupaPayloadInterface<PaymentServiceEntityInterface>) {
    this.eventDelete.emit(data);
  }
}
