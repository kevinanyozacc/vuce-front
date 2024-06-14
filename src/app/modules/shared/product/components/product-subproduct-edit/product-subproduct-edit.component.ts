import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ProductCuarentenaEntityInterface } from '../../interfaces/product-cuarentena-entity.interface';

@Component({
  selector: 'app-product-subproduct-edit',
  standalone: true,
  templateUrl: './product-subproduct-edit.component.html',
  imports: [ReactiveFormsModule, NgIf, ModalComponent],
})
export class ProductSubProductEditComponent implements OnChanges {
  @Input()
  public title: string = 'Editar Producto/SubProducto';

  @Input()
  public isOpen: boolean = false;

  @Input()
  public product?: ProductCuarentenaEntityInterface;

  @Output()
  public eventClose = new EventEmitter();

  @Output()
  public eventSave = new EventEmitter<ProductCuarentenaEntityInterface>();

  public editForm = new FormGroup({
    productId: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    authorizeName: new FormControl('', Validators.required),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['product']?.currentValue) {
      this.init();
    }
  }

  init() {
    if (!this.product) return;
    this.editForm.controls.productId.setValue(this.product.productId);
    this.editForm.controls.productName.setValue(this.product.productName);
    this.editForm.controls.weight.setValue(this.product?.weight || '');
    this.editForm.controls.authorizeName.setValue(this.product?.authorizeName || '');
  }

  onClose() {
    this.eventClose.emit();
  }

  onSubmit() {
    this.onClose();
    this.eventSave.emit(this.editForm.value as any);
  }
}
