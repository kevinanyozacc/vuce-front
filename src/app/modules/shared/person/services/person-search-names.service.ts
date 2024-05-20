import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonEntityInterface } from '../interfaces/person-entity.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class PersonSearchNamesService {
  constructor(private http: HttpClient) {}

  private data?: PersonEntityInterface[] = [];
  private loading: boolean = false;

  getApiData(names: string) {
    return new Promise<PersonEntityInterface[]>((resolve, reject) => {
      this.loading = true;
      this.http.get<PersonEntityInterface[]>(`${environment.api}/people/${names}/searchNames`).subscribe({
        next: (data) => {
          this.data = data;
          this.loading = false;
          resolve(data);
        },
        error: (err) => {
          this.data = undefined;
          this.loading = false;
          reject(err);
        },
      });
    });
  }

  setData(data?: PersonEntityInterface[]) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  clearData() {
    this.data = [];
  }

  getLoading() {
    return this.loading;
  }
}
