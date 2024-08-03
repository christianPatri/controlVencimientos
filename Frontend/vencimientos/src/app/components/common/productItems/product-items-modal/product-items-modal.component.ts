import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Product } from '../../../../models/products/product';
import { ProductItem } from '../../../../models/productItems/productItem';
import { ProductItemsCreateComponent } from '../product-items-create/product-items-create.component';
import { ProductItemsEditComponent } from '../product-items-edit/product-items-edit.component';

@Component({
  selector: 'app-product-items-modal',
  standalone: true,
  imports: [CommonModule, ProductItemsCreateComponent, ProductItemsEditComponent],
  templateUrl: './product-items-modal.component.html',
  styleUrl: './product-items-modal.component.css'
})
export class ProductItemsModalComponent  {
  isOpen = false;
  productItemData!: ProductItem;

  @ViewChild('productItemsCreate') productItemCreateComponent!: ProductItemsCreateComponent;
  @ViewChild('productItemsEdit') productItemEditModal!: ProductItemsEditComponent;

  @Output() productItemCreatedModal = new EventEmitter<ProductItem>();
  @Output() productItemEditedModal = new EventEmitter<ProductItem>();

  @Input() isEditing!: boolean;
  @Input() productSelected!: Product;
  @Input() productItemToEdit!: ProductItem;

  constructor() { }

  ngOnInit() { }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;

    if(this.productItemCreateComponent) this.productItemCreateComponent.clearFormFields();
    if(this.productItemEditModal) this.productItemEditModal.clearFormFields();
  }

  handleProductItemCreated(productItemData: ProductItem) {
    this.productItemData = productItemData;
    this.productItemCreatedModal.emit(this.productItemData);
  }

  handleProductItemEdited(productData: ProductItem) {
    this.productItemData = productData;
    this.productItemEditedModal.emit(this.productItemData);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties
    if (changes['productSelected']) {
      let user = changes['productSelected'].currentValue;
    }

    // Perform any necessary updates based on the changes
  }

}
