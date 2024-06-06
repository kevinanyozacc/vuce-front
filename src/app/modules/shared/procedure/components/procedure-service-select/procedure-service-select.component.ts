import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ProcedureServiceListService } from '../../services/procedure-service-list.service';

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

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['procedureId']?.currentValue) {
      const value = changes['procedureId'].currentValue;
      this.service.getApiList(value);
    }
  }

  onChange(event: any) {
    this.eventChange.emit(event.target.value || '');
  }
}
