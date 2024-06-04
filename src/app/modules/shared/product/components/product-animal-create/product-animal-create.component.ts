import { JsonPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ProductAnimalEntityInterface } from '../../interfaces/product-animal-entity.interface';
import { ProductEntityInterface } from '../../interfaces/product-entity.interface';

@Component({
  selector: 'app-product-animal-create',
  standalone: true,
  templateUrl: './product-animal-create.component.html',
  imports: [ReactiveFormsModule, NgIf, ModalComponent, JsonPipe, ProductSearchComponent],
})
export class ProductAnimalCreateComponent {
  @Input()
  public title: string = 'Agregar Animal Vivo';

  @Input()
  public isOpen: boolean = false;

  @Output()
  public eventClose = new EventEmitter();

  @Output()
  public eventSave = new EventEmitter<ProductAnimalEntityInterface>();

  public createForm = new FormGroup({
    productId: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    origin: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
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
