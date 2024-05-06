import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  standalone: true,
})
export class DashboardHeaderComponent {
  @Input() title: string = '';
}
