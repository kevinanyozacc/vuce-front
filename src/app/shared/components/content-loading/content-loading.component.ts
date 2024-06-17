import { Component } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-content-loading',
  standalone: true,
  templateUrl: './content-loading.component.html',
  imports: [LoadingComponent],
})
export class ContentLoadingComponent {}
