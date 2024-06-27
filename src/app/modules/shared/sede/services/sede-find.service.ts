import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SedeEntityInterface } from '../interfaces/sede-entity.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SedeFindService {
  private clientService = inject(HttpClient);
  private loading = new BehaviorSubject<boolean>(false);
  private data = new BehaviorSubject<SedeEntityInterface | undefined>(undefined);

  public api(id: string) {
    return new Promise<SedeEntityInterface>((resolve, reject) => {
      this.loading.next(true);
      this.clientService.get<SedeEntityInterface>(`${environment.api}/sedes/${id}`).subscribe({
        next: (data) => {
          this.loading.next(false);
          this.data.next(data);
          resolve(data);
        },
        error: (err) => {
          this.loading.next(false);
          this.data.next(undefined);
          reject(err);
        },
      });
    });
  }

  public getData() {
    return this.data.getValue();
  }

  public $getData() {
    return this.data.asObservable();
  }

  public getLoading() {
    return this.loading.getValue();
  }

  public $getLoding() {
    return this.loading.asObservable();
  }
}
