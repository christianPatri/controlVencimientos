import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';
import { SuppliersCreateComponent } from '../suppliers-create/suppliers-create.component';
import { SuppliersEditComponent } from '../suppliers-edit/suppliers-edit.component';

@Component({
  selector: 'app-suppliers-modal',
  standalone: true,
  imports: [CommonModule, SuppliersCreateComponent, SuppliersEditComponent],
  templateUrl: './suppliers-modal.component.html',
  styleUrl: './suppliers-modal.component.css'
})
export class SuppliersModalComponent implements OnInit{

  isOpen = false;
  supplierData!: ProductSupplier;

  @ViewChild('suppliersCreate') supplierCreateComponent!: SuppliersCreateComponent;
  @ViewChild('suppliersEdit') supplierEditComponent!: SuppliersEditComponent;

  @Output() supplierCreatedModal = new EventEmitter<ProductSupplier>();
  @Output() supplierEditedModal = new EventEmitter<ProductSupplier>();

  @Input() isEditing!: boolean;
  @Input() supplierToEdit!: ProductSupplier;

  constructor() { }

  ngOnInit() { }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;

    if(this.supplierCreateComponent) this.supplierCreateComponent.clearFormFields();
    if(this.supplierEditComponent) this.supplierEditComponent.clearFormFields();

  }

  showRegisterUserMessage() {

  }

  handleSupplierCreated(supplierData: ProductSupplier) {
    this.supplierData = supplierData;
    this.supplierCreatedModal.emit(this.supplierData);
  }

  handleSupplierEdited(supplierData: ProductSupplier) {
    this.supplierData = supplierData;
    this.supplierEditedModal.emit(this.supplierData);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties
    if (changes['supplierToEdit']) {
      let user = changes['supplierToEdit'].currentValue;
    }

    // Perform any necessary updates based on the changes
  }
}
