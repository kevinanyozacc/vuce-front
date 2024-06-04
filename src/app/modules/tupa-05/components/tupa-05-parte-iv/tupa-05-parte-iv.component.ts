import { Component, Input } from '@angular/core';
import { ProductAnimalCreateComponent } from 'src/app/modules/shared/product/components/product-animal-create/product-animal-create.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ProductAnimalEntityInterface } from 'src/app/modules/shared/product/interfaces/product-animal-entity.interface';
import { NgFor } from '@angular/common';
import { ProductSubProductCreateComponent } from 'src/app/modules/shared/product/components/product-subproduct-create/product-subproduct-create.component';
import { ProductSubProductEntityInterface } from 'src/app/modules/shared/product/interfaces/product-subproduct-entity.interface';

@Component({
  selector: 'app-tupa-05-parte-iv',
  templateUrl: './tupa-05-parte-iv.component.html',
  standalone: true,
  imports: [NgFor, ButtonComponent, ProductAnimalCreateComponent, ProductSubProductCreateComponent],
})
export class Tup05ParteIVComponent {
  @Input()
  public animals: ProductAnimalEntityInterface[] = [];

  @Input()
  public subProducts: ProductSubProductEntityInterface[] = [];

  public isOpenCreateAnimal = false;
  public isOpenCreateSubProduct = false;

  openCreateAnimal() {
    this.isOpenCreateAnimal = true;
  }

  closeCreateAnimal() {
    this.isOpenCreateAnimal = false;
  }

  openCreateSubProduct() {
    this.isOpenCreateSubProduct = true;
  }

  closeCreateSubProduct() {
    this.isOpenCreateSubProduct = false;
  }

  onAnimal(animal: ProductAnimalEntityInterface) {
    this.animals.push(animal);
  }

  onSubProduct(subproduct: ProductSubProductEntityInterface) {
    this.subProducts.push(subproduct);
  }
}
