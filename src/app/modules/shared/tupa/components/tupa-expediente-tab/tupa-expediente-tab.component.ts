import { Component, Input } from '@angular/core';
import { ExpedienteFindService } from '../../../expediente/services/expediente-find.service';
import { ExpedienteEntityInterface } from '../../../expediente/interfaces/expediente-entity.interface';

@Component({
  selector: 'app-tupa-expediente-tab',
  standalone: true,
  templateUrl: './tupa-expediente-tab.component.html',
  providers: [ExpedienteFindService],
})
export class TupaExpedienteTabComponent {
  @Input()
  public expediente?: ExpedienteEntityInterface;
}
