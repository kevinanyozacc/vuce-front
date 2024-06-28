import { inject, Injectable } from '@angular/core';
import { ExpedienteSaveInterface } from '../interfaces/expediente-save.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExpedienteSaveResponseInterface } from '../interfaces/expediente-save-response.interface';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ExpedienteCreateService {
  private clientService = inject(HttpClient);
  private data = new BehaviorSubject<ExpedienteSaveResponseInterface | undefined>(undefined);
  private loading = new BehaviorSubject<boolean>(false);

  public api(payload: ExpedienteSaveInterface) {
    return new Observable<ExpedienteSaveResponseInterface>((subscriber) => {
      this.loading.next(true);
      this.clientService
        .post<ExpedienteSaveResponseInterface>(`${environment.api}/expedientes/generic`, payload)
        .subscribe({
          next: (tmpExpediente) => {
            this.messageSuccess();
            this.loading.next(false);
            this.data.next(tmpExpediente);
            subscriber.next(tmpExpediente);
          },
          error: (err) => {
            this.messageError();
            this.loading.next(false);
            this.data.next(undefined);
            subscriber.error(err);
          },
          complete: () => subscriber.complete(),
        });
    });
  }

  public messageSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Registro Exitoso',
      text: `El expediente se generó correctamente`,
    });
  }

  public messageError() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `No se pudo guardar el expediente!!!`,
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
