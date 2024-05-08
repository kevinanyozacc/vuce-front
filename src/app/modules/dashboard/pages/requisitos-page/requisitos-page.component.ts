import { Component } from '@angular/core';
import { Tupa05TabContainerComponent } from 'src/app/modules/tupa-05/components/tupa-05-tab-container/tupa-05-tab-container.component';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { RequisitosTabContainerComponent } from 'src/app/modules/requisitos/components/requisitos-tab-container/requisitos-tab-container.component';

@Component({
  selector: 'app-requisitos-page',
  standalone: true,
  imports: [DashboardHeaderComponent,RequisitosTabContainerComponent],
  templateUrl: './requisitos-page.component.html',
})
export class RequisitosComponent {

}
