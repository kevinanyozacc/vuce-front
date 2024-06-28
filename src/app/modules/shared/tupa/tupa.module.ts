import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TupaDetailService } from './services/tupa-detail.service';
import { TupaEstablishmentService } from './services/tupa-establishment.service';
import { TupaPaymentService } from './services/tupa-payment.service';
import { TupaProcessService } from './services/tupa-process.service';
import { TupaProductService } from './services/tupa-product.service';
import { TupaRequestService } from './services/tupa-request.service';
import { ProcedureCalcTarifaService } from '../procedure/services/procedure-calc-tarifa.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ProcedureCalcTarifaService,
    TupaDetailService,
    TupaEstablishmentService,
    TupaPaymentService,
    TupaProcessService,
    TupaProductService,
    TupaRequestService,
  ],
})
export class TupaModule {}
