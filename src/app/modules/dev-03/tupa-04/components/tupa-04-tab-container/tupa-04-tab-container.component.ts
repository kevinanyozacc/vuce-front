import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ExpedienteCreateService } from 'src/app/modules/shared/expediente/services/expediente-create.service';
import { ContentLoadingComponent } from 'src/app/shared/components/content-loading/content-loading.component';
import { ExpedienteEntityInterface } from 'src/app/modules/shared/expediente/interfaces/expediente-entity.interface';
import { TupaProcessService } from 'src/app/modules/shared/tupa/services/tupa-process.service';
import { tupaTabData } from '../../data/tupa-tab.data';
import { TupaPaymentService } from 'src/app/modules/shared/tupa/services/tupa-payment.service';
import { ProcedureInfoService } from 'src/app/modules/shared/procedure/services/procedure-info.service';
import { TupaRequestService } from 'src/app/modules/shared/tupa/services/tupa-request.service';
import { TupaEstablishmentService } from 'src/app/modules/shared/tupa/services/tupa-establishment.service';
import { TupaDetailService } from 'src/app/modules/shared/tupa/services/tupa-detail.service';
import { TupaProductService } from 'src/app/modules/shared/tupa/services/tupa-product.service';
import { ProcedureInfoInterface } from 'src/app/modules/shared/procedure/interfaces/procedure-info.interface';
import Swal from 'sweetalert2';
import { ExpedienteStorageService } from 'src/app/modules/shared/expediente/services/expediente-storage.service';
import { ExpedienteFindService } from 'src/app/modules/shared/expediente/services/expediente-find.service';
import { TupaProcessStatusEnum } from 'src/app/modules/shared/tupa/enum/tupa-process.enum';
import { AuthProfileService } from 'src/app/core/auth/services/auth-profile.service';
import { SedeFindService } from 'src/app/modules/shared/sede/services/sede-find.service';
import { ExpedienteEditService } from 'src/app/modules/shared/expediente/services/expediente-edit.service';
import { BpmProfileService } from 'src/app/core/bpm/services/bpm-profile.service';
import { TupaModule } from 'src/app/modules/shared/tupa/tupa.module';
import { BpmDeleteService } from 'src/app/core/bpm/services/bpm-delete.service';
import { ExpedienteSaveResponseInterface } from 'src/app/modules/shared/expediente/interfaces/expediente-save-response.interface';
import { TupaItemIdEnum } from 'src/app/modules/shared/tupa/interfaces/tupa-item-tab.interface';
import { Tupa04RecintoComponent } from '../tupa-04-recinto/tupa-04-recinto.component';
import { Tupa04InfoAnimalComponent } from '../tupa-04-info-animal/tupa-04-info-animal.component';

@Component({
  selector: 'app-tupa-04-tab-container',
  templateUrl: './tupa-04-tab-container.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    TupaModule,
    ContentLoadingComponent,
    Tupa04RecintoComponent,
    Tupa04InfoAnimalComponent,
  ],
  providers: [
    SedeFindService,
    ProcedureInfoService,
    ExpedienteFindService,
    ExpedienteCreateService,
    ExpedienteEditService,
    ExpedienteStorageService,
  ],
})
export class Tupa04TabContainerComponent implements OnInit {
  @Input()
  public title!: string;

  @Input()
  public expediente?: ExpedienteEntityInterface;

  @Output()
  public eventCancel = new EventEmitter<ExpedienteEntityInterface | undefined>();

  @Output()
  public eventFinished = new EventEmitter<ExpedienteEntityInterface>();

  public tmpExpediente!: ExpedienteSaveResponseInterface;
  public procedureInfo!: ProcedureInfoInterface;
  public profileService = inject(AuthProfileService);
  public bpmProfileService = inject(BpmProfileService);
  public bpmDeleteService = inject(BpmDeleteService);
  public processService = inject(TupaProcessService);
  public requestService = inject(TupaRequestService);
  public establishmentService = inject(TupaEstablishmentService);
  public detailService = inject(TupaDetailService);
  public productService = inject(TupaProductService);
  public paymentService = inject(TupaPaymentService);
  public procedureService = inject(ProcedureInfoService);
  public expedienteCreate = inject(ExpedienteCreateService);
  public expedienteEdit = inject(ExpedienteEditService);
  public expedienteFind = inject(ExpedienteFindService);
  public sedeFindServie = inject(SedeFindService);
  public storageService = inject(ExpedienteStorageService);

