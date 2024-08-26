import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Product } from '../../../../models/products/product';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subject } from 'rxjs';
import { GenericModalComponent } from '../../../common/modals/generic-modal/generic-modal.component';
import { ProductsModalComponent } from '../products-modal/products-modal.component';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ProductsModalComponent, GenericModalComponent, NgxPaginationModule],
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.css'
})
export class ProductsGridComponent implements OnInit {

  nombreFilter: string = '';
  barCodeFilter: string = '';
  descriptionFilter: string = '';
  filteredProducts: any[] = [];

  @Input() products!: Product[];
  @Input() successMessage: string = "";
  @Input() errorMessage: Subject<string> = new Subject<string>();

  @Output() productDeleteEvent = new EventEmitter<Product>();
  @Output() productViewFileEvent = new EventEmitter<Product>();

  //Eliminar
  @ViewChild('submitModal') submitModal!: GenericModalComponent;

  //ProductItems

  @Input() isAddingProductItems!: boolean;
  @Output() addProductItemEvent = new EventEmitter<Product>();

  _submitModalTitle: string = "Eliminar Producto";
  _submitedModalIsDeletingProduct: boolean = true;
  _selectedProductToDelete!: Product;
  //

  showingProductAlert = false;
  showingProductConfirmationPanel = false;
  messageError = '';

  _page: number = 1;
  _itemsPerPage: number = 5;

  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.filteredProducts = this.products;
    this.errorMessage.subscribe(message => {
      this.messageError = message;
      this.showAlert(message);
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.nombreFilter.toLowerCase()) &&
      product.barCode.toLowerCase().includes(this.barCodeFilter.toLowerCase()) &&
      product.description.toLowerCase().includes(this.descriptionFilter.toLowerCase())
    );
  }

  viewProductFile(viewProductFile: Product) {
    if (viewProductFile) {
      this.productViewFileEvent.emit(viewProductFile);
    }
  }

  addProductItems(product: Product){
    if(product){
      this.addProductItemEvent.emit(product);
    }
  }

  openDeleteProductModal(deleteProduct: Product){
    var selected = deleteProduct;
    this._selectedProductToDelete = selected;
    this.submitModal.openModal();

  }

  handleDeleteProductModalEvent(event: boolean){
    if(event == false){
      this.submitModal.closeModal();
    } else{
      this.hideConfirmation();
      this.hideAlert();
      this.productDeleteEvent.emit(this._selectedProductToDelete);
      this.submitModal.closeModal();
    }
  }

  showAlert(message: string) {
    this.messageError = message;
    this.showingProductAlert = true;
  }

  showConfirmation(message: string) {
    this.messageError = message;
    this.showingProductConfirmationPanel = true;
  }

  hideAlert(){
    this.showingProductAlert = false;
  }

  hideConfirmation(){
    this.showingProductConfirmationPanel = false;
  }


  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const changedProp = changes[propName];

      if (changedProp.isFirstChange()) {
        if(propName == "successMessage"){
          if(changedProp.currentValue != ""){
            this.hideAlert();
            this.showConfirmation(changedProp.currentValue);
            setTimeout( () => this.hideConfirmation(), 5000);
          }

        }else {
            //Error
        }
      } else {

      }
    }
  }

  navigateToProductGenerator(){
    this.router.navigate( ['administration/products/new']);
  }
}

