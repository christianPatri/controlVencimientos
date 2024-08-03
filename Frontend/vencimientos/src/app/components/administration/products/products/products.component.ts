import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from '../../../../models/products/product';
import { ProductsService } from '../../../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';
import { ProductsGridComponent } from '../products-grid/products-grid.component';
import { ProductsCreateComponent } from '../products-create/products-create.component';
import { ProductsModalComponent } from '../products-modal/products-modal.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsModalComponent, CommonModule, ProductsCreateComponent, ProductsGridComponent, PageTitleComponent, SpinnerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  _newProduct: Product = new Product();
  _productList: Product[] = [];

  messageError = '';

  _isLoading: Boolean = true;
  _pageTitle: string = "Administracion Productos";

  productSuccessMessage: string = "";
  errorProductDelete: Subject<string> = new Subject<string>();

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this._isLoading = true;
    this.getProducts();
  }

  getProducts() {
    this.productService.getActiveProducts().subscribe(
      (products : Product[]) => {
        this._productList = products;
        this._isLoading = false;
    }, (err) => {
      //this.showAlert(err.error);
      this._isLoading = false;
    });
  }

  handleDeleteProduct(productToDelete: Product) {

    if (productToDelete) {
      this.productService.deleteProduct(productToDelete).subscribe(
        (response: any) => {
          this.productSuccessMessage = "Proveedor Eliminado";
          this._isLoading = true;
          this.getProducts();
      }, (err) => {
        this.triggerErrorProduct(err.error);
      });
    }
  }

  triggerErrorProduct(message: string): void {
    this.errorProductDelete.next(message);
  }

  navigateToProductsGenerator(){
    this.router.navigate( ['administration/products/new']);
  }

  handleViewProductFile(product: Product) {
    this.router.navigate( [`administration/products/file/${product.id}`]);
  }
}

