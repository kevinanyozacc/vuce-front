import { NgModule } from '@angular/core';
import { BpmProfileService } from './services/bpm-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { BpmLoginService } from './services/bpm-login.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [BpmProfileService, BpmLoginService],
})
export class BpmModule {}
