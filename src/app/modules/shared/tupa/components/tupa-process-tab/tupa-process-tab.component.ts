import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TupaProcessStatusEnum } from '../../enum/tupa-process.enum';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { ExpedienteEntityInterface } from '../../../expediente/interfaces/expediente-entity.interface';
import { ContentLoadingComponent } from 'src/app/shared/components/content-loading/content-loading.component';

@Component({
  selector: 'app-tupa-process-tab',
  templateUrl: './tupa-process-tab.component.html',
  standalone: true,
  imports: [NgIf, ConfirmComponent, ContentLoadingComponent],
})
export class TupaProcessTabComponent {
  @Input()
  public title: string = '';

  @Input()
  public finishedLoading = false;

  @Input()
  public cancelLoading = false;

  @Input()
  public expediente?: ExpedienteEntityInterface;

  @Input()
  public canAction: boolean = false;

  @Input()
  public status: TupaProcessStatusEnum | any = TupaProcessStatusEnum.PROCESS;

  @Output()
  public eventSave = new EventEmitter();

  @Output()
  public eventFinished = new EventEmitter();

  @Output()
  public eventCancel = new EventEmitter();

  public isOpen = false;

  public onCancel() {
    if (!this.expediente) return this.eventCancel.emit();
    this.isOpen = true;
  }

  public contentMessageConfirm() {
    return `¿Esta seguro de cancelar la operacion y no continuar con el proceso de generacion del expediente
      ${this.expediente?.id}. Si acepta, no continuara con el expediente en su bandeja BPM.?`;
  }

  public onClose() {
    this.isOpen = false;
  }

  public onConfirm() {
    this.isOpen = false;
    this.eventCancel.emit();
  }
}