  ngOnInit(): void {
    // add tabs
    this.processService.setTabs(tupaTabData);
    // add sede
    this.profileService.$getData().subscribe((data) => {
      if (!data) return;
      this.sedeFindServie
        .api(data.codigoCentroTramite)
        .then((data) => this.paymentService.setSede(data))
        .catch(() => this.paymentService.setSede(undefined));
    });
    // add procedure
    this.procedureService.getApi('105', '035').then((data) => {
      this.paymentService.setProcedureInfo(data);
      this.procedureInfo = data;
      this.initCache();
    });
    // listeners
    this.listenPerson();
    this.listenEstablishment();
    this.listenDetail();
    this.listenProduct();
    this.listenPayment();
  }

  public initCache() {
    this.storageService
      .settingCache(this.procedureInfo.procedureId)
      .then(({ tmpExpediente }) => {
        this.tmpExpediente = tmpExpediente;
        this.expedienteFind
          .fetch(tmpExpediente.id)
          .then((expediente) => {
            this.expediente = expediente;
            this.processService.activeAllTabs();
            this.processService.selectTab(tupaTabData[5]);
            this.processService.setStatus(TupaProcessStatusEnum.FINISHED);
          })
          .catch(() =>
            Swal.fire({
              icon: 'warning',
              title: 'Alerta',
              html: `No se encontró el expediente: <br /> <b>${tmpExpediente.id}</b>`,
            }),
          );
      })
      .catch(() => {
        this.processService.selectTab(tupaTabData[0]);
      });
  }

  public onSave() {
    if (!!this.expediente) {
      this.expedienteEdit.api(this.expediente.id, this.getPayload()).subscribe((tmpExpediente) => {
        this.storageService.set(this.procedureInfo.procedureId, tmpExpediente);
        this.initCache();
      });
    } else {
      this.expedienteCreate.api(this.getPayload()).subscribe((tmpExpediente) => {
        this.storageService.set(this.procedureInfo.procedureId, tmpExpediente);
        this.initCache();
      });
    }
  }

  public onFinished() {
    if (!this.expediente) return;
    this.processService
      .bpmComplete({
        numeroExpediente: this.tmpExpediente.id,
        numeroSolicitud: this.tmpExpediente.requestId,
        codigoRecibo: this.tmpExpediente.paymentId,
      })
      .subscribe({
        next: () => this.eventFinished.emit(this.expediente),
        error: () =>
          Swal.fire({
            icon: 'error',
            title: 'BPM',
            text: 'Error al finalizar el proceso',
          }),
      });
  }

  public onCancel() {
    if (!this.expediente) return this.eventCancel.emit(undefined);
    this.processService.bpmCancel().subscribe({
      next: () => {
        this.storageService.remove(this.procedureInfo.procedureId);
        this.eventCancel.emit(this.expediente);
      },
      error: () =>
        Swal.fire({
          icon: 'error',
          title: 'BPM',
          text: 'Error al cancelar el proceso',
        }),
    });
  }

  public getPayload() {
    const auth = this.profileService.getData();
    const person = this.requestService.getPerson();
    const representante = this.requestService.getRepresentante();
    const establishment = this.establishmentService.getEstablishment();
    const technical = this.establishmentService.getTechnical();
    const sede = this.paymentService.getSede();
    const personPayment = this.paymentService.getPersonPayment();
    const detalle = this.detailService.getDetail();
    const productType = this.productService.getProductType();
    const products = this.productService.getProducts();
    const services = this.paymentService.getServices();
    const payments = this.paymentService.getPayments();
    // response payload
    return {
      sedeId: sede?.id || '',
      procedureId: this.procedureInfo.procedureId,
      personId: person?.id || '',
      userId: auth?.idUser || 'SENASA',
      establishmentId: establishment?.id,
      technicalId: technical?.id,
      requestPersonId: person?.id,
      representanteId: representante?.id,
      otherPersonId: personPayment?.id,
      detalle,
      productType,
      products,
      services,
      payments,
    };
  }

  public listenPerson() {
    this.requestService.$getPerson().subscribe((data) => {
      this.processService.validateCompleteTab(TupaItemIdEnum.PARTE_I, !!data);
    });
  }

  public listenEstablishment() {
    this.establishmentService.$getIsValid().subscribe((isValid) => {
      this.processService
        .validateCompleteTabObservable(TupaItemIdEnum.PARTE_II, isValid)
        .subscribe((helper) => helper.nextTab());
    });
  }

  public listenDetail() {
    this.detailService.$getIsValid().subscribe((isValid) => {
      this.processService
        .validateCompleteTabObservable(TupaItemIdEnum.PARTE_III, isValid)
        .subscribe((helper) => helper.nextTab());
    });
  }

  public listenProduct() {
    this.productService.$getIsValid().subscribe((isValid) => {
      this.processService.validateCompleteTab(TupaItemIdEnum.PARTE_IV, isValid);
    });
  }

  public listenPayment() {
    this.paymentService.$getIsValid().subscribe((isValid) => {
      this.processService.validateCompleteTab(TupaItemIdEnum.PARTE_V, isValid);
    });
  }
}
