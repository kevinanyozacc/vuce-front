import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaisSelectComponent } from 'src/app/modules/shared/ubigeo/components/pais-select/pais-select.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { JsonPipe, NgIf } from '@angular/common';
import { DetalleCreateInterface } from 'src/app/modules/shared/detalle/interfaces/detalle-create.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tupa-05-final',
  templateUrl: './tupa-05-final.component.html',
  standalone: true,
  imports: [NgIf, ButtonComponent, PaisSelectComponent, ReactiveFormsModule, JsonPipe],
})
export class Tupa05FinalComponent implements OnInit {
  @Input()
  public finalidad!: DetalleCreateInterface;

  @Output()
  public eventSave = new EventEmitter<DetalleCreateInterface>();

  public createForm = new FormGroup({
    type: new FormControl('IMP', Validators.required),
    numberPSI: new FormControl('', Validators.required),
    countrySourceId: new FormControl('', Validators.required),
    countryTargetId: new FormControl('', Validators.required),
    place: new FormControl(''),
  });

  ngOnInit(): void {
    this.init();
  }

  init() {
    if (!this.finalidad) return;
    this.createForm.controls.type.setValue(this.finalidad?.type);
    this.createForm.controls.numberPSI.setValue(this.finalidad.numberPSI || '');
    this.createForm.controls.countrySourceId.setValue(this.finalidad?.countrySourceId || '');
    this.createForm.controls.countryTargetId.setValue(this.finalidad?.countryTargetId || '');
    this.createForm.controls.place.setValue(this.finalidad?.place || '');
  }

  handleType(type: string) {
    if (type == 'IMP') {
      this.createForm.setControl('countryTargetId', new FormControl('4028', Validators.required));
      this.createForm.setControl('countrySourceId', new FormControl('4028', Validators.required));
      this.createForm.setControl('numberPSI', new FormControl('', Validators.required));
      this.createForm.setControl('place', new FormControl(null));
    } else if (type == 'EXP') {
      this.createForm.setControl('countryTargetId', new FormControl('4028', Validators.required));
      this.createForm.setControl('countrySourceId', new FormControl(null));
      this.createForm.setControl('numberPSI', new FormControl(null));
      this.createForm.setControl('place', new FormControl(null));
    } else {
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
    this.eventSave.emit(this.createForm.value as any);
  }
}
