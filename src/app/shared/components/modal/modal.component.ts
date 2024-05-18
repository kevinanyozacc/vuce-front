import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input()
  public isOpen: boolean = false;

  @Input()
  public title!: string;

  @Output()
  public eventClose = new EventEmitter();
}
