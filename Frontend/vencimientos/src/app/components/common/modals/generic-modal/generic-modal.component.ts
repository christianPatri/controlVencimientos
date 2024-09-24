import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Bill } from '../../../../models/bills/bill';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { MonthlyVehicle } from '../../../../models/vehicles/monthlyVehicle';
import { BillsPaymentComponent } from '../../../administration/bills/bills-payment/bills-payment.component';
import { MonthlyClientDeleteComponent } from '../../../administration/monthlyClients/monthly-client-delete/monthly-client-delete.component';
import { MonthlyVehicleDeleteComponent } from '../../../administration/monthlyVehicles/monthly-vehicle-delete/monthly-vehicle-delete.component';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';
import { Product } from '../../../../models/products/product';
import { ProductItem } from '../../../../models/productItems/productItem';
import { User } from '../../../../models/users/user';

@Component({
  selector: 'app-generic-modal',
  standalone: true,
  imports: [CommonModule, BillsPaymentComponent, MonthlyVehicleDeleteComponent, MonthlyClientDeleteComponent],
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.css'
})
export class GenericModalComponent implements OnInit{

  isOpen = false;

  @Output() submittedButton = new EventEmitter<boolean>();
  @Output() cancelButton = new EventEmitter<boolean>();


  @Input() modalTitle!: string;
  @Input() modalBarTitle!: string;

  @Input() isCreatingClient!: boolean;
  @Input() clientDataToShow!: MonthlyClient;
  @Input() vehicleDataToShow!: MonthlyVehicle[];

  //Suppliers Create

  @Input() isCreatingSupplier!: boolean;
  @Input() supplierDataToShow!: ProductSupplier;
  @Input() productsDataToShow!: Product[];

  //Products Create

  @Input() isCreatingProducts!: boolean;

  //Product Items Create

  @Input() isCreatingProductItems!: boolean;
  @Input() productItemsDataToShow!: ProductItem[];

  // Users
  @Input() isDeletingUser!: boolean;
  @Input() userDataToShow!: User;

  //Bills

  @Input() isPayingBill!: boolean;
  @Input() billToShow!: Bill;

  //Delete Vehicle

  @Input() isDeletingVehicle!: boolean;
  @Input() vehicleToDelete!: MonthlyVehicle;

  //Delete Monthly CLient

  @Input() isDeletingMonthlyClient!: boolean;
  @Input() monthlyClientToDelete!: MonthlyClient;

  //Delete Supplier

  @Input() isDeletingSupplier!: boolean;
  @Input() supplierToDelete!: ProductSupplier;

  //Delete Supplier

  @Input() isDeletingProduct!: boolean;
  @Input() productToDelete!: Product;


  //Session
  @Input() isLoggingOut!:boolean;


  constructor() { }

  ngOnInit() { }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  handleSubmit() {
    this.submittedButton.emit(true);
  }

  handleCancel() {
    this.submittedButton.emit(false);
  }

  onOverlayClick(event: Event) {
    // Si el clic es en el overlay y no en el contenedor del modal, cierra el modal
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

}
