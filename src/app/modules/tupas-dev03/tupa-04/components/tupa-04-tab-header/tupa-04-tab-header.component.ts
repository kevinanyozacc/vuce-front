import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tupa04TabInterface } from '../../interfaces/tupa-05-tab.interface';
import { Tupa04TabItemComponent } from '../tupa-04-tab-item/tupa-04-tab-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tupa-04-tab-header',
  standalone: true,
  imports: [
    Tupa04TabItemComponent,
    NgFor
  ],
  templateUrl: './tupa-04-tab-header.component.html',
})
export class Tupa04TabHeaderComponent {
  @Input() tabs: Tupa04TabInterface[] = [];

  @Output() eventSelected = new EventEmitter<Tupa04TabInterface>();

  onSelected(item: Tupa04TabInterface) {
    this.eventSelected.emit(item);
  }
}
