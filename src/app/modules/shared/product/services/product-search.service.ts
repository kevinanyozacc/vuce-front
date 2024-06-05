import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductEntityInterface } from '../interfaces/product-entity.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductSearchService {
  constructor(private http: HttpClient) {}

  private data: ProductEntityInterface[] = [];

  public getApiList(path: string, params: ProductSearchRequest) {
    return new Promise<ProductEntityInterface[]>((resolve, reject) => {
      this.http
        .get<ProductEntityInterface[]>(`${environment.api}/products/search/${params.type}/${path}/${params.value}`)
        .subscribe({
          next: (data) => {
            this.data = data;
            resolve(data);
          },
          error: (err) => {
            this.data = [];
            reject(err);
          },
        });
    });
  }

  public getData() {
    return this.data;
  }
}

export interface ProductSearchRequest {
  type: string;
  value: string;
}
