import { Component, Input, OnInit } from '@angular/core';
import { PaisSelectComponent } from 'src/app/modules/shared/ubigeo/components/pais-select/pais-select.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { TupaFinalidadInterface } from '../../interfaces/tupa-finalidad.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tupa-05-parte-iii',
  templateUrl: './tupa-05-parte-iii.component.html',
  standalone: true,
  imports: [NgIf, ButtonComponent, PaisSelectComponent],
})
export class Tup05ParteIIIComponent implements OnInit {
  @Input()
  public finalidad!: TupaFinalidadInterface;

  ngOnInit(): void {
    this.handleType(this.finalidad.type);
  }

  handleType(type: string) {
    if (type == 'IMP') {
      this.finalidad.countrySourceId = '4028';
      this.finalidad.countryTargetId = '4028';
      this.finalidad.place = undefined;
    } else if (type == 'EXP') {
      this.finalidad.countryTargetId = '4028';
      this.finalidad.countrySourceId = undefined;
      this.finalidad.place = undefined;
    } else {
      this.finalidad.countrySourceId = undefined;
      this.finalidad.countryTargetId = undefined;
    }
  }

  onType(value: any) {
    this.finalidad.type = value;
    this.handleType(value);
  }

  onChange(target: any) {
    const name = target.name;
    const value = target.value;
    this.finalidad = Object.assign(this.finalidad, { [name]: value });
  }

  onCountrySource(value?: string) {
    this.finalidad.countrySourceId = value;
  }

  onCountryTarget(value?: string) {
    this.finalidad.countryTargetId = value;
  }
}
