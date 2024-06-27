import { Component, inject, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Tupa05MercanciaPecuariaComponent } from '../tupa-05-mercancia-pecuaria/tupa-05-mercancia-pecuaria.component';
import { TupaHeaderTabComponent } from 'src/app/modules/shared/tupa/components/tupa-header-tab/tupa-header-tab.component';
import { TupaRequestTabComponent } from 'src/app/modules/shared/tupa/components/tupa-request-tab/tupa-request-tab.component';
import { TupaEstablishmentTabComponent } from 'src/app/modules/shared/tupa/components/tupa-establishment-tab/tupa-esblishment-tab.component';
import { TupaPaymentTabComponent } from 'src/app/modules/shared/tupa/components/tupa-payment-tab/tupa-payment-tab.component';
import { Tupa05FinalComponent } from '../tupa-05-final/tupa-05-final.component';
import { ExpedienteCreateService } from 'src/app/modules/shared/expediente/services/expediente-create.service';
import { ContentLoadingComponent } from 'src/app/shared/components/content-loading/content-loading.component';
import { ExpedienteEntityInterface } from 'src/app/modules/shared/expediente/interfaces/expediente-entity.interface';
import { TupaExpedienteTabComponent } from 'src/app/modules/shared/tupa/components/tupa-expediente-tab/tupa-expediente-tab.component';
import { TupaProcessTabComponent } from 'src/app/modules/shared/tupa/components/tupa-process-tab/tupa-process-tab.component';
import { TupaProcessService } from 'src/app/modules/shared/tupa/services/tupa-process.service';
import { tupaTabData } from '../../data/tupa-tab.data';
import { TupaPaymentService } from 'src/app/modules/shared/tupa/services/tupa-payment.service';
import { ProcedureInfoService } from 'src/app/modules/shared/procedure/services/procedure-info.service';
import { TupaRequestService } from 'src/app/modules/shared/tupa/services/tupa-request.service';
import { TupaEstablishmentService } from 'src/app/modules/shared/tupa/services/tupa-establishment.service';
import { TupaDetailService } from 'src/app/modules/shared/tupa/services/tupa-detail.service';
import { TupaProductService } from 'src/app/modules/shared/tupa/services/tupa-product.service';

@Component({
  selector: 'app-tupa-05-tab-container',
  templateUrl: './tupa-05-tab-container.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ContentLoadingComponent,
    TupaProcessTabComponent,
    TupaHeaderTabComponent,
    TupaRequestTabComponent,
    TupaEstablishmentTabComponent,
    TupaPaymentTabComponent,
    TupaExpedienteTabComponent,
    Tupa05FinalComponent,
    Tupa05MercanciaPecuariaComponent,
  ],
  providers: [
    TupaProcessService,
    TupaRequestService,
    TupaEstablishmentService,
    TupaDetailService,
    TupaProductService,
    TupaPaymentService,
    ProcedureInfoService,
    ExpedienteCreateService,
  ],
})
export class Tupa05TabContainerComponent implements OnInit {
  constructor(public service: ExpedienteCreateService) {}

  public processService = inject(TupaProcessService);
  public requestService = inject(TupaRequestService);
  public establishmentService = inject(TupaEstablishmentService);
  public detailService = inject(TupaDetailService);
  public productService = inject(TupaProductService);
  public paymentService = inject(TupaPaymentService);
  public procedureService = inject(ProcedureInfoService);

  @Input()
  public title!: string;

  @Input()
  public showProcess: boolean = true;

  @Input()
  public expediente?: ExpedienteEntityInterface;

  ngOnInit(): void {
    // add tabs
    this.processService.setTabs(tupaTabData);
    // add procedure
    this.procedureService.getApi('105', '035').then((data) => {
      this.paymentService.setProcedureInfo(data);
    });
    // add person
    this.listenPerson();
    // add establishent
    this.listenEstablishment();
    // add detail
    this.listenDetail();
    // add product
    this.listenProduct();
    // add payment
    this.listenPayment();
  }

  onSave() {
    // this.service
    //   .fetch({
    //     sedeId: '01',
    //     tupaId: '001',
    //     personId: this.person?.id || '',
    //     userId: 'SENASA',
    //     requestPersonId: this.person?.id || '',
    //     representanteId: this.representante?.id,
    //     otherPersonId: this.personPayment?.id,
    //     detalle: this.finalidad,
    //     cuarentenas: this.cuarentenas,
    //     services: this.services,
    //     payments: this.payments,
    //   })
    //   .then((data) => {
    //     location.href = `/dashboard/tupa-05/${data.id}`;
    //   })
    //   .catch(() => null);
  }

  public listenPerson() {
    this.requestService.$getPerson().subscribe((data) => {
      if (!this.processService.isActiveCurrentTab(0)) return;
      if (!!data) {
        this.processService.completeTab(tupaTabData[0]);
        this.processService.enabledTab(tupaTabData[1]);
      }
    });
  }

  public listenEstablishment() {
    this.establishmentService.$getIsValid().subscribe((data) => {
      if (!this.processService.isActiveCurrentTab(1)) return;
      if (data) {
        this.processService.activeTab(tupaTabData[2]);
      } else {
        this.processService.activeTab(tupaTabData[1]);
        this.processService.disabledTab(tupaTabData[2]);
      }
    });
  }

  public listenDetail() {
    this.detailService.$getIsValid().subscribe((data) => {
      if (!this.processService.isActiveCurrentTab(2)) return;
      if (data) {
        this.processService.activeTab(tupaTabData[3]);
      } else {
        this.processService.activeTab(tupaTabData[2]);
        this.processService.disabledTab(tupaTabData[3]);
      }
    });
  }

  public listenProduct() {
    this.productService.$getIsValid().subscribe((data) => {
      if (!this.processService.isActiveCurrentTab(3)) return;
      if (data) {
        this.processService.completeTab(tupaTabData[3]);
        this.processService.enabledTab(tupaTabData[4]);
      } else {
        this.processService.activeTab(tupaTabData[3]);
        this.processService.disabledTab(tupaTabData[4]);
      }
    });
  }

  public listenPayment() {
    this.paymentService.$getIsValid().subscribe((data) => {
      if (!this.processService.isActiveCurrentTab(4)) return;
      if (data) this.processService.completeTab(tupaTabData[4]);
      else this.processService.inCompleteTab(tupaTabData[4]);
    });
  }
}
