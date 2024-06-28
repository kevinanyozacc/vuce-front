import { Component, inject, Input, OnInit } from '@angular/core';
import { PaisSelectComponent } from 'src/app/modules/shared/ubigeo/components/pais-select/pais-select.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { NgIf } from '@angular/common';
import { TupaDetailService } from 'src/app/modules/shared/tupa/services/tupa-detail.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DetalleCreateInterface } from 'src/app/modules/shared/detalle/interfaces/detalle-create.interface';

@Component({
  selector: 'app-tupa-04-recinto',
  templateUrl: './tupa-04-recinto.component.html',
  standalone: true,
  imports: [NgIf, ButtonComponent, PaisSelectComponent, ReactiveFormsModule],
})
export class Tupa04RecintoComponent implements OnInit {
  @Input()
  public detailService = inject(TupaDetailService);

  public createForm = new FormGroup({
    type: new FormControl('IMP', Validators.required),
    numberPSI: new FormControl('', Validators.required),
    countrySourceId: new FormControl('', Validators.required),
    countryTargetId: new FormControl('', Validators.required),
    place: new FormControl(''),
  });

  ngOnInit(): void {
    // add detail
    this.detailService.$getDetail().subscribe((data) => {
      if (!data) return;
      this.createForm.controls.type.setValue(data?.type || 'IMP');
      this.createForm.controls.numberPSI.setValue(data.numberPSI || '');
      this.createForm.controls.countrySourceId.setValue(data?.countrySourceId || '');
      this.createForm.controls.countryTargetId.setValue(data?.countryTargetId || '');
      this.createForm.controls.place.setValue(data?.place || '');
    });
    // add form
    this.createForm.statusChanges.subscribe((data) => {
      if (data === 'INVALID') this.detailService.setIsValid(false);
    });
  }

  onCountryTarget(value: string) {
    this.createForm.controls.countryTargetId.setValue(value || null);
  }

  onSave() {
    this.detailService.setDetail(this.createForm.value as DetalleCreateInterface);
    this.detailService.setIsValid(true);
  }
}
