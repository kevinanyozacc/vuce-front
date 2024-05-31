import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstablishmentEntityInterface } from '../interfaces/establishment-entity.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class EstablishmentSearchService {
  constructor(private http: HttpClient) {}

  private data?: EstablishmentEntityInterface[];
  private loading = false;

  fetch(params: EstablishmentSearchRequest): Promise<EstablishmentEntityInterface[]> {
    return new Promise((resolve, reject) => {
      this.loading = true;
      this.http
        .get<EstablishmentEntityInterface[]>(
          `${environment.api}/establishments/search/${params.column}/type/${params.value}`,
        )
        .subscribe({
          next: (data) => {
            resolve(data);
            this.data = data;
            this.loading = false;
          },
          error: (err) => {
            reject(err);
            this.data = undefined;
            this.loading = false;
          },
        });
    });
  }

  public getLoading() {
    return this.loading;
  }

  public getData() {
    return this.data;
  }
}

export interface EstablishmentSearchRequest {
  column: string;
  value: string;
}
