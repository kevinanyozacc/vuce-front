import { Injectable } from '@angular/core';
import { ExpedienteCreateInterface } from '../interfaces/expediente-create.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ExpedienteCreateResponseInterface } from '../interfaces/expediente-create-response.interface';

@Injectable()
export class ExpedienteCreateService {
  constructor(public client: HttpClient) {}

  fetch(payload: ExpedienteCreateInterface, pathTupa: string) {
    this.client.post<ExpedienteCreateResponseInterface>(`${environment.api}/expedientes/generic`, payload).subscribe({
      next: (data) => {
        location.href = `/dashboard/${pathTupa}/${data.id}`;
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'No se pudo guardar el expediente!!!',
        });
      },
    });
  }
}
