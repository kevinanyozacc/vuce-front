import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLoginService } from 'src/app/core/auth/services/auth-login.service';
import { AuthProfileService } from 'src/app/core/auth/services/auth-profile.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-redirect-token',
  standalone: true,
  templateUrl: './redirect-token.component.html',
  imports: [LoadingComponent],
  providers: [AuthProfileService, AuthLoginService],
})
export class RedirectTokenComponent implements OnInit {
  private activeService = inject(ActivatedRoute);
  private routeService = inject(Router);
  private profileService = inject(AuthProfileService);
  private loginService = inject(AuthLoginService);

  ngOnInit(): void {
    this.validate();
  }

  public async validate() {
    const username = this.activeService.snapshot.queryParams['username'];
    if (!username) return this.routeService.navigate(['/errors/403']);
    return this.profileService
      .api(username)
      .then((data) => {
        this.loginService.signIn(data);
        this.routeService.navigate(['/']);
      })
      .catch(() => this.routeService.navigate(['/errors/403']));
  }
}
