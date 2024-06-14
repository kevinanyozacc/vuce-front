import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductAnimalCreateComponent } from 'src/app/modules/shared/product/components/product-animal-create/product-animal-create.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { NgFor, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ProductAnimalEditComponent } from 'src/app/modules/shared/product/components/product-animal-edit/product-animal-edit.component';
import { ProductCuarentenaEntityInterface } from 'src/app/modules/shared/product/interfaces/product-cuarentena-entity.interface';
import { ProductTypeEnum } from 'src/app/modules/shared/product/enums/product-type.enum';

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
  public cuarentenas: ProductCuarentenaEntityInterface[] = [];

  @Output()
  public eventDelete = new EventEmitter<ProductCuarentenaEntityInterface>();

  public isOpenCreateAnimal = false;
  public isOpenEditAnimal = false;
  public isOpenCreateSubProduct = false;
  public isOpenEditSubProduct = false;
  public cuarentena?: ProductCuarentenaEntityInterface;

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

  onAdd(animal: ProductCuarentenaEntityInterface) {
    const type = ProductTypeEnum.ANIMAL;
    const currentAnimal = this.cuarentenas.findIndex((item) => item.productId == animal.productId);
    if (currentAnimal >= 0) {
      this.cuarentenas[currentAnimal] = { ...animal, type };
    } else {
      this.cuarentenas.push({ ...animal, type });
    }
  }

  onEdit(cuarentena: ProductCuarentenaEntityInterface) {
    this.cuarentena = cuarentena;
    this.openEditAnimal();
  }

  onDelete(cuarentena: ProductCuarentenaEntityInterface) {
    this.eventDelete.emit(cuarentena);
  }
}
