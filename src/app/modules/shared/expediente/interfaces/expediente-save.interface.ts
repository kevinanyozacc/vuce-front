import { DetalleCreateInterface } from '../../detalle/interfaces/detalle-create.interface';
import { PaymentEntityInterface } from '../../method-payment/interfaces/payment-entity.interface';
import { PaymentServiceEntityInterface } from '../../method-payment/interfaces/payment-service-entity.interface';
import { ProductTypeEnum } from '../../product/enums/product-type.enum';
import { ProductCuarentenaEntityInterface } from '../../product/interfaces/product-cuarentena-entity.interface';

export interface ExpedienteSaveInterface {
  sedeId: string;
  procedureId: string;
  personId: string;
  userId: string;
  requestPersonId?: string;
  representanteId?: string;
  establishmentId?: string;
  technicalId?: string;
  otherPersonId?: string;
  detalle?: DetalleCreateInterface;
  productType?: ProductTypeEnum;
  products?: ProductCuarentenaEntityInterface[];
  services: PaymentServiceEntityInterface[];
  payments: PaymentEntityInterface[];
}
