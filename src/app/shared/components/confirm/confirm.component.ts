import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  standalone: true,
  templateUrl: './confirm.component.html',
  imports: [NgIf],
})
export class ConfirmComponent {
  @Input()
  public title!: string;

  @Input()
  public text!: string;

  @Input()
  public isOpen = false;

  @Output()
  public eventSuccess = new EventEmitter();

  @Output()
  public eventClose = new EventEmitter();

  public onClose() {
    this.eventClose.emit();
  }
}
