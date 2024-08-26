import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Product } from '../../../../models/products/product';
import { ProductItem } from '../../../../models/productItems/productItem';
import { ProductItemsCreateComponent } from '../product-items-create/product-items-create.component';
import { ProductItemsEditComponent } from '../product-items-edit/product-items-edit.component';
import { ProductItemCheckComponent } from '../product-item-check/product-item-check.component';

@Component({
  selector: 'app-product-items-modal',
  standalone: true,
  imports: [CommonModule, ProductItemsCreateComponent, ProductItemsEditComponent, ProductItemCheckComponent],
  templateUrl: './product-items-modal.component.html',
  styleUrl: './product-items-modal.component.css'
})
export class ProductItemsModalComponent  {
  isOpen = false;
  productItemData!: ProductItem;

  @ViewChild('productItemsCreate') productItemCreateComponent!: ProductItemsCreateComponent;
  @ViewChild('productItemsEdit') productItemEditModal!: ProductItemsEditComponent;
  @ViewChild('productItemCheck') productItemCheckModal!: ProductItemCheckComponent;

  @Output() productItemCreatedModal = new EventEmitter<ProductItem>();
  @Output() productItemEditedModal = new EventEmitter<ProductItem>();
  @Output() productItemCheckedModal = new EventEmitter<ProductItem>();

  @Input() isEditing!: boolean;
  @Input() productSelected!: Product;
  @Input() productItemToEdit!: ProductItem;

  @Input() isCheckingProductItem!: boolean;
  @Input() productItemToCheck!: ProductItem;

  constructor() { }

  ngOnInit() { }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;

    if(this.productItemCreateComponent) this.productItemCreateComponent.clearFormFields();
    if(this.productItemEditModal) this.productItemEditModal.clearFormFields();
    if(this.productItemCheckModal) this.productItemCheckModal.clearFormFields();
  }

  handleProductItemCreated(productItemData: ProductItem) {
    this.productItemData = productItemData;
    this.productItemCreatedModal.emit(this.productItemData);
  }

  handleProductItemEdited(productData: ProductItem) {
    this.productItemData = productData;
    this.productItemEditedModal.emit(this.productItemData);
  }

  handleProductItemChecked(productData: ProductItem) {
    this.productItemData = productData;
    this.productItemCheckedModal.emit(this.productItemData);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties
    if (changes['productSelected']) {
      let user = changes['productSelected'].currentValue;
    }

    // Perform any necessary updates based on the changes
  }

}
