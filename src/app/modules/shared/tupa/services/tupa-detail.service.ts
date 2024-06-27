import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DetalleCreateInterface } from '../../detalle/interfaces/detalle-create.interface';

@Injectable()
export class TupaDetailService {
  private detail = new BehaviorSubject<DetalleCreateInterface | undefined>(undefined);
  private isValid = new BehaviorSubject<boolean>(false);

  public setDetail(value?: DetalleCreateInterface) {
    this.detail.next(value);
  }

  public getDetail() {
    return this.detail.getValue();
  }

  public $getDetail() {
    return this.detail.asObservable();
  }

  public setIsValid(value: boolean) {
    this.isValid.next(value);
  }

  public $getIsValid() {
    return this.isValid.asObservable();
  }
}
