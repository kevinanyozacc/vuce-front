import { NgModule } from '@angular/core';
import { ExpedienteCreateService } from './services/expediente-create.service';
import { ExpedienteEditService } from './services/expediente-edit.service';
import { ExpedienteFindService } from './services/expediente-find.service';
import { ExpedienteStorageService } from './services/expediente-storage.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  providers: [ExpedienteCreateService, ExpedienteEditService, ExpedienteFindService, ExpedienteStorageService],
})
export class ExpedienteModule {}
