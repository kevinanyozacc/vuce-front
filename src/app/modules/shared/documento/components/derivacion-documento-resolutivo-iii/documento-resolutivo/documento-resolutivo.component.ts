import { Component } from '@angular/core';
import { DetalleDerivacionTableComponent } from '../detalle-derivacion-table/detalle-derivacion-table.component';
import { DocumentoResolutivoTableComponent } from '../documento-resolutivo-table/documento-resolutivo-table.component';

@Component({
  selector: 'app-documento-resolutivo',
  standalone: true,
  imports: [
    DetalleDerivacionTableComponent,
    DocumentoResolutivoTableComponent
  ],
  templateUrl: './documento-resolutivo.component.html',
})
export class DocumentoResolutivoComponent {

}
