import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { PaymentBankEntityInterface } from '../interfaces/payment-bank-entity.interface';

@Injectable()
export class PaymentBankListService {
  constructor(private http: HttpClient) {}

  private data: PaymentBankEntityInterface[] = [];

  public getApiList() {
    this.http.get<PaymentBankEntityInterface[]>(`${environment.api}/methodPayments/banks`).subscribe({
      next: (data) => (this.data = data),
      error: () => (this.data = []),
    });
  }

  public getData() {
    return this.data;
  }
}
