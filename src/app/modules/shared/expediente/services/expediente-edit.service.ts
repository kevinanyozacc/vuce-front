import { inject, Injectable } from '@angular/core';
import { ExpedienteSaveInterface } from '../interfaces/expediente-save.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExpedienteSaveResponseInterface } from '../interfaces/expediente-save-response.interface';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ExpedienteEditService {
  private clientService = inject(HttpClient);
  private data = new BehaviorSubject<ExpedienteSaveResponseInterface | undefined>(undefined);
  private loading = new BehaviorSubject<boolean>(false);

  public api(id: string, payload: ExpedienteSaveInterface) {
    return new Promise<ExpedienteSaveResponseInterface>((resolve, reject) => {
      this.loading.next(true);
      this.clientService
        .put<ExpedienteSaveResponseInterface>(`${environment.api}/expedientes/${id}`, payload)
        .subscribe({
          next: (tmpExpediente) => {
            this.messageSuccess();
            this.loading.next(false);
            this.data.next(tmpExpediente);
            resolve(tmpExpediente);
          },
          error: (err) => {
            this.messageError();
            this.loading.next(false);
            this.data.next(undefined);
            reject(err);
          },
        });
    });
  }

  public messageSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Actualización Exitosa',
      text: `El expediente se actualizó correctamente`,
    });
  }

  public messageError() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `No se pudo actualizar el expediente!!!`,
    });
  }

  public getLoading() {
    return this.loading.getValue();
  }

  public $getLoading() {
    return this.loading.asObservable();
  }

  public getData() {
    return this.data.getValue();
  }

  public $getData() {
    return this.data.asObservable();
  }
}
