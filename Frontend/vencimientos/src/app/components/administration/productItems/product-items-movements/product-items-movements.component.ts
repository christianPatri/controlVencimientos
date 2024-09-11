import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Product } from '../../../../models/products/product';
import { ProductItemsService } from '../../../../services/productItems/productItems.service';
import { ProductItem } from '../../../../models/productItems/productItem';
import { ProductItemStatus } from '../../../../models/productItems/productItemStatus';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';

@Component({
  selector: 'app-product-items-movements',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, SpinnerComponent],
  templateUrl: './product-items-movements.component.html',
  styleUrl: './product-items-movements.component.css'
})
export class ProductItemsMovementsComponent implements OnInit {


  @Input() product!: Product;

  _productItems!: ProductItem[];
  _isLoading: boolean = false;
  ProductItemStatus = ProductItemStatus

  _page: number = 1;
  _itemsPerPage: number = 5;

  constructor(private cdr: ChangeDetectorRef,
    private router: Router,
    private productItemsService: ProductItemsService) { }

  ngOnInit(): void {
    this._isLoading = true;
    this.getProductMovements();
  }

  getProductMovements(){
    this.productItemsService.getProductItems(this.product.id).subscribe(
      (productItems : ProductItem[]) => {
        this._productItems = productItems;
        this._isLoading = false;
        //this.getSupplierProducts();
    }, (err) => {
      //this.showAlert(err.error);
      this._isLoading = false;
    });
  }

  // handleDeleteProductModalEvent(event: boolean){
  //   if(event == false){
  //     this.submitModal.closeModal();
  //   } else{
  //     this.hideConfirmation();
  //     this.hideAlert();
  //     this.productDeleteEvent.emit(this._selectedProductToDelete);
  //     this.submitModal.closeModal();
  //   }
  // }

  // showAlert(message: string) {
  //   this.messageError = message;
  //   this.showingProductAlert = true;
  // }

  // showConfirmation(message: string) {
  //   this.messageError = message;
  //   this.showingProductConfirmationPanel = true;
  // }

  // hideAlert(){
  //   this.showingProductAlert = false;
  // }

  // hideConfirmation(){
  //   this.showingProductConfirmationPanel = false;
  // }


  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const changedProp = changes[propName];

      if (changedProp.isFirstChange()) {
        if(propName == "successMessage"){
          if(changedProp.currentValue != ""){
            // this.hideAlert();
            // this.showConfirmation(changedProp.currentValue);
            // setTimeout( () => this.hideConfirmation(), 5000);
          }

        }else {
            //Error
        }
      } else {

      }
    }
  }

  // navigateToProductGenerator(){
  //   this.router.navigate( ['administration/products/new']);
  // }
}

