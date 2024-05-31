import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonCreateInterface } from '../interfaces/person-create.interface';
import { environment } from 'src/environments/environment';
import { PersonEntityInterface } from '../interfaces/person-entity.interface';

@Injectable()
export class PersonCreateService {
  constructor(private http: HttpClient) {}

  private data?: PersonEntityInterface;
  private loading: boolean = false;

  createPerson(request: PersonCreateInterface) {
    this.loading = true;
    return new Promise<PersonEntityInterface>((resolve, reject) => {
      this.http.post<PersonEntityInterface>(`${environment.api}/people`, request).subscribe({
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

  getData() {
    return this.data;
  }

  getLoading() {
    return this.loading;
  }
}
