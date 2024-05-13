import { Component } from '@angular/core';
import { TupaDocumentosResolutivosTabInterface, TuparDocumentosResolutivosTabIdEnum } from '../../interfaces/documentos-tab.interface';
import { DocumentoTabHeaderComponent } from '../documento-tab-header/documento-tab-header.component';
import { NgFor, NgIf } from '@angular/common';
import { InformacionExpedienteComponent } from '../informacion-expediente-i/informacion-expediente/informacion-expediente.component';
import { ObservacionComponent } from '../observacion-ii/observacion/observacion.component';
import { DocumentoResolutivoComponent } from '../derivacion-documento-resolutivo-iii/documento-resolutivo/documento-resolutivo.component';
import { TrazabilidadComponent } from '../trazabilidad-iv/trazabilidad/trazabilidad.component';

@Component({
  selector: 'app-documento-tab-container',
  standalone: true,
  imports: [
    NgFor, 
    NgIf,
    DocumentoTabHeaderComponent,
    InformacionExpedienteComponent,
    ObservacionComponent,
    TrazabilidadComponent,
    DocumentoResolutivoComponent
  ],
  templateUrl: './documento-tab-container.component.html',
})
export class DocumentoTabContainerComponent {

  tabs: TupaDocumentosResolutivosTabInterface[]= [
    {
      id:TuparDocumentosResolutivosTabIdEnum.EXPEDIENTE,
      name: 'Informacion de Expediente',
      active: true,
    },
    {
      id:TuparDocumentosResolutivosTabIdEnum.OBSERVACIONES,
      name: 'Observaciones',
      active: false,
    },
    {
      id:TuparDocumentosResolutivosTabIdEnum.DERIVACION,
      name: 'Derivacion y Documento Resolutivo',
      active: false,
    },
    {
      id:TuparDocumentosResolutivosTabIdEnum.TRAZABILIDAD,
      name: 'Trazabilidad',
      active: false,
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
