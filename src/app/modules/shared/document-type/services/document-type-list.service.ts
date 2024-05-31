import { Injectable } from '@angular/core';
import { DocumentTypeEntityInterface } from '../interfaces/document-type-entity.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class DocumentTypeListService {
  constructor(private http: HttpClient) {}

  private data: DocumentTypeEntityInterface[] = [];

  public getApiList() {
    this.http.get<DocumentTypeEntityInterface[]>(`${environment.api}/documentTypes`).subscribe({
      next: (data) => (this.data = data),
      error: () => (this.data = []),
    });
  }

  public getData() {
    return this.data;
  }
}
