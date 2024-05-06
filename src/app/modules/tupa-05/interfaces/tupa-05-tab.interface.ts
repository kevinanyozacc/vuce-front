export enum Tupa05TabIdEnum {
  SOLICITANTE = 'SOLICITANTE',
  GENERALES = 'GENERALES',
  ALMACEN = 'ALMACEN',
  PAGO = 'PAGO',
  EXPEDIENTE = 'EXPEDIENTE',
}

export interface Tupa05TabInterface {
  id: Tupa05TabIdEnum;
  name: string;
  active: boolean;
}
