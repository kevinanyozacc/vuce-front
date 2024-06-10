import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductAnimalCreateComponent } from 'src/app/modules/shared/product/components/product-animal-create/product-animal-create.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ProductAnimalEntityInterface } from 'src/app/modules/shared/product/interfaces/product-animal-entity.interface';
import { NgFor, NgIf } from '@angular/common';
import { ProductSubProductCreateComponent } from 'src/app/modules/shared/product/components/product-subproduct-create/product-subproduct-create.component';
import { ProductSubProductEntityInterface } from 'src/app/modules/shared/product/interfaces/product-subproduct-entity.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { tupaProductAnimalData, tupaProductSubProductData } from '../../data/tupa-product.data';
import { ProductAnimalEditComponent } from 'src/app/modules/shared/product/components/product-animal-edit/product-animal-edit.component';
import { ProductSubProductEditComponent } from 'src/app/modules/shared/product/components/product-subproduct-edit/product-subproduct-edit.component';
import { Tupa05ProductTypeEnum } from '../../enums/tupa-05-product-type.enum';

@Component({
  selector: 'app-tupa-05-mercancia-pecuaria',
  templateUrl: './tupa-05-mercancia-pecuaria.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AngularSvgIconModule,
    ButtonComponent,
    ProductAnimalCreateComponent,
    ProductAnimalEditComponent,
    ProductSubProductCreateComponent,
    ProductSubProductEditComponent,
  ],
})
export class Tupa05MercanciaPecuariaComponent {
  @Input()
  public animals: ProductAnimalEntityInterface[] = [];

  @Input()
  public subProducts: ProductSubProductEntityInterface[] = [];

  @Input()
  public productType!: Tupa05ProductTypeEnum;

  @Output()
  public eventType = new EventEmitter<Tupa05ProductTypeEnum>();

  public isOpenCreateAnimal = false;
  public isOpenEditAnimal = false;
  public isOpenCreateSubProduct = false;
  public isOpenEditSubProduct = false;
  public animal?: ProductAnimalEntityInterface;
  public subProduct?: ProductSubProductEntityInterface;

  openCreateAnimal() {
    this.isOpenCreateAnimal = true;
  }

  closeCreateAnimal() {
    this.isOpenCreateAnimal = false;
  }

  openEditAnimal() {
    this.isOpenEditAnimal = true;
  }

  closeEditAnimal() {
    this.isOpenEditAnimal = false;
  }

  openCreateSubProduct() {
    this.isOpenCreateSubProduct = true;
  }

  closeCreateSubProduct() {
    this.isOpenCreateSubProduct = false;
  }

  openEditSubProduct() {
    this.isOpenEditSubProduct = true;
  }

  closeEditSubProduct() {
    this.isOpenEditSubProduct = false;
  }

  handleType(type: string) {
    if (type == Tupa05ProductTypeEnum.ANIMAL) {
      this.subProducts = [];
      this.eventType.emit(Tupa05ProductTypeEnum.ANIMAL);
    } else {
      this.animals = [];
      this.eventType.emit(Tupa05ProductTypeEnum.PRODUCT);
    }
  }

  onAnimal(animal: ProductAnimalEntityInterface) {
    const currentAnimal = this.animals.findIndex((item) => item.productId == animal.productId);
    if (currentAnimal >= 0) {
      this.animals[currentAnimal] = animal;
    } else {
      this.animals.push(animal);
    }
  }

  editAnimal(animal: ProductAnimalEntityInterface) {
    this.animal = animal;
    this.openEditAnimal();
  }

  deleteAnimal(animal: ProductAnimalEntityInterface) {
    this.animals = this.animals.filter((item) => item.productId !== animal.productId);
  }

  onSubProduct(subproduct: ProductSubProductEntityInterface) {
    const currentSubproduct = this.subProducts.findIndex((item) => item.productId == subproduct.productId);
    if (currentSubproduct >= 0) {
      this.subProducts[currentSubproduct] = subproduct;
    } else {
      this.subProducts.push(subproduct);
    }
  }

  editSubProduct(subproduct: ProductSubProductEntityInterface) {
    this.subProduct = subproduct;
    this.openEditSubProduct();
  }

  deleteSubProduct(subproduct: ProductSubProductEntityInterface) {
    this.subProducts = this.subProducts.filter((item) => item.productId !== subproduct.productId);
  }
}
