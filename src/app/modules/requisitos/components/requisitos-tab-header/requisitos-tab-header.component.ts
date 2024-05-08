import { NgFor } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TupaRequisitosTabInterface } from '../../interfaces/requisitos-tab.interface';
import { RequisitosTabItemComponent } from '../requisitos-tab-item/requisitos-tab-item.component';

@Component({
  selector: 'app-requisitos-tab-header',
  standalone: true,
  imports: [NgFor,RequisitosTabItemComponent],
  templateUrl: './requisitos-tab-header.component.html',
})
export class RequisitosTabHeaderComponent {
  @Input() tabs: TupaRequisitosTabInterface[] = [];

  @Output() eventSelected = new EventEmitter<TupaRequisitosTabInterface>();

  onSelected(item: TupaRequisitosTabInterface){
    this.eventSelected.emit(item)
  }
}
