import { inject, Injectable } from '@angular/core';
import { PersonEntityInterface } from '../../person/interfaces/person-entity.interface';
import { PaymentServiceEntityInterface } from '../../method-payment/interfaces/payment-service-entity.interface';
import { PaymentEntityInterface } from '../../method-payment/interfaces/payment-entity.interface';
import { TupaPayloadInterface } from '../interfaces/tupa-payload.interface';
import { BehaviorSubject } from 'rxjs';
import { ProcedureInfoInterface } from '../../procedure/interfaces/procedure-info.interface';
import { ProcedureCalcTarifaService } from '../../procedure/services/procedure-calc-tarifa.service';
import Swal from 'sweetalert2';

@Injectable()
export class TupaPaymentService {
  private total = new BehaviorSubject<number>(0);
  private procedureInfo = new BehaviorSubject<ProcedureInfoInterface | undefined>(undefined);
  private personPayment = new BehaviorSubject<PersonEntityInterface | undefined>(undefined);
  private services = new BehaviorSubject<PaymentServiceEntityInterface[]>([]);
  private payments = new BehaviorSubject<PaymentEntityInterface[]>([]);
  private isValid = new BehaviorSubject<boolean>(false);

  public calcTarifaService = inject(ProcedureCalcTarifaService);

  public setTotal(value: number) {
    this.total.next(value);
  }

  public getTotal() {
    return this.total.getValue();
  }

  public $getTotal() {
    return this.total.asObservable();
  }

  public calcTotal() {
    if (!this.getServices().length) {
      this.setTotal(0);
    } else {
      const arraySubTotal: number[] = this.getServices().map((item) => item.amount * item.price);
      const tmpTotal = arraySubTotal.reduce((prev, current) => prev + current);
      this.setTotal(tmpTotal);
    }
  }

  public setProcedureInfo(value: ProcedureInfoInterface) {
    this.procedureInfo.next(value);
  }

  public getProcedureInfo() {
    return this.procedureInfo.getValue();
  }

  public $getProcedureInfo() {
    return this.procedureInfo.asObservable();
  }

  public setPersonPayment(value?: PersonEntityInterface) {
    this.personPayment.next(value);
  }

  public getPersonPayment() {
    return this.personPayment.getValue();
  }

  public $getPersonPayment() {
    return this.personPayment.asObservable();
  }

  public setServices(value: PaymentServiceEntityInterface[]) {
    this.services.next(value);
    this.calcTotal();
  }

  public addService(value: PaymentServiceEntityInterface) {
    const params = {
      id: value.procedureId,
      serviceId: value.serviceId,
      amount: 1,
    };
    // request
    this.calcTarifaService
      .getApiList(params)
      .then((price) => {
        const tmpServices = this.getServices().filter((item) => item.serviceId !== value.serviceId);
        tmpServices.push({ ...value, price, amount: 1 });
        this.setServices(tmpServices);
      })
      .catch(() => {
        Swal.fire({
          icon: 'warning',
          text: 'No se pudo obtener la tarifa',
        });
      });
  }

  public getServices() {
    return this.services.getValue();
  }

  public $getServices() {
    return this.services.asObservable();
  }

  public editService({ row, payload }: TupaPayloadInterface<PaymentServiceEntityInterface>) {
    const tmpService = this.getServices().map((current, index) => {
      if (index == row) return payload;
      return current;
    });
    this.setServices(tmpService);
  }

  public deleteService({ row }: TupaPayloadInterface<PaymentServiceEntityInterface>) {
    const tmpServices = this.getServices().filter((_, index) => row !== index);
    this.setServices(tmpServices);
  }

  public clearServices() {
    this.setServices([]);
  }

  public setPayments(value: PaymentEntityInterface[]) {
    this.payments.next(value);
  }

  public addPayment(value: PaymentEntityInterface) {
    const tmpPayments = this.getPayments();
    tmpPayments.push(value);
    this.setPayments(tmpPayments);
  }

  public getPayments() {
    return this.payments.getValue();
  }

  public editPayment({ row, payload }: TupaPayloadInterface<PaymentEntityInterface>) {
    const tmpPayments = this.getPayments().map((current, index) => {
      if (index == row) return payload;
      return current;
    });
    this.setPayments(tmpPayments);
  }

  public deletePayment({ row }: TupaPayloadInterface<PaymentEntityInterface>) {
    const tmpServices = this.getServices().filter((_, index) => row !== index);
    this.setServices(tmpServices);
  }

  public clearPayments() {
    this.setPayments([]);
  }

  public setIsValid(value: boolean) {
    this.isValid.next(value);
  }

  public getIsValid() {
    return this.isValid.getValue();
  }

  public $getIsValid() {
    return this.isValid.asObservable();
  }
}
