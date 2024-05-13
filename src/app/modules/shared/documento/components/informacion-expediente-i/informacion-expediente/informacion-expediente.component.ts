import { Component } from '@angular/core';
import { ExpedienteTableComponent } from '../expediente-table/expediente-table.component';

@Component({
  selector: 'app-informacion-expediente',
  standalone: true,
  imports: [ExpedienteTableComponent],
  templateUrl: './informacion-expediente.component.html',
})
export class InformacionExpedienteComponent {

}
