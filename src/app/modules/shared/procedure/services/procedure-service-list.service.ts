import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProcedureEntityInterface } from '../interfaces/procedure-entity.interface';

@Injectable()
export class ProcedureServiceListService {
  constructor(private http: HttpClient) {}

  private data: ProcedureEntityInterface[] = [];

  public getApiList(procedureId: string) {
    this.http.get<ProcedureEntityInterface[]>(`${environment.api}/procedures/${procedureId}/services`).subscribe({
      next: (data) => (this.data = data),
      error: () => (this.data = []),
    });
  }

  public getData() {
    return this.data;
  }
}
