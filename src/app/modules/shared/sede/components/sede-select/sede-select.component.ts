import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { SedeListService } from '../../services/sede-list.service';

@Component({
  selector: 'app-sede-select',
  standalone: true,
  templateUrl: './sede-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [SedeListService],
})
export class SedeSelectComponent implements OnInit {
  constructor(public service: SedeListService) {}

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
