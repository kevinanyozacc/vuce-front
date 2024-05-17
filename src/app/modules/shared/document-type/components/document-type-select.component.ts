import { Component, OnInit } from '@angular/core';
import { DocumentTypeListService } from '../services/document-type-list.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-document-type-select',
  standalone: true,
  templateUrl: './document-type-select.component.html',
  imports: [NgFor],
  providers: [DocumentTypeListService],
})
export class DocumentTypeSelectComponent implements OnInit {
  constructor(public documentTypeList: DocumentTypeListService) {}

  ngOnInit(): void {
    this.documentTypeList.getApiList();
  }
}
