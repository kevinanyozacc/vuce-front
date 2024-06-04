import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AreaEntityInterface } from '../interfaces/area-entity.interface';

@Injectable()
export class AreaListService {
  constructor(private http: HttpClient) {}

  private data: AreaEntityInterface[] = [];

  public getApiList() {
    this.http.get<AreaEntityInterface[]>(`${environment.api}/areas`).subscribe({
      next: (data) => (this.data = data),
      error: () => (this.data = []),
    });
  }

  public getData() {
    return this.data;
  }
}
