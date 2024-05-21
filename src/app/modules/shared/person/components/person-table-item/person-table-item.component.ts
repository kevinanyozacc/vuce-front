import { Component, Input } from '@angular/core';
import { PersonEntityInterface } from '../../interfaces/person-entity.interface';

@Component({
  selector: '[app-person-table-item]',
  standalone: true,
  templateUrl: './person-table-item.component.html',
})
export class PersonTableItemComponent {
  @Input()
  public item!: PersonEntityInterface;
}
