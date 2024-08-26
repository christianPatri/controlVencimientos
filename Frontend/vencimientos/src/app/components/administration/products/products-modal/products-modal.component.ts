import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Product } from '../../../../models/products/product';
import { ProductsCreateComponent } from '../products-create/products-create.component';
import { ProductsEditComponent } from '../products-edit/products-edit.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-modal',
  standalone: true,
  imports: [CommonModule, ProductsCreateComponent, ProductsEditComponent],
  templateUrl: './products-modal.component.html',
  styleUrl: './products-modal.component.css'
})
export class ProductsModalComponent {
  isOpen = false;
  productData!: Product;

  @ViewChild('productsCreate') productCreateComponent!: ProductsCreateComponent;
  @ViewChild('productsEdit') productEditeModal!: ProductsEditComponent;

  @Output() productCreatedModal = new EventEmitter<Product>();
  @Output() productEditedModal = new EventEmitter<Product>();

  @Input() isEditing!: boolean;
  @Input() productToEdit!: Product;

  constructor() { }

  ngOnInit() { }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;

    if(this.productCreateComponent) this.productCreateComponent.clearFormFields();
    if(this.productEditeModal) this.productEditeModal.clearFormFields();
  }

  showRegisterUserMessage() {

  }

  handleProductCreated(productData: Product) {
    this.productData = productData;
    this.productCreatedModal.emit(this.productData);
  }

  handleProductEdited(productData: Product) {
    this.productData = productData;
    this.productEditedModal.emit(this.productData);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties
    if (changes['productToEdit']) {
      let user = changes['productToEdit'].currentValue;
    }

    // Perform any necessary updates based on the changes
  }

}
