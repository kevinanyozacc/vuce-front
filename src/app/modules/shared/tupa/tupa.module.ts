import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TupaDetailService } from './services/tupa-detail.service';
import { TupaEstablishmentService } from './services/tupa-establishment.service';
import { TupaPaymentService } from './services/tupa-payment.service';
import { TupaProcessService } from './services/tupa-process.service';
import { TupaProductService } from './services/tupa-product.service';
import { TupaRequestService } from './services/tupa-request.service';
import { ProcedureCalcTarifaService } from '../procedure/services/procedure-calc-tarifa.service';
import { TupaHeaderTabComponent } from './components/tupa-header-tab/tupa-header-tab.component';
import { TupaProcessTabComponent } from './components/tupa-process-tab/tupa-process-tab.component';
import { TupaRequestTabComponent } from './components/tupa-request-tab/tupa-request-tab.component';
import { TupaEstablishmentTabComponent } from './components/tupa-establishment-tab/tupa-esblishment-tab.component';
import { TupaPaymentTabComponent } from './components/tupa-payment-tab/tupa-payment-tab.component';
import { TupaExpedienteTabComponent } from './components/tupa-expediente-tab/tupa-expediente-tab.component';

@NgModule({
  imports: [
    HttpClientModule,
    TupaProcessTabComponent,
    TupaHeaderTabComponent,
    TupaRequestTabComponent,
    TupaEstablishmentTabComponent,
    TupaPaymentTabComponent,
    TupaExpedienteTabComponent,
  ],
  providers: [
    ProcedureCalcTarifaService,
    TupaDetailService,
    TupaEstablishmentService,
    TupaPaymentService,
    TupaProcessService,
    TupaProductService,
    TupaRequestService,
  ],
  exports: [
    TupaProcessTabComponent,
    TupaHeaderTabComponent,
    TupaRequestTabComponent,
    TupaEstablishmentTabComponent,
    TupaPaymentTabComponent,
    TupaExpedienteTabComponent,
  ],
})
export class TupaModule {}
