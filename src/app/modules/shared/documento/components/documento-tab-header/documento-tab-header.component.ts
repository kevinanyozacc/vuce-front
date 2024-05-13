import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TupaDocumentosResolutivosTabInterface } from '../../interfaces/documentos-tab.interface';
import { DocumentoTabItemComponent } from '../documento-tab-item/documento-tab-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-documento-tab-header',
  standalone: true,
  imports: [
    NgFor,
    DocumentoTabItemComponent],
  templateUrl: './documento-tab-header.component.html',
})
export class DocumentoTabHeaderComponent {
  @Input() tabs: TupaDocumentosResolutivosTabInterface[] = [];

  @Output() eventSelected = new EventEmitter<TupaDocumentosResolutivosTabInterface>();

  onSelected(item: TupaDocumentosResolutivosTabInterface){
    this.eventSelected.emit(item)
  }
}
