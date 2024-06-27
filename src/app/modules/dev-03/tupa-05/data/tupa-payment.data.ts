import { PaymentEntityInterface } from 'src/app/modules/shared/method-payment/interfaces/payment-entity.interface';

export const tupaPaymentData: PaymentEntityInterface[] = [
  {
    typeId: '001',
    typeName: 'Pruba',
    bankId: '00001',
    bankName: 'Banco Prueba',
    accountId: '0001-001',
    accountName: '0001-001',
    number: '12345678',
    date: '2024-01-01',
    amount: 100,
  },
];
