import { JsonPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ProductEntityInterface } from '../../interfaces/product-entity.interface';
import { ProductSubProductEntityInterface } from '../../interfaces/product-subproduct-entity.interface';

@Component({
  selector: 'app-product-subproduct-create',
  standalone: true,
  templateUrl: './product-subproduct-create.component.html',
  imports: [ReactiveFormsModule, NgIf, ModalComponent, JsonPipe, ProductSearchComponent],
})
export class ProductSubProductCreateComponent {
  @Input()
  public title: string = 'Agregar Producto/SubProducto';

  @Input()
  public isOpen: boolean = false;

  @Output()
  public eventClose = new EventEmitter();

  @Output()
  public eventSave = new EventEmitter<ProductSubProductEntityInterface>();

  public createForm = new FormGroup({
    productId: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    authorizeName: new FormControl('', Validators.required),
  });

  public isSearch = false;

  onClose() {
    this.eventClose.emit();
  }

  openSearch() {
    this.isSearch = true;
  }

  closeSearch() {
    this.isSearch = false;
  }

  onProduct(product?: ProductEntityInterface) {
    this.closeSearch();
    this.createForm.controls.productId.setValue(product?.arancelariaId || '');
    this.createForm.controls.productName.setValue(product?.name || '');
  }

  onSubmit() {
    this.onClose();
    this.eventSave.emit(this.createForm.value as any);
  }
}
