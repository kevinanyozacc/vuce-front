import { Component } from '@angular/core';
import { Tupa05TabHeaderComponent } from '../tupa-05-tab-header/tupa-05-tab-header.component';
import { Tupa05TabIdEnum, Tupa05TabInterface } from '../../interfaces/tupa-05-tab.interface';
import { NgFor } from '@angular/common';
import { Tup05SolicitanteComponent } from '../tupa-05-solicitante/tupa-05-solicitante.component';

@Component({
  selector: 'app-tupa-05-tab-container',
  templateUrl: './tupa-05-tab-container.component.html',
  standalone: true,
  imports: [NgFor, Tupa05TabHeaderComponent, Tup05SolicitanteComponent],
})
export class Tupa05TabContainerComponent {
  tabs: Tupa05TabInterface[] = [
    {
      id: Tupa05TabIdEnum.SOLICITANTE,
      name: 'Información  de empresa solicitante',
      active: true,
    },
    {
      id: Tupa05TabIdEnum.GENERALES,
      name: 'Datos generales',
      active: false,
    },
    {
      id: Tupa05TabIdEnum.ALMACEN,
      name: 'Datos del almacén a evaluar',
      active: false,
    },
    {
      id: Tupa05TabIdEnum.PAGO,
      name: 'Datos del pago',
      active: false,
    },
    {
      id: Tupa05TabIdEnum.EXPEDIENTE,
      name: 'Información del expediente',
      active: false,
    },
  ];

  onSelect(item: Tupa05TabInterface) {
    this.tabs = this.tabs.map((tab) => {
      tab.active = item.id === tab.id;
      return tab;
    });
  }

  get currentTab(): Tupa05TabInterface | undefined {
    return this.tabs.find((item) => item.active);
  }
}
