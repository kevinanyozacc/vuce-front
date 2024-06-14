import { DetalleCreateInterface } from '../../detalle/interfaces/detalle-create.interface';
import { PaymentDataEntityInterface } from '../../method-payment/interfaces/payment-data-entity.interface';
import { PaymentEntityInterface } from '../../method-payment/interfaces/payment-entity.interface';
import { ProductCuarentenaEntityInterface } from '../../product/interfaces/product-cuarentena-entity.interface';

export interface ExpedienteCreateInterface {
  sedeId: string;
  tupaId: string;
  personId: string;
  userId: string;
  requestPersonId: string;
  representanteId?: string;
  otherPersonId?: string;
  detalle: DetalleCreateInterface;
  services: PaymentDataEntityInterface[];
  payments: PaymentEntityInterface[];
  cuarentenas: ProductCuarentenaEntityInterface[];
}
