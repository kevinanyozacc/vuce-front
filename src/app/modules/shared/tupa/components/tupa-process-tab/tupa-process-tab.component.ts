import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tupa-process-tab',
  templateUrl: './tupa-process-tab.component.html',
  standalone: true,
  imports: [NgIf],
})
export class TupaProcessTabComponent {
  @Input()
  public title: string = '';

  @Input()
  public showProcess: boolean = false;

  @Input()
  public enabledContinue: boolean = false;

  @Input()
  public enabledFinished: boolean = false;

  @Input()
  public enabledCancel: boolean = false;

  @Output()
  public eventContinue = new EventEmitter();

  @Output()
  public eventFinished = new EventEmitter();

  @Output()
  public eventCancel = new EventEmitter();
}
