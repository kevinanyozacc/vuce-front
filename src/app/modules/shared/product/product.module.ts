import { NgModule } from '@angular/core';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductAnimalCreateComponent } from './components/product-animal-create/product-animal-create.component';
import { ProductAnimalEditComponent } from './components/product-animal-edit/product-animal-edit.component';
import { ProductAnimalTableComponent } from './components/product-animal-table/product-animal-table.component';
import { ProductSearchTableComponent } from './components/product-search-table/product-search-table.component';
import { ProductSubProductCreateComponent } from './components/product-subproduct-create/product-subproduct-create.component';
import { ProductSubProductEditComponent } from './components/product-subproduct-edit/product-subproduct-edit.component';
import { ProductSubproductTableComponent } from './components/product-subproduct-table/product-subproduct-table.component';

@NgModule({
  imports: [
    ProductSearchComponent,
    ProductAnimalCreateComponent,
    ProductAnimalEditComponent,
    ProductAnimalTableComponent,
    ProductSearchTableComponent,
    ProductSubProductCreateComponent,
    ProductSubProductEditComponent,
    ProductSubproductTableComponent,
  ],
  exports: [
    ProductSearchComponent,
    ProductAnimalCreateComponent,
    ProductAnimalEditComponent,
    ProductAnimalTableComponent,
    ProductSearchTableComponent,
    ProductSubProductCreateComponent,
    ProductSubProductEditComponent,
    ProductSubproductTableComponent,
  ],
})
export class ProductModule {}
