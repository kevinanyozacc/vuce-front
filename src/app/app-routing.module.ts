import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthProfileService } from './core/auth/services/auth-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './core/auth/auth.module';
import { BpmModule } from './core/bpm/bpm.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  { path: '**', redirectTo: 'errors/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule, AuthModule, BpmModule],
  providers: [AuthProfileService],
  exports: [RouterModule],
})
export class AppRoutingModule {}
