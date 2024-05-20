import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartamentoListService } from '../../services/departamento-list.service';

@Component({
  selector: 'app-departamento-select',
  standalone: true,
  templateUrl: './departamento-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [DepartamentoListService],
})
export class DepartamentoSelectComponent implements OnInit {
  constructor(public service: DepartamentoListService) {}

  @Input()
  public value?: string | null;

  @Input()
  public isDisabled?: boolean;

  @Output() eventChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.service.getApiList();
  }

  onChange(event: any) {
    this.eventChange.emit(event.target.value || '');
  }
}
