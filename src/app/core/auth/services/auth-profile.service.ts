import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthEntityInterface } from '../interfaces/auth-entity.interface';

@Injectable()
export class AuthProfileService {
  public clientService = inject(HttpClient);

  private loading = false;
  private data = new BehaviorSubject<any>(undefined);

  public api(username: string) {
    return new Promise<AuthEntityInterface>((resolve, reject) => {
      this.loading = true;
      this.clientService.get<AuthEntityInterface>(`${environment.apiAuth}/usuario?usrname=${username}`).subscribe({
        next: (data) => {
          if (!data.idUser) return reject(new Error('No se encontró al usuario'));
          this.data.next(data);
          this.loading = false;
          resolve(data);
        },
        error: (err) => {
          this.data.next(undefined);
          this.loading = false;
          reject(err);
        },
      });
    });
  }

  public getCurrent() {
    const tmpAuth = localStorage.getItem('auth');
    if (!tmpAuth) return undefined;
    const data = JSON.parse(tmpAuth) as AuthEntityInterface;
    this.data.next(data);
    return data;
  }

  public getLoading() {
    return this.loading;
  }

  public getData() {
    return this.data.getValue();
  }

  public $getData() {
    return this.data.asObservable();
  }
}
