export enum TupaItemIdEnum {
  PARTE_I = 'PARTE_I',
  PARTE_II = 'PARTE_II',
  PARTE_III = 'PARTE_III',
  PARTE_IV = 'PARTE_IV',
  PARTE_V = 'PARTE_V',
  PARTE_VI = 'PARTE_VI',
}

export interface TupaItemTabInterface {
  id: TupaItemIdEnum;
  name: string;
  disabled: boolean;
  visibled: boolean;
  active: boolean;
  isComplete: boolean;
}
