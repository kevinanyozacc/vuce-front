import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReniecPersonEntityInterface } from '../interfaces/reniec-person-entity.interface';
import Swal from 'sweetalert2';

@Injectable()
export class ReniecFindPersonByDniService {
  constructor(private http: HttpClient) {}

  private loading = true;
  private data?: ReniecPersonEntityInterface;

  async execute(documentNumber: string) {
    return new Promise<ReniecPersonEntityInterface>((resolve, reject) => {
      this.loading = true;
      this.http.get<ReniecPersonEntityInterface>(`${environment.api}/reniec/searchByDni/${documentNumber}`).subscribe({
        next: (data) => {
          this.loading = false;
          resolve(data);
        },
        error: (err) => {
          this.loading = false;
          reject(err);
        },
      });
    });
  }

  getLoading() {
    return this.loading;
  }

  getData() {
    return this.data;
  }
}
