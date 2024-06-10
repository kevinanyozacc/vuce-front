import { Component, Input, OnInit } from '@angular/core';
import { ProductAnimalCreateComponent } from 'src/app/modules/shared/product/components/product-animal-create/product-animal-create.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ProductAnimalEntityInterface } from 'src/app/modules/shared/product/interfaces/product-animal-entity.interface';
import { NgFor, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { tupaProductAnimalData } from '../../data/tupa-product.data';
import { ProductAnimalEditComponent } from 'src/app/modules/shared/product/components/product-animal-edit/product-animal-edit.component';

@Component({
  selector: 'app-tupa-04-info-animal',
  templateUrl: './tupa-04-info-animal.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AngularSvgIconModule,
    ButtonComponent,
    ProductAnimalCreateComponent,
    ProductAnimalEditComponent,
  ],
})
export class Tupa04InfoAnimalComponent {
  @Input()
  public animals: ProductAnimalEntityInterface[] = [];

  public isOpenCreateAnimal = false;
  public isOpenEditAnimal = false;
  public isOpenCreateSubProduct = false;
  public isOpenEditSubProduct = false;
  public animal?: ProductAnimalEntityInterface;

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
}
