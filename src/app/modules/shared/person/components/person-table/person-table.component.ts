import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonEntityInterface } from '../../interfaces/person-entity.interface';
import { PersonTableItemComponent } from '../person-table-item/person-table-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-person-table',
  standalone: true,
  templateUrl: './person-table.component.html',
  imports: [NgFor, PersonTableItemComponent],
})
export class PersonTableComponent {
  @Input()
  public data: PersonEntityInterface[] = [];

  @Output()
  public eventSelect = new EventEmitter<PersonEntityInterface>();
}
