import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { NgFor, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ProductCuarentenaEntityInterface } from 'src/app/modules/shared/product/interfaces/product-cuarentena-entity.interface';
import { TupaProductService } from 'src/app/modules/shared/tupa/services/tupa-product.service';
import { TupaPayloadInterface } from 'src/app/modules/shared/tupa/interfaces/tupa-payload.interface';
import { ProductModule } from 'src/app/modules/shared/product/product.module';

@Component({
  selector: 'app-tupa-05-mercancia-pecuaria',
  templateUrl: './tupa-05-mercancia-pecuaria.component.html',
  standalone: true,
  imports: [NgFor, NgIf, AngularSvgIconModule, ProductModule, ButtonComponent],
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
