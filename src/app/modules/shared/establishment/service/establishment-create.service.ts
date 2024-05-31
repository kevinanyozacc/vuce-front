import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EstablishmentEntityInterface } from '../interfaces/establishment-entity.interface';

@Injectable()
export class EstablishmentCreateService {
  constructor(private http: HttpClient) {}

  private data?: EstablishmentEntityInterface;
  private loading: boolean = false;

  createPerson(request: EstablishmentEntityInterface) {
    this.loading = true;
    return new Promise<EstablishmentEntityInterface>((resolve, reject) => {
      this.http.post<EstablishmentEntityInterface>(`${environment.api}/establishments`, request).subscribe({
        next: (data) => {
          this.data = data;
          this.loading = false;
          resolve(data);
        },
        error: (err) => {
          this.data = undefined;
          this.loading = false;
          reject(err);
        },
      });
    });
  }

  getData() {
    return this.data;
  }

  getLoading() {
    return this.loading;
  }
}
