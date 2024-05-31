import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProvinciaEntityInterface } from '../interfaces/provincia-entity.interface';

@Injectable()
export class ProvinciaListService {
  constructor(private http: HttpClient) {}

  private data: ProvinciaEntityInterface[] = [];

  public getApiList(departamentoId: string) {
    this.http.get<ProvinciaEntityInterface[]>(`${environment.api}/ubigeos/${departamentoId}/provincias`).subscribe({
      next: (data) => (this.data = data),
      error: () => (this.data = []),
    });
  }

  public getData() {
    return this.data;
  }
}
