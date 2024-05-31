import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EstablishmentEntityInterface } from '../../interfaces/establishment-entity.interface';
import { establishmentTypeParseUtil } from '../../utils/establishment-type-parse.util';

@Component({
  selector: 'app-establishment-search-table',
  standalone: true,
  templateUrl: './establishment-search-table.component.html',
  imports: [NgFor],
})
export class EstablishmentSearchTableComponent {
  @Input()
  public data: EstablishmentEntityInterface[] = [];

  @Output()
  public eventSelect = new EventEmitter<EstablishmentEntityInterface>();

  typeParse(value: string) {
    const column = establishmentTypeParseUtil as any;
    return column[value];
  }
}
