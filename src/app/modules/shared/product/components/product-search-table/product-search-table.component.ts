import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEntityInterface } from '../../interfaces/product-entity.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-search-table',
  standalone: true,
  templateUrl: './product-seach-table.component.html',
  imports: [NgFor],
})
export class ProductSearchTableComponent {
  @Input()
  public data: ProductEntityInterface[] = [];

  @Output()
  public eventSelect = new EventEmitter<ProductEntityInterface | undefined>();
}
