import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthModule } from '../auth/auth.module';
import { BpmModule } from 'src/app/core/bpm/bpm.module';
import { bpmHttpGuard } from 'src/app/core/bpm/guards/bpm-http.guard';
import { authHttpGuard } from 'src/app/core/auth/guards/auth-http.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [bpmHttpGuard, authHttpGuard],
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AuthModule, BpmModule],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
