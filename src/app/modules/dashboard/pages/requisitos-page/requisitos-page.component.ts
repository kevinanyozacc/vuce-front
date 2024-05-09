import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { RequisitosTabContainerComponent } from 'src/app/modules/shared/requisitos/components/requisitos-tab-container/requisitos-tab-container.component';

@Component({
  selector: 'app-requisitos-page',
  standalone: true,
  imports: [DashboardHeaderComponent,RequisitosTabContainerComponent],
  templateUrl: './requisitos-page.component.html',
})
export class RequisitosComponent {

}
