import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Tupa05MercanciaPecuariaComponent } from '../tupa-05-mercancia-pecuaria/tupa-05-mercancia-pecuaria.component';
import { PersonEntityInterface } from 'src/app/modules/shared/person/interfaces/person-entity.interface';
import { EstablishmentEntityInterface } from 'src/app/modules/shared/establishment/interfaces/establishment-entity.interface';
import { tupaFinalidadData } from '../../data/tupa-finalidad.data';
import { PaymentEntityInterface } from 'src/app/modules/shared/method-payment/interfaces/payment-entity.interface';
import { ProductAnimalEntityInterface } from 'src/app/modules/shared/product/interfaces/product-animal-entity.interface';
import { ProductSubProductEntityInterface } from 'src/app/modules/shared/product/interfaces/product-subproduct-entity.interface';
import { RepresentanteEntityInterface } from 'src/app/modules/shared/person/interfaces/representante-entity.interface';
import { TupaHeaderTabComponent } from 'src/app/modules/shared/tupa/components/tupa-header-tab/tupa-header-tab.component';
import { TupaItemIdEnum, TupaItemTabInterface } from 'src/app/modules/shared/tupa/interfaces/tupa-item-tab.interface';
import { TupaRequestTabComponent } from 'src/app/modules/shared/tupa/components/tupa-request-tab/tupa-request-tab.component';
import { TupaEstablishmentTabComponent } from 'src/app/modules/shared/tupa/components/tupa-establishment-tab/tupa-esblishment-tab.component';
import { TupaPaymentTabComponent } from 'src/app/modules/shared/tupa/components/tupa-payment-tab/tupa-payment-tab.component';
import { Tupa05FinalComponent } from '../tupa-05-final/tupa-05-final.component';
import { PaymentDataEntityInterface } from 'src/app/modules/shared/method-payment/interfaces/payment-data-entity.interface';
import { TupaExpedienteTabComponent } from 'src/app/modules/shared/tupa/components/tupa-expediente-tab/tupa-expediente-tab.component';
import { Tupa05ProductTypeEnum } from '../../enums/tupa-05-product-type.enum';

@Component({
  selector: 'app-tupa-05-tab-container',
  templateUrl: './tupa-05-tab-container.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    TupaHeaderTabComponent,
    TupaRequestTabComponent,
    TupaEstablishmentTabComponent,
    Tupa05FinalComponent,
    Tupa05MercanciaPecuariaComponent,
    TupaPaymentTabComponent,
    TupaExpedienteTabComponent,
  ],
})
export class Tupa05TabContainerComponent {
  tabs: TupaItemTabInterface[] = [
    {
      id: TupaItemIdEnum.PARTE_I,
      name: 'I - INFORMACIÓN DE EMPRESA SOLICITANTE',
      active: false,
    },
    {
      id: TupaItemIdEnum.PARTE_II,
      name: 'II - ESTABLECIMIENTO',
      active: false,
    },
    {
      id: TupaItemIdEnum.PARTE_III,
      name: 'III - FINALIDAD',
      active: false,
    },
    {
      id: TupaItemIdEnum.PARTE_IV,
      name: 'IV - MERCANCIA PECUARIA',
      active: true,
    },
    {
      id: TupaItemIdEnum.PARTE_V,
      name: 'V - DATOS DEL PAGO',
      active: false,
    },
    {
      id: TupaItemIdEnum.PARTE_VI,
      name: 'INFORMACIÓN DEL EXPEDIENTE',
      active: false,
    },
  ];

  public person?: PersonEntityInterface;
  public representante?: RepresentanteEntityInterface;
  public establishment?: EstablishmentEntityInterface;
  public technical?: PersonEntityInterface;
  public finalidad = tupaFinalidadData;
  public productType: Tupa05ProductTypeEnum = Tupa05ProductTypeEnum.ANIMAL;
  public animals: ProductAnimalEntityInterface[] = [];
  public subProducts: ProductSubProductEntityInterface[] = [];
  public personPayment?: PersonEntityInterface;
  public paymentDatas: PaymentDataEntityInterface[] = [];
  public payments: PaymentEntityInterface[] = [];

  onSelect(item: TupaItemTabInterface) {
    this.tabs = this.tabs.map((tab) => {
      tab.active = item.id === tab.id;
      return tab;
    });
  }

  selectPerson(person?: PersonEntityInterface) {
    this.person = person;
  }

  selectRepresentante(representante?: RepresentanteEntityInterface) {
    this.representante = representante;
  }

  selectEstablishment(establishment?: EstablishmentEntityInterface) {
    this.establishment = establishment;
  }

  selectTechnical(technical?: PersonEntityInterface) {
    this.technical = technical;
  }

  selectProductType(type: Tupa05ProductTypeEnum) {
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
