import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { tupaRecintoData } from '../../data/tupa-recinto.data';
import { PersonEntityInterface } from '../../../shared/person/interfaces/person-entity.interface';
import { RepresentanteEntityInterface } from '../../../shared/person/interfaces/representante-entity.interface';
import { EstablishmentEntityInterface } from '../../../shared/establishment/interfaces/establishment-entity.interface';
import { ProductAnimalEntityInterface } from '../../../shared/product/interfaces/product-animal-entity.interface';
import { PaymentEntityInterface } from 'src/app/modules/shared/method-payment/interfaces/payment-entity.interface';
import { ProductSubProductEntityInterface } from 'src/app/modules/shared/product/interfaces/product-subproduct-entity.interface';
import { TupaHeaderTabComponent } from 'src/app/modules/shared/tupa/components/tupa-header-tab/tupa-header-tab.component';
import { TupaItemIdEnum, TupaItemTabInterface } from 'src/app/modules/shared/tupa/interfaces/tupa-item-tab.interface';
import { TupaEstablishmentTabComponent } from 'src/app/modules/shared/tupa/components/tupa-establishment-tab/tupa-esblishment-tab.component';
import { TupaPaymentTabComponent } from 'src/app/modules/shared/tupa/components/tupa-payment-tab/tupa-payment-tab.component';
import { TupaRequestTabComponent } from 'src/app/modules/shared/tupa/components/tupa-request-tab/tupa-request-tab.component';
import { Tupa04InfoAnimalComponent } from '../tupa-04-info-animal/tupa-04-info-animal.component';
import { Tupa04RecintoComponent } from '../tupa-04-recineto/tupa-04-recinto.component';

@Component({
  selector: 'app-tupa-04-tab-container',
  templateUrl: './tupa-04-tab-container.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    TupaHeaderTabComponent,
    TupaRequestTabComponent,
    TupaEstablishmentTabComponent,
    Tupa04RecintoComponent,
    Tupa04InfoAnimalComponent,
    TupaPaymentTabComponent,
  ],
})
export class Tupa04TabContainerComponent {
  tabs: TupaItemTabInterface[] = [
    {
      id: TupaItemIdEnum.PARTE_I,
      name: 'I - Información  de empresa solicitante',
      active: false,
    },
    {
      id: TupaItemIdEnum.PARTE_II,
      name: 'II - Establecimiento',
      active: true,
    },
    {
      id: TupaItemIdEnum.PARTE_III,
      name: 'III - Del Recinto',
      active: false,
    },
    {
      id: TupaItemIdEnum.PARTE_IV,
      name: 'IV - Información animales',
      active: false,
    },
    {
      id: TupaItemIdEnum.PARTE_V,
      name: 'V - Datos del pago',
      active: false,
    },
  ];

  public person?: PersonEntityInterface;
  public representante?: RepresentanteEntityInterface;
  public establishment?: EstablishmentEntityInterface;
  public technical?: PersonEntityInterface;
  public recinto = tupaRecintoData;
  public animals: ProductAnimalEntityInterface[] = [];
  public personPayment?: PersonEntityInterface;
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
