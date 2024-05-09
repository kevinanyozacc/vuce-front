import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TupaRequisitosTabInterface, TuparequisitoTabIdEnum } from '../../interfaces/requisitos-tab.interface';
import { RequisitosTabHeaderComponent } from '../requisitos-tab-header/requisitos-tab-header.component';
import { RequisitosAdjuntosComponent } from '../requisitos-adjuntos/requisitos-adjuntos.component';

@Component({
  selector: 'app-requisitos-tab-container',
  standalone: true,
  imports: [
    NgFor, 
    NgIf,
    RequisitosTabHeaderComponent,
    RequisitosAdjuntosComponent,
  ],
  templateUrl: './requisitos-tab-container.component.html',
})
export class RequisitosTabContainerComponent {

  tabs: TupaRequisitosTabInterface[]= [
    {
      id:TuparequisitoTabIdEnum.REQUISITOS,
      name: 'Requisitos Adjuntos',
      active: true,
    },
  ]

  onSelect(item: TupaRequisitosTabInterface){
    this.tabs = this.tabs.map((tab)=>{
      tab.active = item.id === tab.id
      return tab;
    })
  }

  get currentTab(): TupaRequisitosTabInterface | undefined {
    return this.tabs.find((item) => item.active);
  }

  get currentTabKey(): TuparequisitoTabIdEnum {
    const tab = this.tabs.find((item) => item.active);
    return tab?.id || TuparequisitoTabIdEnum.REQUISITOS
  }

}
