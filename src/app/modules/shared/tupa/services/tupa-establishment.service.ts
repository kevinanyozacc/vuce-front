import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EstablishmentEntityInterface } from '../../establishment/interfaces/establishment-entity.interface';
import { PersonEntityInterface } from '../../person/interfaces/person-entity.interface';

@Injectable()
export class TupaEstablishmentService {
  private establishment = new BehaviorSubject<EstablishmentEntityInterface | undefined>(undefined);
  private technical = new BehaviorSubject<PersonEntityInterface | undefined>(undefined);
  private isValid = new BehaviorSubject<boolean>(false);

  constructor() {
    // valid establishment
    this.$getEstablishment().subscribe((data) => {
      if (!data) {
        this.isValid.next(false);
      } else if (!this.getTechnical()) {
        this.isValid.next(false);
      } else {
        this.isValid.next(true);
      }
    });
    // valid technical
    this.$getTechnical().subscribe((data) => {
      if (!data) {
        this.isValid.next(false);
      } else if (!this.getEstablishment()) {
        this.isValid.next(false);
      } else {
        this.isValid.next(true);
      }
    });
  }

  public setEstablishment(value?: EstablishmentEntityInterface) {
    this.establishment.next(value);
  }

  public getEstablishment() {
    return this.establishment.getValue();
  }

  public $getEstablishment() {
    return this.establishment.asObservable();
  }

  public setTechnical(value?: PersonEntityInterface) {
    this.technical.next(value);
  }

  public getTechnical() {
    return this.technical.getValue();
  }

  public $getTechnical() {
    return this.technical.asObservable();
  }

  public $getIsValid() {
    return this.isValid.asObservable();
  }
}
