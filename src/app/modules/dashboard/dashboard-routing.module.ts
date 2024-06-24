import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { RequisitosComponent } from './pages/requisitos-page/requisitos-page.component';
import { DocumentoResolutivoComponent } from './pages/documento-resolutivo/documento-resolutivo.component';
import { Tupa04Component } from './pages/tupa-04-page/tupa-04-page.component';
import { Tupa05PageCreateComponent } from './pages/tupa-05-page/components/tupa-05-page-create/tupa-05-page-create.component';
import { Tupa05PageFindComponent } from './pages/tupa-05-page/components/tupa-05-page-find/tupa-05-page-find.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'nfts', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      { path: 'tupa-05', component: Tupa05PageCreateComponent },
      { path: 'tupa-05/:id', component: Tupa05PageFindComponent },
      { path: 'tupa-04', component: Tupa04Component },
      { path: 'requisitos', component: RequisitosComponent },
      { path: 'documentos', component: DocumentoResolutivoComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
