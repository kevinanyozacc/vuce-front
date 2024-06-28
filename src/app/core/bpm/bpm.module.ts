import { NgModule } from '@angular/core';
import { BpmProfileService } from './services/bpm-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { BpmLoginService } from './services/bpm-login.service';
import { BpmDeleteService } from './services/bpm-delete.service';
import { BpmFinishedService } from './services/bpm-finished.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [BpmProfileService, BpmLoginService, BpmDeleteService, BpmFinishedService],
})
export class BpmModule {}
