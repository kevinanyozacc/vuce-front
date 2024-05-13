import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TupaDocumentosResolutivosTabInterface } from '../../interfaces/documentos-tab.interface';

@Component({
  selector: 'app-documento-tab-item',
  standalone: true,
  imports: [],
  templateUrl: './documento-tab-item.component.html',
})
export class DocumentoTabItemComponent {
  @Input()
  item!: TupaDocumentosResolutivosTabInterface;

  @Output() eventClick = new EventEmitter<TupaDocumentosResolutivosTabInterface>();

  public onClick() {
    this.eventClick.emit(this.item);
  }
}
