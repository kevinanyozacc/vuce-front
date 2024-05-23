import { Component } from '@angular/core';
import { PaisSelectComponent } from 'src/app/modules/shared/ubigeo/components/pais-select/pais-select.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-tupa-05-parte-iii',
  templateUrl: './tupa-05-parte-iii.component.html',
  standalone: true,
  imports: [ButtonComponent, PaisSelectComponent],
})
export class Tup05ParteIIIComponent {}
