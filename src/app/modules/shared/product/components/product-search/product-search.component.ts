import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ProductSearchService } from '../../services/product-search.service';
import Swal from 'sweetalert2';
import { ProductSearchTableComponent } from '../product-search-table/product-search-table.component';
import { ProductEntityInterface } from '../../interfaces/product-entity.interface';

@Component({
  selector: 'app-product-search',
  standalone: true,
  templateUrl: './product-search.component.html',
  imports: [ModalComponent, ReactiveFormsModule, NgFor, NgIf, ProductSearchTableComponent],
  providers: [ProductSearchService],
})
export class ProductSearchComponent {
  public constructor(public service: ProductSearchService) {}

  @Input()
  public type: string = 'vegetal';

  @Input()
  public title: string = 'Buscar Producto';

  @Input()
  public isOpen: boolean = false;

  @Output()
  public eventClose = new EventEmitter();

  @Output()
  public eventSelect = new EventEmitter<ProductEntityInterface | undefined>();

  public searchForm = new FormGroup({
    type: new FormControl('scientificName', Validators.required),
    value: new FormControl('', Validators.required),
  });

  onClose() {
    this.eventClose.emit();
  }

  onSearch() {
    this.service
      .getApiList(this.type, {
        type: this.searchForm.value.type || '',
        value: this.searchForm.value.value || '',
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error',
          text: err?.data?.message || 'Algo salió mal',
          icon: 'error',
        });
      });
  }

  onSelect(product?: ProductEntityInterface) {
    this.onClose();
    this.eventSelect.emit(product);
  }
}
