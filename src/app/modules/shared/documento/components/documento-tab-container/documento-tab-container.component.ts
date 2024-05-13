import { Component } from '@angular/core';
import { TupaDocumentosResolutivosTabInterface, TuparDocumentosResolutivosTabIdEnum } from '../../interfaces/documentos-tab.interface';
import { DocumentoTabHeaderComponent } from '../documento-tab-header/documento-tab-header.component';
import { NgFor, NgIf } from '@angular/common';
import { DocumentoResolutivoComponent } from '../derivacion-documento-resolutivo/documento-resolutivo.component';

@Component({
  selector: 'app-documento-tab-container',
  standalone: true,
  imports: [
    NgFor, 
    NgIf,
    DocumentoTabHeaderComponent,
    DocumentoResolutivoComponent],
  templateUrl: './documento-tab-container.component.html',
})
export class DocumentoTabContainerComponent {

  tabs: TupaDocumentosResolutivosTabInterface[]= [
    {
      id:TuparDocumentosResolutivosTabIdEnum.EXPEDIENTE,
      name: 'Requisitos Adjuntos',
      active: true,
    },
  ]

  onSelect(item: TupaDocumentosResolutivosTabInterface){
    this.tabs = this.tabs.map((tab)=>{
      tab.active = item.id === tab.id
      return tab;
    })
  }

  get currentTab(): TupaDocumentosResolutivosTabInterface | undefined {
    return this.tabs.find((item) => item.active);
  }

  get currentTabKey(): TuparDocumentosResolutivosTabIdEnum {
    const tab = this.tabs.find((item) => item.active);
    return tab?.id || TuparDocumentosResolutivosTabIdEnum.EXPEDIENTE
  }
  
}
