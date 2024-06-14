import { JsonPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ProductCuarentenaEntityInterface } from '../../interfaces/product-cuarentena-entity.interface';

@Component({
  selector: 'app-product-animal-edit',
  standalone: true,
  templateUrl: './product-animal-edit.component.html',
  imports: [ReactiveFormsModule, NgIf, ModalComponent, JsonPipe],
})
export class ProductAnimalEditComponent implements OnChanges {
  @Input()
  public title: string = 'Editar Animal Vivo';

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
    gender: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    origin: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
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
    this.editForm.controls.gender.setValue(this.product?.gender || '');
    this.editForm.controls.age.setValue(this.product?.age || '');
    this.editForm.controls.origin.setValue(this.product?.origin || '');
    this.editForm.controls.amount.setValue(this.product?.amount?.toString() || '');
  }

  onClose() {
    this.eventClose.emit();
  }

  onSubmit() {
    this.onClose();
    this.eventSave.emit(this.editForm.value as any);
  }
}
