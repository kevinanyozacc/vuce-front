import { UbigeoEntityInterface } from '../../ubigeo/interfaces/ubigeo-entity.interface';

export interface PersonEntityInterface {
  id: string;
  nombreRazonSocial: string;
  type: string;
  documentType: string;
  documentNumber: string;
  lastName: string;
  secondaryName: string;
  names: string;
  ruc: string;
  address: string;
  email: string;
  departamentoId: string;
  provinciaId: string;
  distritoId: string;
  centroPobladoId: string;
  phone: string;
  gender: string;
  cellphone: string;
  referen: string;
  dateOfBirth: string;
  addressReferen: string;
  ubigeo?: UbigeoEntityInterface;
}
