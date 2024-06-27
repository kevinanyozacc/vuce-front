import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonEntityInterface } from '../../person/interfaces/person-entity.interface';
import { RepresentanteEntityInterface } from '../../person/interfaces/representante-entity.interface';

@Injectable()
export class TupaRequestService {
  private person = new BehaviorSubject<PersonEntityInterface | undefined>(undefined);
  private representante = new BehaviorSubject<RepresentanteEntityInterface | undefined>(undefined);

  public setPerson(value?: PersonEntityInterface) {
    this.person.next(value);
  }

  public getPerson() {
    return this.person.getValue();
  }

  public $getPerson() {
    return this.person.asObservable();
  }

  public setRepresentante(value?: RepresentanteEntityInterface) {
    this.representante.next(value);
  }

  public getRepresentante() {
    return this.representante.getValue();
  }

  public $getRepresentante() {
    return this.representante.asObservable();
  }
}
