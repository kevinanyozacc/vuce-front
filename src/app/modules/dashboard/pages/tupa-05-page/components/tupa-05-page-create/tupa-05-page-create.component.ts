import { Component } from '@angular/core';
import { DashboardHeaderComponent } from 'src/app/modules/dashboard/components/dashboard-header/dashboard-header.component';
import { Tupa05TabContainerComponent } from 'src/app/modules/dev-03/tupa-05/components/tupa-05-tab-container/tupa-05-tab-container.component';

@Component({
  selector: 'app-tupa-05-page-create',
  templateUrl: './tupa-05-page-create.component.html',
  standalone: true,
  imports: [DashboardHeaderComponent, Tupa05TabContainerComponent],
})
export class Tupa05PageCreateComponent {}