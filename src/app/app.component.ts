import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { ProcedureCalcTarifaService } from './modules/shared/procedure/services/procedure-calc-tarifa.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgClass, RouterOutlet, ResponsiveHelperComponent, HttpClientModule],
  providers: [ProcedureCalcTarifaService],
})
export class AppComponent {
  title = 'Senasa Tupa';

  constructor(public themeService: ThemeService) {}
}
