import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PobladoEntityInterface } from '../interfaces/poblado-entity.interface';

@Injectable()
export class PobladoListService {
  constructor(private http: HttpClient) {}

  private data: PobladoEntityInterface[] = [];

  public getApiList(departamentoId: string, provinciaId: string, distritoId: string) {
    this.http
      .get<PobladoEntityInterface[]>(
        `${environment.api}/ubigeos/${departamentoId}/provincias/${provinciaId}/distritos/${distritoId}/poblados`,
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
