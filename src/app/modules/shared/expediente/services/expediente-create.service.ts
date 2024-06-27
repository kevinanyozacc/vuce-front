import { inject, Injectable } from '@angular/core';
import { ExpedienteSaveInterface } from '../interfaces/expediente-save.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExpedienteSaveResponseInterface } from '../interfaces/expediente-save-response.interface';
import Swal from 'sweetalert2';

@Injectable()
export class ExpedienteCreateService {
  private clientService = inject(HttpClient);
  private loading = false;

  fetch(payload: ExpedienteSaveInterface) {
    return new Promise<ExpedienteSaveResponseInterface>((resolve, reject) => {
      this.loading = true;
      this.clientService
        .post<ExpedienteSaveResponseInterface>(`${environment.api}/expedientes/generic`, payload)
        .subscribe({
          next: (tmpExpediente) => {
            this.messageSuccess();
            this.loading = false;
            resolve(tmpExpediente);
          },
          error: (err) => {
            this.messageError();
            this.loading = false;
            reject(err);
          },
        });
    });
  }

  messageSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Registro Exitoso',
      text: `El expediente se generó correctamente`,
    });
  }

  messageError() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `No se pudo guardar el expediente!!!`,
    });
  }

  getLoading() {
    return this.loading;
  }
}
