import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SedeEntityInterface } from '../interfaces/sede-entity.interface';

@Injectable()
export class SedeListService {
  constructor(private http: HttpClient) {}

  private data: SedeEntityInterface[] = [];

  public getApiList() {
    this.http.get<SedeEntityInterface[]>(`${environment.api}/sedes`).subscribe({
      next: (data) => (this.data = data),
      error: () => (this.data = []),
    });
  }

  public getData() {
    return this.data;
  }
}
