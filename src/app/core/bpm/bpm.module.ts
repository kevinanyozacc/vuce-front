import { NgModule } from '@angular/core';
import { BpmProfileService } from './services/bpm-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { BpmLoginService } from './services/bpm-login.service';
import { BpmDeleteService } from './services/bpm-delete.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [BpmProfileService, BpmLoginService, BpmDeleteService],
})
export class BpmModule {}
