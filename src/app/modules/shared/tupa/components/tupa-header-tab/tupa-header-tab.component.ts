import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { TupaItemTabComponent } from '../tupa-item-tab/tupa-item-tab.component';
import { TupaItemTabInterface } from '../../interfaces/tupa-item-tab.interface';

@Component({
  selector: 'app-tupa-header-tab',
  templateUrl: './tupa-header-tab.component.html',
  standalone: true,
  imports: [TupaItemTabComponent, NgFor],
})
export class TupaHeaderTabComponent {
  @Input() tabs: TupaItemTabInterface[] = [];

  @Output() eventSelected = new EventEmitter<TupaItemTabInterface>();

  onSelected(item: TupaItemTabInterface) {
    this.eventSelected.emit(item);
  }
}
