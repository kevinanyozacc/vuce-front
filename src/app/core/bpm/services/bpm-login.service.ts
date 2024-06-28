import { Injectable } from '@angular/core';
import { BpmTaskInterface } from '../interfaces/bpm-task.interface';

@Injectable()
export class BpmLoginService {
  public signIn(bpmAuth: BpmTaskInterface) {
    localStorage.setItem('bpmAuth', JSON.stringify(bpmAuth));
  }

  public logout() {
    localStorage.removeItem('bpmAuth');
  }
}
