import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProcedureServiceEntityInterface } from '../interfaces/procedure-service-entity.interface';

@Injectable()
export class ProcedureServiceListService {
  constructor(private http: HttpClient) {}

  private data: ProcedureServiceEntityInterface[] = [];

  public getApiList(procedureId: string) {
    this.http
      .get<ProcedureServiceEntityInterface[]>(`${environment.api}/procedures/${procedureId}/services`)
      .subscribe({
        next: (data) => (this.data = data),
        error: () => (this.data = []),
      });
  }

  public getData() {
    return this.data;
  }
}
