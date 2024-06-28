import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthLoginService } from './services/auth-login.service';
import { AuthProfileService } from './services/auth-profile.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [AuthLoginService, AuthProfileService],
})
export class AuthModule {}
