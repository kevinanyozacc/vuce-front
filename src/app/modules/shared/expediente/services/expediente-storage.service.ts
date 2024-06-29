import { inject, Injectable } from '@angular/core';
import { ExpedienteStorageInterface } from '../interfaces/expediente-storage.interface';
import { ExpedienteSaveResponseInterface } from '../interfaces/expediente-save-response.interface';
import { TupaRequestService } from '../../tupa/services/tupa-request.service';
import { TupaDetailService } from '../../tupa/services/tupa-detail.service';
import { TupaEstablishmentService } from '../../tupa/services/tupa-establishment.service';
import { TupaProductService } from '../../tupa/services/tupa-product.service';
import { TupaPaymentService } from '../../tupa/services/tupa-payment.service';
import { ProcedureInfoService } from '../../procedure/services/procedure-info.service';

@Injectable()
export class ExpedienteStorageService {
  private prefix = 'expediente';
  public requestService = inject(TupaRequestService);
  public establishmentService = inject(TupaEstablishmentService);
  public detailService = inject(TupaDetailService);
  public productService = inject(TupaProductService);
  public paymentService = inject(TupaPaymentService);
  public procedureService = inject(ProcedureInfoService);

  public setPrefix(value: string) {
    this.prefix = value;
  }

  public getPrefix() {
    return this.prefix;
  }

  public set(procedureId: string, tmpExpediente: ExpedienteSaveResponseInterface) {
    const payload = {
      sede: this.paymentService.getSede(),
      person: this.requestService.getPerson(),
      representante: this.requestService.getRepresentante(),
      establishment: this.establishmentService.getEstablishment(),
      technical: this.establishmentService.getTechnical(),
      personPayment: this.paymentService.getPersonPayment(),
      detalle: this.detailService.getDetail(),
      productType: this.productService.getProductType(),
      products: this.productService.getProducts(),
      services: this.paymentService.getServices(),
      payments: this.paymentService.getPayments(),
      tmpExpediente,
    };
    // save localstorage
    const data = JSON.stringify(payload || null);
    localStorage.setItem(`${this.prefix}-${procedureId}`, data);
  }

  public get(procedureId: string): ExpedienteStorageInterface | undefined {
    const tmpData = localStorage.getItem(`${this.prefix}-${procedureId}`);
    if (!tmpData) return undefined;
    return JSON.parse(tmpData || 'undefined');
  }

  public remove(procedureId: string) {
    localStorage.removeItem(`${this.prefix}-${procedureId}`);
  }

  public settingCache(procedureId: string) {
    return new Promise<ExpedienteStorageInterface>((resolve, reject) => {
      const data = this.get(procedureId);
      if (!data) return reject(new Error('No existe!'));
      this.requestService.setPerson(data.person);
      this.requestService.setRepresentante(data.representante);
      this.establishmentService.setEstablishment(data.establishment);
      this.establishmentService.setTechnical(data.technical);
      this.detailService.setDetail(data.detalle);
      this.paymentService.setSede(data.sede);
      this.paymentService.setPersonPayment(data.personPayment);
      this.productService.setProductType(data.productType);
      this.productService.setProducts(data.products || []);
      this.paymentService.setServices(data.services || []);
      this.paymentService.setPayments(data.payments || []);
      resolve(data);
    });
  }
}
