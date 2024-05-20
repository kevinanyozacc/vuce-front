import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DepartamentoEntityInterface } from '../interfaces/departamento-entity.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class DepartamentoListService {
  constructor(private http: HttpClient) {}

  private data: DepartamentoEntityInterface[] = [];

  public getApiList() {
    this.http.get<DepartamentoEntityInterface[]>(`${environment.api}/ubigeos`).subscribe({
      next: (data) => (this.data = data),
      error: () => (this.data = []),
    });
  }

  public getData() {
    return this.data;
  }
}
