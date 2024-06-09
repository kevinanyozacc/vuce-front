import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpedienteEntityInterface } from '../interfaces/expediente-entity.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class ExpedienteFindService {
  constructor(private http: HttpClient) {}

  private data?: ExpedienteEntityInterface;
  private loading = false;

  public fetch(id: string): Promise<ExpedienteEntityInterface> {
    return new Promise((resolve, reject) => {
      this.loading = true;
      this.http.get<ExpedienteEntityInterface>(`${environment.api}/expedientes/${id}`).subscribe({
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
