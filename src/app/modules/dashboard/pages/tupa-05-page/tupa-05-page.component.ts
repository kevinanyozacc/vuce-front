import { Component } from '@angular/core';
import { DashboardHeaderComponent } from 'src/app/modules/dashboard/components/dashboard-header/dashboard-header.component';
import { Tupa05TabContainerComponent } from 'src/app/modules/dev-03/tupa-05/components/tupa-05-tab-container/tupa-05-tab-container.component';
import { ExpedienteEntityInterface } from 'src/app/modules/shared/expediente/interfaces/expediente-entity.interface';

@Component({
  selector: 'app-tupa-05-page',
  templateUrl: './tupa-05-page.component.html',
  standalone: true,
  imports: [DashboardHeaderComponent, Tupa05TabContainerComponent],
})
export class Tupa05PageComponent {
  public onCancel(expediente?: ExpedienteEntityInterface) {
    window.close();
  }

  public onFinished(expediente: ExpedienteEntityInterface) {
    window.close();
  }
}
