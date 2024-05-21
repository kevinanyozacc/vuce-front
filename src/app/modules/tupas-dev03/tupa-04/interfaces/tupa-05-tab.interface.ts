export enum Tupa04TabIdEnum {
  PARTE_I = 'PARTE_I',
  PARTE_II = 'PARTE_II',
  PARTE_III = 'PARTE_III',
  PARTE_IV = 'PARTE_IV',
  PARTE_V = 'PARTE_V',
}

export interface Tupa04TabInterface {
  id: Tupa04TabIdEnum;
  name: string;
  active: boolean;
}
