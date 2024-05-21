import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tupa04TabInterface } from '../../interfaces/tupa-05-tab.interface';

@Component({
  selector: 'app-tupa-04-tab-item',
  standalone: true,
  imports: [],
  templateUrl: './tupa-04-tab-item.component.html',
  styleUrl: './tupa-04-tab-item.component.scss'
})
export class Tupa04TabItemComponent {
  @Input()
  item!: Tupa04TabInterface;

  @Output() eventClick = new EventEmitter<Tupa04TabInterface>();

  public onClick() {
    this.eventClick.emit(this.item);
  }
}
