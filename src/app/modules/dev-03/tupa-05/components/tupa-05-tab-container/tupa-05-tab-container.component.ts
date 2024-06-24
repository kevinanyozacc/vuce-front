import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Tupa05MercanciaPecuariaComponent } from '../tupa-05-mercancia-pecuaria/tupa-05-mercancia-pecuaria.component';
import { PersonEntityInterface } from 'src/app/modules/shared/person/interfaces/person-entity.interface';
import { EstablishmentEntityInterface } from 'src/app/modules/shared/establishment/interfaces/establishment-entity.interface';
import { tupaFinalidadData } from '../../data/tupa-finalidad.data';
import { PaymentEntityInterface } from 'src/app/modules/shared/method-payment/interfaces/payment-entity.interface';
import { RepresentanteEntityInterface } from 'src/app/modules/shared/person/interfaces/representante-entity.interface';
import { TupaHeaderTabComponent } from 'src/app/modules/shared/tupa/components/tupa-header-tab/tupa-header-tab.component';
import { TupaItemIdEnum, TupaItemTabInterface } from 'src/app/modules/shared/tupa/interfaces/tupa-item-tab.interface';
import { TupaRequestTabComponent } from 'src/app/modules/shared/tupa/components/tupa-request-tab/tupa-request-tab.component';
import { TupaEstablishmentTabComponent } from 'src/app/modules/shared/tupa/components/tupa-establishment-tab/tupa-esblishment-tab.component';
import { TupaPaymentTabComponent } from 'src/app/modules/shared/tupa/components/tupa-payment-tab/tupa-payment-tab.component';
import { Tupa05FinalComponent } from '../tupa-05-final/tupa-05-final.component';
import { PaymentDataEntityInterface } from 'src/app/modules/shared/method-payment/interfaces/payment-data-entity.interface';
import { TupaExpedienteTabComponent } from 'src/app/modules/shared/tupa/components/tupa-expediente-tab/tupa-expediente-tab.component';
import { ProductCuarentenaEntityInterface } from 'src/app/modules/shared/product/interfaces/product-cuarentena-entity.interface';
import { ProductTypeEnum } from 'src/app/modules/shared/product/enums/product-type.enum';
import { ExpedienteCreateService } from 'src/app/modules/shared/expediente/services/expediente-create.service';
import { DetalleCreateInterface } from 'src/app/modules/shared/detalle/interfaces/detalle-create.interface';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ContentLoadingComponent } from 'src/app/shared/components/content-loading/content-loading.component';

@Component({
  selector: 'app-tupa-05-tab-container',
  templateUrl: './tupa-05-tab-container.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ContentLoadingComponent,
    TupaHeaderTabComponent,
    TupaRequestTabComponent,
    TupaEstablishmentTabComponent,
    Tupa05FinalComponent,
    Tupa05MercanciaPecuariaComponent,
    TupaPaymentTabComponent,
    TupaExpedienteTabComponent,
  ],
  providers: [ExpedienteCreateService],
})
export class Tupa05TabContainerComponent {
  constructor(public service: ExpedienteCreateService) {}

  tabs: TupaItemTabInterface[] = [
    {
      id: TupaItemIdEnum.PARTE_I,
      name: 'I - INFORMACIÓN DE EMPRESA SOLICITANTE',
      disabled: false,
      active: true,
    },
    {
      id: TupaItemIdEnum.PARTE_II,
      name: 'II - ESTABLECIMIENTO',
      disabled: true,
      active: false,
    },
    {
      id: TupaItemIdEnum.PARTE_III,
      name: 'III - FINALIDAD',
      disabled: false,
      active: false,
    },
    {
      id: TupaItemIdEnum.PARTE_IV,
      name: 'IV - MERCANCIA PECUARIA',
      disabled: false,
      active: false,
    },
    {
      id: TupaItemIdEnum.PARTE_V,
      name: 'V - DATOS DEL PAGO',
      disabled: true,
      active: false,
    },
  ];

  public canSave = false;
  public person?: PersonEntityInterface;
  public representante?: RepresentanteEntityInterface;
  public establishment?: EstablishmentEntityInterface;
  public technical?: PersonEntityInterface;
  public finalidad = tupaFinalidadData;
  public productType: ProductTypeEnum = ProductTypeEnum.ANIMAL;
  public cuarentenas: ProductCuarentenaEntityInterface[] = [];
  public personPayment?: PersonEntityInterface;
  public services: PaymentDataEntityInterface[] = [];
  public payments: PaymentEntityInterface[] = [];

  onSelect(item: TupaItemTabInterface) {
    this.tabs = this.tabs.map((tab) => {
      tab.active = item.id === tab.id;
      return tab;
    });
  }

  onDeleteCuarentena(cuarentena: ProductCuarentenaEntityInterface) {
    this.cuarentenas = this.cuarentenas.filter((item) => item.productId != cuarentena.productId);
  }

  onClearCuarentena() {
    this.cuarentenas = [];
  }

  onValidateCuarentena(value: boolean) {
    this.tabs[4].disabled = !value;
  }

  onServiceDelete(service: PaymentDataEntityInterface) {
    this.services = this.services.filter((item) => item.serviceId != service.serviceId);
  }

  onPaymentDelete(index: number) {
    this.payments = this.payments.filter((_, iter) => iter != index);
  }

  onValidatePayment(value: boolean) {
    this.canSave = value;
  }

  onSave() {
    this.service
      .fetch({
        sedeId: '01',
        tupaId: '001',
        personId: this.person?.id || '',
        userId: 'SENASA',
        requestPersonId: this.person?.id || '',
        representanteId: this.representante?.id,
        otherPersonId: this.personPayment?.id,
        detalle: this.finalidad,
        cuarentenas: this.cuarentenas,
        services: this.services,
        payments: this.payments,
      })
      .then((data) => {
        location.href = `/dashboard/tupa-05/${data.id}`;
      })
      .catch(() => null);
  }

  selectPerson(person?: PersonEntityInterface) {
    this.person = person;
    this.tabs[1].disabled = !this.person;
  }

  selectRepresentante(representante?: RepresentanteEntityInterface) {
    this.representante = representante;
  }

  selectEstablishment(establishment?: EstablishmentEntityInterface) {
    this.establishment = establishment;
    this.finalidad.establishmentId = establishment?.id;
    this.tabs[2].disabled = !this.establishment || !this.technical;
  }

  selectTechnical(technical?: PersonEntityInterface) {
    this.technical = technical;
    this.finalidad.technicalId = technical?.id;
    this.tabs[2].disabled = !this.establishment || !this.technical;
  }

  selectDetalle(detalle: DetalleCreateInterface) {
    this.finalidad = Object.assign(this.finalidad, { ...detalle });
    this.tabs[3].disabled = false;
    this.onSelect(this.tabs[3]);
  }

  selectProductType(type: ProductTypeEnum) {
    this.productType = type;
  }

  selectPersonPayment(person?: PersonEntityInterface) {
    this.personPayment = person;
  }

  get currentTab(): TupaItemTabInterface | undefined {
    return this.tabs.find((item) => item.active);
  }

  get currentTabKey(): TupaItemIdEnum {
    const tab = this.tabs.find((item) => item.active);
    return tab?.id || TupaItemIdEnum.PARTE_I;
  }
}
