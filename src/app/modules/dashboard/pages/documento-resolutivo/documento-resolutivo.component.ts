import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { DocumentoTabContainerComponent } from 'src/app/modules/shared/documento/components/documento-tab-container/documento-tab-container.component';

@Component({
  selector: 'app-documento-resolutivo',
  standalone: true,
  imports: [
    DashboardHeaderComponent,
    DocumentoTabContainerComponent
  ],
  templateUrl: './documento-resolutivo.component.html',
})
export class DocumentoResolutivoComponent {

}
