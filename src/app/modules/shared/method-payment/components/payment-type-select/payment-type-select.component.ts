import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentTypeListService } from '../../services/payment-type-list.service';
import { PaymentTypeEntityInterface } from '../../interfaces/payment-type-entity.interface';

@Component({
  selector: 'app-payment-type-select',
  standalone: true,
  templateUrl: './payment-type-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [PaymentTypeListService],
})
export class PaymentTypeSelectComponent implements OnInit {
  constructor(public service: PaymentTypeListService) {}

  @Input()
  public value?: string | null;

  @Input()
  public isDisabled?: boolean;

  @Output()
  public eventChange = new EventEmitter<string>();

  @Output()
  public eventData = new EventEmitter<PaymentTypeEntityInterface | undefined>();

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
