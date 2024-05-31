import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProvinciaListService } from '../../services/provincia-list.service';

@Component({
  selector: 'app-provincia-select',
  standalone: true,
  templateUrl: './province-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [ProvinciaListService],
})
export class ProvinciaSelectComponent implements OnChanges {
  constructor(public service: ProvinciaListService) {}

  @Input()
  public departamentoId?: string | null;

  @Input()
  public value?: string | null;

  @Input()
  public isDisabled?: boolean;

  @Output()
  public eventChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['departamentoId']) {
      const value = changes['departamentoId'].currentValue;
      this.service.getApiList(value);
    }
  }

  onChange(event: any) {
    this.eventChange.emit(event.target.value || '');
  }
}
