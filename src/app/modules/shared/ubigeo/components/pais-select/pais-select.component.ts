import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaisListService } from '../../services/pais-list.service';

@Component({
  selector: 'app-pais-select',
  standalone: true,
  templateUrl: './pais-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [PaisListService],
})
export class PaisSelectComponent implements OnInit {
  constructor(public service: PaisListService) {}

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
