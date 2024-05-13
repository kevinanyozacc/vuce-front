import { Component } from '@angular/core';
import { ObservacionTableComponent } from '../observacion-table/observacion-table.component';

@Component({
  selector: 'app-observacion',
  standalone: true,
  imports: [ObservacionTableComponent],
  templateUrl: './observacion.component.html',
})
export class ObservacionComponent {

}
