import { Injectable } from '@angular/core';
import { ExpedienteCreateInterface } from '../interfaces/expediente-create.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ExpedienteCreateResponseInterface } from '../interfaces/expediente-create-response.interface';

@Injectable()
export class ExpedienteCreateService {
  constructor(public client: HttpClient) {}

  private loading = false;

  fetch(payload: ExpedienteCreateInterface) {
    return new Promise<ExpedienteCreateResponseInterface>((resolve, reject) => {
      this.loading = true;
      this.client.post<ExpedienteCreateResponseInterface>(`${environment.api}/expedientes/generic`, payload).subscribe({
        next: (data) => {
          this.loading = false;
          resolve(data);
        },
        error: (err) => {
          this.loading = false;
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'No se pudo guardar el expediente!!!',
          });
          reject(err);
        },
      });
    });
  }

  getLoading() {
    return this.loading;
  }
}
