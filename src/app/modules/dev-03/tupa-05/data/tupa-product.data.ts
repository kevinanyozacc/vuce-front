import { ProductAnimalEntityInterface } from '../../../shared/product/interfaces/product-cuarentena-entity.interface';
import { ProductSubProductEntityInterface } from '../../../shared/product/interfaces/product-subproduct-entity.interface';

export const tupaProductAnimalData: ProductAnimalEntityInterface[] = [
  {
    productId: '00054',
    productName: 'prueba 1',
    gender: 'F',
    age: '20',
    origin: 'A',
    amount: 12,
  },
];

export const tupaProductSubProductData: ProductSubProductEntityInterface[] = [
  {
    productId: '00044',
    productName: 'Prueba 2',
    weight: '100',
    authorizeName: 'Hans',
  },
];
