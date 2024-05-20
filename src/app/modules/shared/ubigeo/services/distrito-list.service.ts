import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DistritoEntityInterface } from '../interfaces/distrito-entity.interface';

@Injectable()
export class DistritoListService {
  constructor(private http: HttpClient) {}

  private data: DistritoEntityInterface[] = [];

  public getApiList(departamentoId: string, provinciaId: string) {
    this.http
      .get<DistritoEntityInterface[]>(
        `${environment.api}/ubigeos/${departamentoId}/provincias/${provinciaId}/distritos`,
      )
      .subscribe({
        next: (data) => (this.data = data),
        error: () => (this.data = []),
      });
  }

  public getData() {
    return this.data;
  }
}
