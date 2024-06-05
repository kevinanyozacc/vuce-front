import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { AreaListService } from '../services/area-list.service';

@Component({
  selector: 'app-area-select',
  standalone: true,
  templateUrl: './area-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [AreaListService],
})
export class AreaSelectComponent implements OnInit {
  constructor(public service: AreaListService) {}

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
