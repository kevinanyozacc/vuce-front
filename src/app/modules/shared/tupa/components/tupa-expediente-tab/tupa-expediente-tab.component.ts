import { Component, OnInit } from '@angular/core';
import { ExpedienteFindService } from '../../../expediente/services/expediente-find.service';
import { ExpedienteEntityInterface } from '../../../expediente/interfaces/expediente-entity.interface';

@Component({
  selector: 'app-tupa-expediente-tab',
  standalone: true,
  templateUrl: './tupa-expediente-tab.component.html',
  providers: [ExpedienteFindService],
})
export class TupaExpedienteTabComponent implements OnInit {
  constructor(public service: ExpedienteFindService) {}

  public expediente?: ExpedienteEntityInterface;

  ngOnInit(): void {
    this.service
      .fetch('220010000676')
      .then((data) => {
        this.expediente = data;
      })
      .catch(() => {
        this.expediente = undefined;
      });
  }
}
