import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentAccountListService } from '../../services/payment-account-list.service';
import { PaymentAccountEntityInterface } from '../../interfaces/payment-account-entity.interface';

@Component({
  selector: 'app-payment-account-select',
  standalone: true,
  templateUrl: './payment-account-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [PaymentAccountListService],
})
export class PaymentAccountSelectComponent implements OnChanges {
  constructor(public service: PaymentAccountListService) {}

  @Input()
  public value?: string | null;

  @Input()
  public isDisabled?: boolean;

  @Input()
  public bankId?: string | null;

  @Output()
  public eventChange = new EventEmitter<string>();

  @Output()
  public eventData = new EventEmitter<PaymentAccountEntityInterface | undefined>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['bankId']?.currentValue) {
      const value = changes['bankId'].currentValue;
      this.service.getApiList(value);
    }
  }

  onChange(event: any) {
    const value = event.target.value || '';
    const object = this.service.getData().find((item) => item.id == value);
    this.eventChange.emit(value);
    this.eventData.emit(object);
  }
}
