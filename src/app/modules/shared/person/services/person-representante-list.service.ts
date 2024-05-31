import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RepresentanteEntityInterface } from '../interfaces/representante-entity.interface';

@Injectable()
export class PersonRepresentanteListService {
  constructor(private http: HttpClient) {}

  private data: RepresentanteEntityInterface[] = [];

  public getApiList(id: string) {
    this.http.get<RepresentanteEntityInterface[]>(`${environment.api}/people/${id}/representantes`).subscribe({
      next: (data) => (this.data = data),
      error: () => (this.data = []),
    });
  }

  public getData() {
    return this.data;
  }
}
