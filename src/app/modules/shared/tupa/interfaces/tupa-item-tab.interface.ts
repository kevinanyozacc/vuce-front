export enum TupaItemIdEnum {
  PARTE_I = 'PARTE_I',
  PARTE_II = 'PARTE_II',
  PARTE_III = 'PARTE_III',
  PARTE_IV = 'PARTE_IV',
  PARTE_V = 'PARTE_V',
}

export interface TupaItemTabInterface {
  id: TupaItemIdEnum;
  name: string;
  active: boolean;
}
