import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subject } from 'rxjs';
import { Product } from '../../../../models/products/product';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';
import { ProductsService } from '../../../../services/products/products.service';
import { SuppliersService } from '../../../../services/suppliers/suppliers.service';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';
import { SupplierCardComponent } from '../../suppliers/supplier-card/supplier-card.component';
import { ProductsGridComponent } from '../products-grid/products-grid.component';
import { ProductsCardComponent } from '../products-card/products-card.component';
import { ProductItemsMovementsComponent } from '../../productItems/product-items-movements/product-items-movements.component';

@Component({
  selector: 'app-products-file',
  standalone: true,
  imports: [SpinnerComponent, CommonModule, ProductsCardComponent, PageTitleComponent, ProductItemsMovementsComponent,
    NgxPaginationModule],
  templateUrl: './products-file.component.html',
  styleUrl: './products-file.component.css'
})
export class ProductsFileComponent implements OnInit {

  _pageTitle: string = "Ficha Producto";
  _productId: number = -1;
  _isLoading: boolean = false;
  _product: Product = new Product();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suppliersService: SuppliersService,
    private productsService: ProductsService){
  }

  ngOnInit(): void {
    this._isLoading = true;
    //this._isLoadingProducts = true;

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if(id != null) {
        this._productId = Number(id);
        this.getProductInformation();
      };
    });
  }

  getProductInformation(){
    this.productsService.getProduct(this._productId).subscribe(
      (product : Product) => {
        this._product = product;
        this._isLoading = false;
        //this.getSupplierProducts();
    }, (err) => {
      //this.showAlert(err.error);
      this._isLoading = false;
    });
  }

  // getSupplierProducts() {
  //   this.productsService.getSupplierProducts(this._supplierId).subscribe(
  //     (products : Product[]) => {
  //       this._supplierProducts = products;
  //       this._isLoadingProducts = false;

  //     }, (err) => {
  //       this._isLoadingProducts = false;
  //       console.log(err);
  //     }
  //   )
  // }

  //Products Interaction
  // handleDeleteProduct(productToDelete: Product) {
  //   if (productToDelete) {
  //     this.productsService.deleteProduct(productToDelete).subscribe(
  //       (response: any) => {
  //         this.productSuccessMessage = "Producto Eliminado";
  //         this._isLoading = true;
  //         this.getSupplierProducts();
  //     }, (err) => {
  //       this.triggerErrorProduct(err.error);
  //     });
  //   }
  // }

  // triggerErrorProduct(message: string): void {
  //   this.errorProductDelete.next(message);
  // }


  handleEditProduct(productToEdit : Product){
    console.log(productToEdit);
  }

  // triggerErrorUpdate(message: string): void {
  //   this.errorUpdate.next(message);
  // }

  // triggerErrorBill(message: string): void {
  //   this.errorBillCreate.next(message);
  // }

}
