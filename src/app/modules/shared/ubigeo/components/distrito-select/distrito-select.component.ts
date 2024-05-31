import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DistritoListService } from '../../services/distrito-list.service';

@Component({
  selector: 'app-distrito-select',
  standalone: true,
  templateUrl: './distrito-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [DistritoListService],
})
export class DistritoSelectComponent implements OnChanges {
  constructor(public service: DistritoListService) {}

  @Input()
  public departamentoId?: string | null;

  @Input()
  public provinciaId?: string | null;

  @Input()
  public value?: string | null;

  @Input()
  public isDisabled?: boolean;

  @Output()
  public eventChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['departamentoId'] && !!changes['provinciaId']) {
      const provinciaId = changes['provinciaId'].currentValue;
      const departamentoId = changes['departamentoId'].currentValue;
      this.service.getApiList(departamentoId, provinciaId);
    } else if (!!changes['departamentoId'] && !!this.provinciaId) {
      const departamentoId = changes['departamentoId'].currentValue;
      this.service.getApiList(departamentoId, this.provinciaId);
    } else if (!!changes['provinciaId'] && !!this.departamentoId) {
      const provinciaId = changes['provinciaId'].currentValue;
      this.service.getApiList(this.departamentoId, provinciaId);
    }
  }

  onChange(event: any) {
    this.eventChange.emit(event.target.value || '');
  }
}
