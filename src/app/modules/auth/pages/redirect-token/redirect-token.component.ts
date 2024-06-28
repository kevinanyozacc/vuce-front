import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLoginService } from 'src/app/core/auth/services/auth-login.service';
import { AuthProfileService } from 'src/app/core/auth/services/auth-profile.service';
import { BpmModule } from 'src/app/core/bpm/bpm.module';
import { BpmLoginService } from 'src/app/core/bpm/services/bpm-login.service';
import { BpmProfileService } from 'src/app/core/bpm/services/bpm-profile.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-redirect-token',
  standalone: true,
  templateUrl: './redirect-token.component.html',
  imports: [LoadingComponent, BpmModule],
  providers: [AuthProfileService, AuthLoginService],
})
export class RedirectTokenComponent implements OnInit {
  private activeService = inject(ActivatedRoute);
  private routeService = inject(Router);
  private bpmProfileService = inject(BpmProfileService);
  private bpmLoginService = inject(BpmLoginService);
  private profileService = inject(AuthProfileService);
  private loginService = inject(AuthLoginService);

  ngOnInit(): void {
    this.validate();
  }

  public validate() {
    const token = this.activeService.snapshot.queryParams['token'];
    const taskId = this.activeService.snapshot.queryParams['taskid'];
    const redirect = this.activeService.snapshot.queryParams['redirect'];
    // validar token/taskId
    if (!taskId || !token) return this.routeService.navigate(['/errors/403']);
    // obtner user bpm
    return this.bpmProfileService.api(taskId, token).subscribe({
      next: (bpmAuth) => {
        this.profileService
          .api(bpmAuth.usuarioResponsable.toUpperCase())
          .then((auth) => {
            this.bpmLoginService.signIn({ token, taskId });
            this.loginService.signIn(auth);
            this.routeService.navigate([redirect || '/dashboard']);
          })
          .catch(() => this.routeService.navigate(['/errors/403']));
      },
      error: () => this.routeService.navigate(['/errors/403']),
    });
  }
}
