import { Component, inject, Input, OnInit } from '@angular/core';
import { PaisSelectComponent } from 'src/app/modules/shared/ubigeo/components/pais-select/pais-select.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { JsonPipe, NgIf } from '@angular/common';
import { DetalleCreateInterface } from 'src/app/modules/shared/detalle/interfaces/detalle-create.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TupaDetailService } from 'src/app/modules/shared/tupa/services/tupa-detail.service';

@Component({
  selector: 'app-tupa-05-final',
  templateUrl: './tupa-05-final.component.html',
  standalone: true,
  imports: [NgIf, ButtonComponent, PaisSelectComponent, ReactiveFormsModule, JsonPipe],
  providers: [TupaDetailService],
})
export class Tupa05FinalComponent implements OnInit {
  @Input()
  public detailService: TupaDetailService = inject(TupaDetailService);

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

  handleType(type: string) {
    if (type == 'IMP') {
      this.detailService.setIsValid(false);
      this.createForm.setControl('countryTargetId', new FormControl('', Validators.required));
      this.createForm.setControl('countrySourceId', new FormControl('', Validators.required));
      this.createForm.setControl('numberPSI', new FormControl('', Validators.required));
      this.createForm.setControl('place', new FormControl(null));
    } else if (type == 'EXP') {
      this.detailService.setIsValid(false);
      this.createForm.setControl('countryTargetId', new FormControl('', Validators.required));
      this.createForm.setControl('countrySourceId', new FormControl(null));
      this.createForm.setControl('numberPSI', new FormControl(null));
      this.createForm.setControl('place', new FormControl(null));
    } else {
      this.detailService.setIsValid(false);
      this.createForm.setControl('place', new FormControl('', Validators.required));
      this.createForm.setControl('countryTargetId', new FormControl(null));
      this.createForm.setControl('countrySourceId', new FormControl(null));
      this.createForm.setControl('numberPSI', new FormControl(null));
    }
  }

  onType(value: string) {
    this.createForm.controls.type.setValue(value);
    this.handleType(value);
  }

  onCountrySource(value?: string) {
    this.createForm.controls.countrySourceId.setValue(value || null);
  }

  onCountryTarget(value?: string) {
    this.createForm.controls.countryTargetId.setValue(value || null);
  }

  onSave() {
    this.detailService.setDetail(this.createForm.value as DetalleCreateInterface);
    this.detailService.setIsValid(true);
  }
}
