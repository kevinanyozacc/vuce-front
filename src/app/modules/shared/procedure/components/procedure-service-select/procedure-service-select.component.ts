import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ProcedureServiceListService } from '../../services/procedure-service-list.service';
import { ProcedureServiceEntityInterface } from '../../interfaces/procedure-service-entity.interface';

@Component({
  selector: 'app-procedure-service-select',
  standalone: true,
  templateUrl: './procedure-service-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [ProcedureServiceListService],
})
export class ProcedureServiceSelectComponent implements OnChanges {
  constructor(public service: ProcedureServiceListService) {}

  @Input()
  public procedureId?: string | null;

  @Input()
  public value?: string | null;

  @Input()
  public isDisabled?: boolean;

  @Output() eventChange = new EventEmitter<string>();

  @Output() eventData = new EventEmitter<ProcedureServiceEntityInterface | undefined>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['procedureId']?.currentValue) {
      const value = changes['procedureId'].currentValue;
      this.service.getApiList(value);
    }
  }

  onChange(event: any) {
    const value = event.target.value || '';
    const obj = this.service.getData().find((item) => item.id == value);
    this.eventChange.emit(value);
    this.eventData.emit(obj);
  }
}
