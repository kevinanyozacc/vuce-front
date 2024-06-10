import { Component, Input } from '@angular/core';
import { PaisSelectComponent } from 'src/app/modules/shared/ubigeo/components/pais-select/pais-select.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { TupaRecintoInterface } from '../../interfaces/tupa-recinto-interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tupa-04-recinto',
  templateUrl: './tupa-04-recinto.component.html',
  standalone: true,
  imports: [NgIf, ButtonComponent, PaisSelectComponent],
})
export class Tupa04RecintoComponent {
  @Input()
  public recinto!: TupaRecintoInterface;

  onChange(target: any) {
    const name = target.name;
    const value = target.value;
    this.recinto = Object.assign(this.recinto, { [name]: value });
  }

  onCountryTarget(value: string) {
    this.recinto.countryTargetId = value;
  }
}
