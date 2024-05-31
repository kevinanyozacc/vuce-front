import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PobladoListService } from '../../services/poblado-list.service';

@Component({
  selector: 'app-poblado-select',
  standalone: true,
  templateUrl: './poblado-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [PobladoListService],
})
export class PobladoSelectComponent implements OnChanges {
  constructor(public service: PobladoListService) {}

  @Input()
  public departamentoId?: string | null;

  @Input()
  public provinciaId?: string | null;

  @Input()
  public distritoId?: string | null;

  @Input()
  public value?: string | null;

  @Input()
  public isDisabled?: boolean;

  @Output()
  public eventChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['departamentoId'] && !!changes['provinciaId'] && !!changes['distritoId']) {
      const provinciaId = changes['provinciaId'].currentValue;
      const departamentoId = changes['departamentoId'].currentValue;
      const distritoId = changes['distritoId'].currentValue;
      this.service.getApiList(departamentoId, provinciaId, distritoId);
    } else if (!!changes['departamentoId'] && !!changes['provinciaId'] && !!this.distritoId) {
      const provinciaId = changes['provinciaId'].currentValue;
      const departamentoId = changes['departamentoId'].currentValue;
      this.service.getApiList(departamentoId, provinciaId, this.distritoId);
    } else if (!!changes['departamentoId'] && !!this.provinciaId && !!this.distritoId) {
      const departamentoId = changes['departamentoId'].currentValue;
      this.service.getApiList(departamentoId, this.provinciaId, this.distritoId);
    } else if (!!changes['provinciaId'] && !!this.departamentoId && !!this.distritoId) {
      const provinciaId = changes['provinciaId'].currentValue;
      this.service.getApiList(this.departamentoId, provinciaId, this.distritoId);
    } else if (!!changes['distritoId'] && !!this.departamentoId && !!this.provinciaId) {
      const distritoId = changes['distritoId'].currentValue;
      this.service.getApiList(this.departamentoId, this.provinciaId, distritoId);
    }
  }

  onChange(event: any) {
    this.eventChange.emit(event.target.value || '');
  }
}
