import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-establishment-type-select',
  standalone: true,
  templateUrl: './establishment-type-select.component.html',
  imports: [FormsModule],
})
export class EstablishmentTypeSelectComponent {
  @Input()
  public value?: string | null;

  @Input()
  public isDisabled?: boolean;

  @Output() eventChange = new EventEmitter<string>();

  onChange(event: any) {
    this.eventChange.emit(event.target.value || '');
  }
}
