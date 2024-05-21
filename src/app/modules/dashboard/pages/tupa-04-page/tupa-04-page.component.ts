import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { Tupa04TabContainerComponent } from 'src/app/modules/tupas-dev03/tupa-04/components/tupa-04-tab-container/tupa-04-tab-container.component';

@Component({
  selector: 'app-tupa-04',
  templateUrl: './tupa-04-page.component.html',
  standalone: true,
  imports: [DashboardHeaderComponent, Tupa04TabContainerComponent],
})
export class Tupa04Component {}
