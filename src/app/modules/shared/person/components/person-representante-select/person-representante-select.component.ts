import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonRepresentanteListService } from '../../services/person-representante-list.service';

@Component({
  selector: 'app-person-representante-select',
  standalone: true,
  templateUrl: './person-representante-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [PersonRepresentanteListService],
})
export class PersonRepresentanteSelectComponent implements OnChanges {
  constructor(public service: PersonRepresentanteListService) {}

  @Input()
  public personId?: string | null;

  @Input()
  public value?: string | null;

  @Input()
  public isDisabled?: boolean;

  @Output()
  public eventChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['personId']) {
      const value = changes['personId'].currentValue;
      this.service.getApiList(value);
    }
  }

  onChange(event: any) {
    this.eventChange.emit(event.target.value || '');
  }
}
