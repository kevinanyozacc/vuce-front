import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { authBpmGuard } from 'src/app/core/auth/guards/auth-bpm.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authBpmGuard],
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
