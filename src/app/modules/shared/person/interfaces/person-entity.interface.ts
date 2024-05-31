import { DocumentTypeEntityInterface } from '../../document-type/interfaces/document-type-entity.interface';
import { PobladoEntityInterface } from '../../ubigeo/interfaces/poblado-entity.interface';
import { UbigeoEntityInterface } from '../../ubigeo/interfaces/ubigeo-entity.interface';

export interface PersonEntityInterface {
  id: string;
  nombreRazonSocial: string;
  type: string;
  documentTypeId: string;
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
  documentType?: DocumentTypeEntityInterface;
  ubigeo?: UbigeoEntityInterface;
  poblado?: PobladoEntityInterface;
}
