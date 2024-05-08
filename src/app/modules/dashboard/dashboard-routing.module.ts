import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { FormsComponent } from './pages/forms/forms.component';
import { MockupComponent } from './pages/mockup-05/mockup.component';
import { Tupa05Component } from './pages/tupa-05-page/tupa-05-page.component';
import { RequisitosComponent } from './pages/requisitos-page/requisitos-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'nfts', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      { path: 'podcast', component: PodcastComponent },
      { path: 'forms', component: FormsComponent },
      { path: 'mockup-05', component: MockupComponent },
      { path: 'tupa-05', component: Tupa05Component },
      { path: 'requisitos', component: RequisitosComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
