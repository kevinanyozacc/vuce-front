import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TupaPayloadInterface } from '../../../tupa/interfaces/tupa-payload.interface';
import { ProductCuarentenaEntityInterface } from '../../interfaces/product-cuarentena-entity.interface';
import { NgFor, NgIf } from '@angular/common';
import { ProductSubProductEditComponent } from '../product-subproduct-edit/product-subproduct-edit.component';

@Component({
  selector: 'app-product-subproduct-table',
  standalone: true,
  templateUrl: './product-subproduct-table.component.html',
  imports: [AngularSvgIconModule, NgIf, NgFor, ProductSubProductEditComponent],
})
export class ProductSubproductTableComponent {
  @Input()
  public data: ProductCuarentenaEntityInterface[] = [];

  @Output()
  public eventEdit = new EventEmitter<TupaPayloadInterface<ProductCuarentenaEntityInterface>>();

  @Output()
  public eventDelete = new EventEmitter<TupaPayloadInterface<ProductCuarentenaEntityInterface>>();

  public isOpen: boolean = false;
  public product!: ProductCuarentenaEntityInterface;
  public index: number = 0;

  public openEdit(data: TupaPayloadInterface<ProductCuarentenaEntityInterface>) {
    this.product = data.payload;
    this.index = data.row;
    this.isOpen = true;
  }

  public closeEdit() {
    this.isOpen = false;
  }

  public onEdit(payload: ProductCuarentenaEntityInterface) {
    this.eventEdit.emit({ row: this.index, payload });
  }
}
