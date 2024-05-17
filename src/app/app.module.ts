import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SolicitanteModalComponent } from './modules/shared/solicitante-search/components/solicitante-modal/solicitante-modal.component';
import { Tup05ParteIComponent } from './modules/tupas-dev03/tupa-05/components/tupa-05-parte-i/tupa-05-parte-i.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, SolicitanteModalComponent, Tup05ParteIComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
