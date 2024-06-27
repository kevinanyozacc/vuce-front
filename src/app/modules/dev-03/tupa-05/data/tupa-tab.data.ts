import { TupaItemIdEnum, TupaItemTabInterface } from 'src/app/modules/shared/tupa/interfaces/tupa-item-tab.interface';

export const tupaTabData: TupaItemTabInterface[] = [
  {
    id: TupaItemIdEnum.PARTE_I,
    name: 'I - INFORMACIÓN DE EMPRESA SOLICITANTE',
    disabled: false,
    visibled: true,
    active: true,
    isComplete: false,
  },
  {
    id: TupaItemIdEnum.PARTE_II,
    name: 'II - ESTABLECIMIENTO',
    disabled: true,
    visibled: true,
    active: false,
    isComplete: false,
  },
  {
    id: TupaItemIdEnum.PARTE_III,
    name: 'III - FINALIDAD',
    disabled: true,
    visibled: true,
    active: false,
    isComplete: false,
  },
  {
    id: TupaItemIdEnum.PARTE_IV,
    name: 'IV - MERCANCIA PECUARIA',
    disabled: true,
    visibled: true,
    active: false,
    isComplete: false,
  },
  {
    id: TupaItemIdEnum.PARTE_V,
    name: 'V - DATOS DEL PAGO',
    disabled: true,
    visibled: true,
    active: false,
    isComplete: false,
  },
  {
    id: TupaItemIdEnum.PARTE_VI,
    name: 'INFORMACIÓN DEL EXPEDIENTE',
    disabled: true,
    visibled: false,
    active: false,
    isComplete: false,
  },
];
