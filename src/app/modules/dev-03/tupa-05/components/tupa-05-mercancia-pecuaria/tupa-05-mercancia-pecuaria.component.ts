import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductAnimalCreateComponent } from 'src/app/modules/shared/product/components/product-animal-create/product-animal-create.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { NgFor, NgIf } from '@angular/common';
import { ProductSubProductCreateComponent } from 'src/app/modules/shared/product/components/product-subproduct-create/product-subproduct-create.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ProductAnimalEditComponent } from 'src/app/modules/shared/product/components/product-animal-edit/product-animal-edit.component';
import { ProductSubProductEditComponent } from 'src/app/modules/shared/product/components/product-subproduct-edit/product-subproduct-edit.component';
import { ProductCuarentenaEntityInterface } from 'src/app/modules/shared/product/interfaces/product-cuarentena-entity.interface';
import { ProductTypeEnum } from 'src/app/modules/shared/product/enums/product-type.enum';

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
  public cuarentenas: ProductCuarentenaEntityInterface[] = [];

  @Input()
  public productType!: ProductTypeEnum;

  @Output()
  public eventType = new EventEmitter<ProductTypeEnum>();

  @Output()
  public eventDelete = new EventEmitter<ProductCuarentenaEntityInterface>();

  @Output()
  public eventClear = new EventEmitter();

  @Output()
  public eventValidate = new EventEmitter<boolean>();

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
    if (type == ProductTypeEnum.ANIMAL) {
      this.eventType.emit(ProductTypeEnum.ANIMAL);
      this.eventClear.emit();
    } else {
      this.eventType.emit(ProductTypeEnum.PRODUCT);
      this.eventClear.emit();
    }
    // validar
    this.eventValidate.emit(false);
  }

  onAdd(animal: ProductCuarentenaEntityInterface) {
    const type = this.productType;
    const currentAnimal = this.cuarentenas.findIndex((item) => item.productId == animal.productId);
    if (currentAnimal >= 0) {
      this.cuarentenas[currentAnimal] = { ...animal, type };
    } else {
      const secuencial = this.cuarentenas.length;
      this.cuarentenas.push({ ...animal, secuencial, type });
    }
    // validar
    this.eventValidate.emit(this.cuarentenas.length > 0);
  }

  onEdit(cuarentena: ProductCuarentenaEntityInterface) {
    this.cuarentena = cuarentena;
    this.openEditAnimal();
  }

  onDelete(cuarentena: ProductCuarentenaEntityInterface) {
    this.eventDelete.emit(cuarentena);
    const currentData = this.cuarentenas.filter((item) => item.productId != cuarentena.productId);
    this.eventValidate.emit(currentData.length > 0);
  }
}
