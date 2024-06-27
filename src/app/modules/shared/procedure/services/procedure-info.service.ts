import { Injectable } from '@angular/core';
import { ProcedureInfoInterface } from '../interfaces/procedure-info.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProcedureInfoService {
  constructor(private http: HttpClient) {}

  private data: ProcedureInfoInterface[] = [];

  public getApi(procedureId: string, serviceId: string) {
    return new Promise<ProcedureInfoInterface>((resolve, reject) => {
      this.http
        .get<ProcedureInfoInterface[]>(`${environment.api}/procedures/${procedureId}/services/${serviceId}`)
        .subscribe({
          next: (data) => {
            this.data = data;
            resolve(data[0]);
          },
          error: (err) => {
            this.data = [];
            reject(err);
          },
        });
    });
  }

  public getData() {
    return this.data;
  }
}
