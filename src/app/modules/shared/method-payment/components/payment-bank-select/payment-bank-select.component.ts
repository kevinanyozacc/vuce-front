import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentBankListService } from '../../services/payment-bank-list.service';
import { PaymentBankEntityInterface } from '../../interfaces/payment-bank-entity.interface';

@Component({
  selector: 'app-payment-bank-select',
  standalone: true,
  templateUrl: './payment-bank-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [PaymentBankListService],
})
export class PaymentBankSelectComponent implements OnInit {
  constructor(public service: PaymentBankListService) {}

  @Input()
  public value?: string | null;

  @Input()
  public isDisabled?: boolean;

  @Output()
  public eventChange = new EventEmitter<string>();

  @Output()
  public eventData = new EventEmitter<PaymentBankEntityInterface | undefined>();

  ngOnInit(): void {
    this.service.getApiList();
  }

  onChange(event: any) {
    const value = event.target.value || '';
    const object = this.service.getData().find((item) => item.id == value);
    this.eventChange.emit(value);
    this.eventData.emit(object);
  }
}
