import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { Tupa04TabContainerComponent } from 'src/app/modules/dev-03/tupa-04/components/tupa-04-tab-container/tupa-04-tab-container.component';
import { ExpedienteEntityInterface } from 'src/app/modules/shared/expediente/interfaces/expediente-entity.interface';
@Component({
  selector: 'app-tupa-04',
  templateUrl: './tupa-04-page.component.html',
  standalone: true,
  imports: [DashboardHeaderComponent, Tupa04TabContainerComponent],
})
export class Tupa04Component {
  public onCancel(expediente?: ExpedienteEntityInterface) {
    window.close();
  }

  public onFinished(expediente: ExpedienteEntityInterface) {
    window.close();
  }
}
