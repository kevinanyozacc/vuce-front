import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProcedureListService } from '../../services/procedure-list.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-procedure-select',
  standalone: true,
  templateUrl: './procedure-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [ProcedureListService],
})
export class ProcedureSelectComponent implements OnChanges {
  constructor(public service: ProcedureListService) {}

  @Input()
  public areaId?: string | null;

  @Input()
  public value?: string | null;

  @Input()
  public isDisabled?: boolean;

  @Output() eventChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['areaId']?.currentValue) {
      const value = changes['areaId'].currentValue;
      this.service.getApiList(value);
    }
  }

  onChange(event: any) {
    this.eventChange.emit(event.target.value || '');
  }
}
