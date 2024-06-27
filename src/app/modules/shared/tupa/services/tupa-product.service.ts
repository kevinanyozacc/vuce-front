import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCuarentenaEntityInterface } from '../../product/interfaces/product-cuarentena-entity.interface';
import { TupaPayloadInterface } from '../interfaces/tupa-payload.interface';
import { ProductTypeEnum } from '../../product/enums/product-type.enum';

@Injectable()
export class TupaProductService {
  public productType = new BehaviorSubject<ProductTypeEnum>(ProductTypeEnum.ANIMAL);
  private products = new BehaviorSubject<ProductCuarentenaEntityInterface[]>([]);
  private isValid = new BehaviorSubject<boolean>(false);

  constructor() {
    this.$getProductType().subscribe(() => {
      this.clearProducts();
    });

    this.$getProducts().subscribe((data) => {
      this.setIsValid(data.length > 0);
    });
  }

  public setProductType(value: ProductTypeEnum) {
    this.productType.next(value);
  }

  public getProductType() {
    return this.productType.getValue();
  }

  public $getProductType() {
    return this.productType.asObservable();
  }

  public isActiveProductType(value: any) {
    return this.getProductType() == value;
  }

  public setProducts(value: ProductCuarentenaEntityInterface[]) {
    this.products.next(value);
  }

  public addProduct(value: ProductCuarentenaEntityInterface) {
    const tmpProducts = this.getProducts().filter((item) => item.productId !== value.productId);
    tmpProducts.push(value);
    this.setProducts(tmpProducts);
    this.assignSecuencialProducts();
  }

  public assignSecuencialProducts() {
    const tmpProducts = this.getProducts().map((item, index) => {
      item.secuencial = index + 1;
      return item;
    });
    this.setProducts(tmpProducts);
  }

  public getProducts() {
    return this.products.getValue();
  }

  public $getProducts() {
    return this.products.asObservable();
  }

  public editProduct({ row, payload }: TupaPayloadInterface<ProductCuarentenaEntityInterface>) {
    const tmpProducts = this.getProducts().map((item, index) => {
      if (row === index) return payload;
      return item;
    });
    this.setProducts(tmpProducts);
  }

  public deleteProduct({ row }: TupaPayloadInterface<ProductCuarentenaEntityInterface>) {
    const tmpProducts = this.getProducts().filter((_, index) => index !== row);
    console.log(tmpProducts);
    this.setProducts(tmpProducts);
  }

  public clearProducts() {
    this.setProducts([]);
  }

  public setIsValid(value: boolean) {
    this.isValid.next(value);
  }

  public getIsValid() {
    return this.isValid.getValue();
  }

  public $getIsValid() {
    return this.isValid.asObservable();
  }
}
