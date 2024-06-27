import { Component, inject, Input } from '@angular/core';
import { ProductAnimalCreateComponent } from 'src/app/modules/shared/product/components/product-animal-create/product-animal-create.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { NgFor, NgIf } from '@angular/common';
import { ProductSubProductCreateComponent } from 'src/app/modules/shared/product/components/product-subproduct-create/product-subproduct-create.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ProductAnimalEditComponent } from 'src/app/modules/shared/product/components/product-animal-edit/product-animal-edit.component';
import { ProductSubProductEditComponent } from 'src/app/modules/shared/product/components/product-subproduct-edit/product-subproduct-edit.component';
import { ProductCuarentenaEntityInterface } from 'src/app/modules/shared/product/interfaces/product-cuarentena-entity.interface';
import { TupaProductService } from 'src/app/modules/shared/tupa/services/tupa-product.service';
import { ProductAnimalTableComponent } from 'src/app/modules/shared/product/components/product-animal-table/product-animal-table.component';
import { TupaPayloadInterface } from 'src/app/modules/shared/tupa/interfaces/tupa-payload.interface';
import { ProductSubproductTableComponent } from 'src/app/modules/shared/product/components/product-subproduct-table/product-subproduct-table.component';

@Component({
  selector: 'app-tupa-05-mercancia-pecuaria',
  templateUrl: './tupa-05-mercancia-pecuaria.component.html',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AngularSvgIconModule,
    ButtonComponent,
    ProductAnimalTableComponent,
    ProductAnimalCreateComponent,
    ProductSubproductTableComponent,
    ProductSubProductCreateComponent,
  ],
  providers: [TupaProductService],
})
export class Tupa05MercanciaPecuariaComponent {
  @Input()
  public productService = inject(TupaProductService);

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

  onProductType(value: any) {
    this.productService.setProductType(value);
  }

  onEdit(data: TupaPayloadInterface<ProductCuarentenaEntityInterface>) {
    this.productService.editProduct(data);
  }

  onDelete(data: TupaPayloadInterface<ProductCuarentenaEntityInterface>) {
    this.productService.deleteProduct(data);
  }
}
