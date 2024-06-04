import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { PaymentAccountEntityInterface } from '../interfaces/payment-account-entity.interface';

@Injectable()
export class PaymentAccountListService {
  constructor(private http: HttpClient) {}

  private data: PaymentAccountEntityInterface[] = [];

  public getApiList(bankId: string) {
    this.http
      .get<PaymentAccountEntityInterface[]>(`${environment.api}/methodPayments/banks/${bankId}/accounts`)
      .subscribe({
        next: (data) => (this.data = data),
        error: () => (this.data = []),
      });
  }

  public getData() {
    return this.data;
  }
}
