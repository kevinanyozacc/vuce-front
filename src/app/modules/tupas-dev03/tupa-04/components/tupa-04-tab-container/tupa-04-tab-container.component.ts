import { Component } from '@angular/core';
import { Tupa04TabHeaderComponent } from '../tupa-04-tab-header/tupa-04-tab-header.component';
import { NgFor, NgIf } from '@angular/common';
import { Tupa04ParteIIComponent } from '../tupa-04-parte-ii/tupa-04-parte-ii.component';
import { Tupa04ParteIComponent } from '../tupa-04-parte-i/tupa-04-parte-i.component';
import { Tupa04ParteIIIComponent } from '../tupa-04-parte-iii/tupa-04-parte-iii.component';
import { Tupa04ParteIVComponent } from '../tupa-04-parte-iv/tupa-04-parte-iv.component';
import { Tupa04ParteVComponent } from '../tupa-04-parte-v/tupa-04-parte-v.component';
import { Tupa04TabIdEnum, Tupa04TabInterface } from '../../interfaces/tupa-05-tab.interface';

@Component({
  selector: 'app-tupa-04-tab-container',
  templateUrl:'./tupa-04-tab-container.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    Tupa04TabHeaderComponent,
    Tupa04ParteIComponent,
    Tupa04ParteIIComponent,
    Tupa04ParteIIIComponent,
    Tupa04ParteIVComponent,
    Tupa04ParteVComponent,
  ],
})

export class Tupa04TabContainerComponent {
  tabs: Tupa04TabInterface[] = [
    {
      id: Tupa04TabIdEnum.PARTE_I,
      name: 'I - Información  de empresa solicitante',
      active: true,
    },
    {
      id: Tupa04TabIdEnum.PARTE_II,
      name: 'II - Establecimiento',
      active: false,
    },
    {
      id: Tupa04TabIdEnum.PARTE_III,
      name: 'III - Finalidad',
      active: false,
    },
    {
      id: Tupa04TabIdEnum.PARTE_IV,
      name: 'IV - Mercancia pecuaria',
      active: false,
    },
    {
      id: Tupa04TabIdEnum.PARTE_V,
      name: 'V - Datos del pago',
      active: false,
    },
  ];

  onSelect(item: Tupa04TabInterface) {
    this.tabs = this.tabs.map((tab) => {
      tab.active = item.id === tab.id;
      return tab;
    });
  }

  get currentTab(): Tupa04TabInterface | undefined {
    return this.tabs.find((item) => item.active);
  }

  get currentTabKey(): Tupa04TabIdEnum {
    const tab = this.tabs.find((item) => item.active);
    return tab?.id || Tupa04TabIdEnum.PARTE_I;
  }
}
