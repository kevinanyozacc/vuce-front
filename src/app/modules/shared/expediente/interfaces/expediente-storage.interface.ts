import { DetalleCreateInterface } from '../../detalle/interfaces/detalle-create.interface';
import { EstablishmentEntityInterface } from '../../establishment/interfaces/establishment-entity.interface';
import { PaymentEntityInterface } from '../../method-payment/interfaces/payment-entity.interface';
import { PaymentServiceEntityInterface } from '../../method-payment/interfaces/payment-service-entity.interface';
import { PersonEntityInterface } from '../../person/interfaces/person-entity.interface';
import { RepresentanteEntityInterface } from '../../person/interfaces/representante-entity.interface';
import { ProductTypeEnum } from '../../product/enums/product-type.enum';
import { ProductCuarentenaEntityInterface } from '../../product/interfaces/product-cuarentena-entity.interface';
import { SedeEntityInterface } from '../../sede/interfaces/sede-entity.interface';
import { ExpedienteSaveResponseInterface } from './expediente-save-response.interface';

export interface ExpedienteStorageTmpInterface {
  sede: SedeEntityInterface;
  person: PersonEntityInterface;
  representante?: RepresentanteEntityInterface;
  establishment?: EstablishmentEntityInterface;
  technical?: PersonEntityInterface;
  personPayment?: PersonEntityInterface;
  detalle?: DetalleCreateInterface;
  productType: ProductTypeEnum;
  products?: ProductCuarentenaEntityInterface[];
  services?: PaymentServiceEntityInterface[];
  payments?: PaymentEntityInterface[];
}

export interface ExpedienteStorageInterface extends ExpedienteStorageTmpInterface {
  tmpExpediente: ExpedienteSaveResponseInterface;
}
