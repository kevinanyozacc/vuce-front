import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TupaRequisitosTabInterface } from '../../interfaces/requisitos-tab.interface';

@Component({
  selector: 'app-requisitos-tab-item',
  templateUrl:'requisitos-tab-item.component.html',
  standalone: true,
  imports: [],
})
export class RequisitosTabItemComponent {
  @Input()
  item!: TupaRequisitosTabInterface;

  @Output() eventClick = new EventEmitter<TupaRequisitosTabInterface>();

  public onClick() {
    this.eventClick.emit(this.item);
  }
}
