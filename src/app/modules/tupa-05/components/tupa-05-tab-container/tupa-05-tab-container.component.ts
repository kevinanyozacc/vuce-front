import { Component } from '@angular/core';
import { Tupa05TabHeaderComponent } from '../tupa-05-tab-header/tupa-05-tab-header.component';
import { Tupa05TabIdEnum, Tupa05TabInterface } from '../../interfaces/tupa-05-tab.interface';
import { NgFor, NgIf } from '@angular/common';
import { Tup05ParteIComponent } from '../tupa-05-parte-i/tupa-05-parte-i.component';
import { Tup05ParteIIComponent } from '../tupa-05-parte-ii/tupa-05-parte-ii.component';
import { Tup05ParteIIIComponent } from '../tupa-05-parte-iii/tupa-05-parte-iii.component';
import { Tup05ParteIVComponent } from '../tupa-05-parte-iv/tupa-05-parte-iv.component';
import { Tup05ParteVComponent } from '../tupa-05-parte-v/tupa-05-parte-v.component';
import { PersonEntityInterface } from 'src/app/modules/shared/person/interfaces/person-entity.interface';
import { EstablishmentEntityInterface } from 'src/app/modules/shared/establishment/interfaces/establishment-entity.interface';
import { tupaFinalidadData } from '../../data/tupa-finalidad.data';
import { PaymentEntityInterface } from 'src/app/modules/shared/method-payment/interfaces/payment-entity.interface';

@Component({
  selector: 'app-tupa-05-tab-container',
  templateUrl: './tupa-05-tab-container.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    Tupa05TabHeaderComponent,
    Tup05ParteIComponent,
    Tup05ParteIIComponent,
    Tup05ParteIIIComponent,
    Tup05ParteIVComponent,
    Tup05ParteVComponent,
  ],
})
export class Tupa05TabContainerComponent {
  tabs: Tupa05TabInterface[] = [
    {
      id: Tupa05TabIdEnum.PARTE_I,
      name: 'I - Información  de empresa solicitante',
      active: false,
    },
    {
      id: Tupa05TabIdEnum.PARTE_II,
      name: 'II - Establecimiento',
      active: false,
    },
    {
      id: Tupa05TabIdEnum.PARTE_III,
      name: 'III - Finalidad',
      active: false,
    },
    {
      id: Tupa05TabIdEnum.PARTE_IV,
      name: 'IV - Mercancia pecuaria',
      active: false,
    },
    {
      id: Tupa05TabIdEnum.PARTE_V,
      name: 'V - Datos del pago',
      active: true,
    },
  ];

  public person?: PersonEntityInterface;
  public establishment?: EstablishmentEntityInterface;
  public technical?: PersonEntityInterface;
  public finalidad = tupaFinalidadData;
  public personPayment?: PersonEntityInterface;
  public payments: PaymentEntityInterface[] = [];

  onSelect(item: Tupa05TabInterface) {
    this.tabs = this.tabs.map((tab) => {
      tab.active = item.id === tab.id;
      return tab;
    });
  }

  selectPerson(person?: PersonEntityInterface) {
    this.person = person;
  }

  selectEstablishment(establishment?: EstablishmentEntityInterface) {
    this.establishment = establishment;
  }

  selectTechnical(technical?: PersonEntityInterface) {
    this.technical = technical;
  }

  selectPersonPayment(personPayment?: PersonEntityInterface) {
    this.personPayment = personPayment;
  }

  get currentTab(): Tupa05TabInterface | undefined {
    return this.tabs.find((item) => item.active);
  }

  get currentTabKey(): Tupa05TabIdEnum {
    const tab = this.tabs.find((item) => item.active);
    return tab?.id || Tupa05TabIdEnum.PARTE_I;
  }
}
