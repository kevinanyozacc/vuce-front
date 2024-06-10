import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProcedureCalcTarifaService {
  constructor(private http: HttpClient) {}

  private total: number = 0;

  public getApiList({ id, serviceId, amount }: ProcedureCalcTarifaRequest) {
    return new Promise((resolve, reject) => {
      this.http
        .get<{ total: number }>(`${environment.api}/procedures/${id}/services/${serviceId}/calcTarifa?amount=${amount}`)
        .subscribe({
          next: (data) => {
            this.total = data.total;
            resolve(this.total);
          },
          error: (err) => {
            this.total = 0;
            reject(err);
          },
        });
    });
  }

  public getTotal() {
    return this.total;
  }
}

export interface ProcedureCalcTarifaRequest {
  id: string;
  serviceId: string;
  amount: number;
}
