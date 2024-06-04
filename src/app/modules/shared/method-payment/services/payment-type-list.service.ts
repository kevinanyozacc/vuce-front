import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { PaymentTypeEntityInterface } from '../interfaces/payment-type-entity.interface';

@Injectable()
export class PaymentTypeListService {
  constructor(private http: HttpClient) {}

  private data: PaymentTypeEntityInterface[] = [];

  public getApiList() {
    this.http.get<PaymentTypeEntityInterface[]>(`${environment.api}/methodPayments/typePayments`).subscribe({
      next: (data) => (this.data = data),
      error: () => (this.data = []),
    });
  }

  public getData() {
    return this.data;
  }
}
