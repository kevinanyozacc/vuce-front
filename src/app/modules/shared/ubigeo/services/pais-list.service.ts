import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaisEntityInterface } from '../interfaces/pais-entity.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class PaisListService {
  constructor(private http: HttpClient) {}

  private data: PaisEntityInterface[] = [];

  public getApiList() {
    this.http.get<PaisEntityInterface[]>(`${environment.api}/ubigeos/paises`).subscribe({
      next: (data) => (this.data = data),
      error: () => (this.data = []),
    });
  }

  public getData() {
    return this.data;
  }
}
