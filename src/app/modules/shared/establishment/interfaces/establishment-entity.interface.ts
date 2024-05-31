import { UbigeoEntityInterface } from '../../ubigeo/interfaces/ubigeo-entity.interface';

export interface EstablishmentEntityInterface {
  id: string;
  type: string;
  name: string;
  address: string;
  ownerName: string;
  ownerRuc: string;
  departamentoId: string;
  provinciaId: string;
  distritoId: string;
  ubigeo: UbigeoEntityInterface;
}
