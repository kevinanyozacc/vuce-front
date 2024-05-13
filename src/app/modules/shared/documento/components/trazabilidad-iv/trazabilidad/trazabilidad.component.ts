import { Component } from '@angular/core';
import { TrazabilidadTableComponent } from '../trazabilidad-table/trazabilidad-table.component';

@Component({
  selector: 'app-trazabilidad',
  standalone: true,
  imports: [
    TrazabilidadTableComponent

  ],
  templateUrl: './trazabilidad.component.html',
})
export class TrazabilidadComponent {

}
