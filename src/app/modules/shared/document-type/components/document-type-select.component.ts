import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentTypeListService } from '../services/document-type-list.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-type-select',
  standalone: true,
  templateUrl: './document-type-select.component.html',
  imports: [NgFor, FormsModule],
  providers: [DocumentTypeListService],
})
export class DocumentTypeSelectComponent implements OnInit {
  constructor(public documentTypeList: DocumentTypeListService) {}

  @Input() value?: string | null;

  @Output() eventChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.documentTypeList.getApiList();
  }

  onChange(event: any) {
    this.eventChange.emit(event.target.value || '');
  }
}
