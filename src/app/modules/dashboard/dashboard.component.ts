import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthProfileService } from 'src/app/core/auth/services/auth-profile.service';
import { BpmProfileService } from 'src/app/core/bpm/services/bpm-profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [RouterOutlet],
})
export class DashboardComponent implements OnInit {
  public authProfileService = inject(AuthProfileService);
  public bpmProfileService = inject(BpmProfileService);

  ngOnInit(): void {
    this.authProfileService.getCurrent();
    this.bpmProfileService.getCurrent();
  }
}
