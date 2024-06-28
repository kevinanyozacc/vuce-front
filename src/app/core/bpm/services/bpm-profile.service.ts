import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BpmEntityInterface } from '../interfaces/bpm-entity.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BpmTaskInterface } from '../interfaces/bpm-task.interface';

@Injectable()
export class BpmProfileService {
  private clientService = inject(HttpClient);
  private loading = new BehaviorSubject<boolean>(false);
  private data = new BehaviorSubject<BpmTaskInterface | undefined>(undefined);

  public api(taskId: string, token: string) {
    return new Observable<BpmEntityInterface>((subscriber) => {
      this.loading.next(true);
      this.clientService
        .get<BpmEntityInterface>(`${environment.apiBpm}/tupa?taskid=${taskId}&token=${token}`)
        .subscribe({
          next: (data) => {
            this.loading.next(false);
            this.data.next({ taskId, token });
            subscriber.next(data);
          },
          error: (err) => {
            this.loading.next(false);
            this.data.next(undefined);
            subscriber.error(err);
          },
          complete: () => subscriber.complete(),
        });
    });
  }

  public getCurrent() {
    const tmpAuth = localStorage.getItem('bpmAuth');
    if (!tmpAuth) return undefined;
    const data = JSON.parse(tmpAuth) as BpmTaskInterface;
    this.data.next(data);
    return data;
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
