import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BpmTaskInterface } from '../interfaces/bpm-task.interface';

@Injectable()
export class BpmDeleteService {
  private clientService = inject(HttpClient);
  private loading = new BehaviorSubject<boolean>(false);
  private data = new BehaviorSubject<boolean>(false);

  public api(bpmTask: BpmTaskInterface) {
    return new Observable<boolean>((subscriber) => {
      this.loading.next(true);
      this.clientService
        .get<boolean>(`${environment.apiBpm}/archivar?taskid=${bpmTask.taskId}&token=${bpmTask.token}`)
        .subscribe({
          next: () => {
            this.loading.next(false);
            this.data.next(true);
            subscriber.next(true);
          },
          error: (err) => {
            this.loading.next(false);
            this.data.next(false);
            subscriber.error(err);
          },
          complete: () => subscriber.complete(),
        });
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
