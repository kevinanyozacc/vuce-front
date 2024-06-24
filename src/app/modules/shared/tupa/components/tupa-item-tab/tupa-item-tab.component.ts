import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TupaItemTabInterface } from '../../interfaces/tupa-item-tab.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tupa-item-tab',
  templateUrl: './tupa-item-tab.component.html',
  standalone: true,
  imports: [NgIf],
})
export class TupaItemTabComponent {
  @Input()
  item!: TupaItemTabInterface;

  @Output() eventClick = new EventEmitter<TupaItemTabInterface>();

  public onClick() {
    this.eventClick.emit(this.item);
  }
}
