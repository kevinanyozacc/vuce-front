import { ProductTypeEnum } from '../enums/product-type.enum';

export interface ProductCuarentenaEntityInterface {
  productId: string;
  type: ProductTypeEnum;
  secuencial: number;
  productName: string;
  gender?: string;
  age?: string;
  origin?: string;
  amount?: number;
  weight?: string;
  authorizeName?: string;
}
