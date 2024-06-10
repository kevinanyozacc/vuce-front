import { PaymentEntityInterface } from '../../../shared/method-payment/interfaces/payment-entity.interface';

export const tupaPaymentData: PaymentEntityInterface[] = [
  {
    paymentTypeId: '001',
    paymentTypeName: 'Pruba',
    paymentBankId: '00001',
    paymentBankName: 'Banco Prueba',
    paymentAccountId: '0001-001',
    paymentAccountName: '0001-001',
    paymentNumber: '12345678',
    paymentDate: '2024-01-01',
    paymentAmount: 100,
  },
];
