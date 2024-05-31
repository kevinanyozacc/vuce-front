import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonEntityInterface } from '../interfaces/person-entity.interface';
import { environment } from 'src/environments/environment';
import { PersonSearchInterface } from '../interfaces/person-search.interface';

@Injectable()
export class PersonSearchService {
  constructor(private http: HttpClient) {}

  private data?: PersonEntityInterface;
  private loading: boolean = false;

  getApiData(params: PersonSearchInterface) {
    return new Promise<PersonEntityInterface>((resolve, reject) => {
      this.loading = true;
      this.http
        .get<PersonEntityInterface>(`${environment.api}/people/${params.documentNumber}/search/${params.documentType}`)
        .subscribe({
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

  setData(data?: PersonEntityInterface) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  clearData() {
    this.data = undefined;
  }

  getLoading() {
    return this.loading;
  }
}
