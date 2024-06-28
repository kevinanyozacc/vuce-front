import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { NgFor, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ProductCuarentenaEntityInterface } from 'src/app/modules/shared/product/interfaces/product-cuarentena-entity.interface';
import { ProductModule } from 'src/app/modules/shared/product/product.module';
import { TupaProductService } from 'src/app/modules/shared/tupa/services/tupa-product.service';
import { TupaPayloadInterface } from 'src/app/modules/shared/tupa/interfaces/tupa-payload.interface';

@Component({
  selector: 'app-tupa-04-info-animal',
  templateUrl: './tupa-04-info-animal.component.html',
  standalone: true,
  imports: [NgFor, NgIf, AngularSvgIconModule, ButtonComponent, ProductModule],
})
export class Tupa04InfoAnimalComponent {
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

  onEdit(data: TupaPayloadInterface<ProductCuarentenaEntityInterface>) {
    this.productService.editProduct(data);
  }

  onDelete(data: TupaPayloadInterface<ProductCuarentenaEntityInterface>) {
    this.productService.deleteProduct(data);
  }
}
