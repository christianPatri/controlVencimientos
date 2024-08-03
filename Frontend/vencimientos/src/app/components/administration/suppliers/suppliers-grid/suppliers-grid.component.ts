import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subject } from 'rxjs';
import { GenericModalComponent } from '../../../common/modals/generic-modal/generic-modal.component';
import { MonthlyClientsModalComponent } from '../../monthlyClients/monthly-clients-modal/monthly-clients-modal.component';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';

@Component({
  selector: 'app-suppliers-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MonthlyClientsModalComponent, GenericModalComponent, NgxPaginationModule],
  templateUrl: './suppliers-grid.component.html',
  styleUrl: './suppliers-grid.component.css'
})
export class SuppliersGridComponent implements OnInit {

  nombreFilter: string = '';
  rutFilter: string = '';
  sellerFilter: string = '';
  filteredSuppliers: any[] = [];

  @Input() suppliers!: ProductSupplier[];
  @Input() successMessage: string = "";
  @Input() errorMessage: Subject<string> = new Subject<string>();

  @Output() supplierDeleteEvent = new EventEmitter<ProductSupplier>();
  @Output() supplierViewFileEvent = new EventEmitter<ProductSupplier>();
  @Output() supplierViewProductsEvent = new EventEmitter<ProductSupplier>();

  //Eliminar
  @ViewChild('submitModal') submitModal!: GenericModalComponent;

  _submitModalTitle: string = "Eliminar Proveedor";
  _submitedModalIsDeletingSupplier: boolean = true;
  _selectedSupplierToDelete!: ProductSupplier;
  //

  showingSupplierAlert = false;
  showingSupplierConfirmationPanel = false;
  messageError = '';

  _page: number = 1;
  _itemsPerPage: number = 5;

  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.filteredSuppliers = this.suppliers;
    this.errorMessage.subscribe(message => {
      this.messageError = message;
      this.showAlert(message);
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  filterSuppliers() {
    this.filteredSuppliers = this.suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(this.nombreFilter.toLowerCase()) &&
      supplier.rut.toLowerCase().includes(this.rutFilter.toLowerCase()) &&
      supplier.seller.toLowerCase().includes(this.sellerFilter.toLowerCase())
    );
  }

  viewSupplierFile(viewSupplierFile: ProductSupplier) {
    if (viewSupplierFile) {
      this.supplierViewFileEvent.emit(viewSupplierFile);
    }
  }

  viewSupplierProducts(supplier: ProductSupplier) {
    if (supplier) {
      this.supplierViewProductsEvent.emit(supplier);
    }
  }

  openDeleteSupplierModal(deleteSupplier: ProductSupplier){
    var selected = deleteSupplier;
    this._selectedSupplierToDelete = selected;
    this.submitModal.openModal();

  }

  handleDeleteSupplierModalEvent(event: boolean){
    if(event == false){
      this.submitModal.closeModal();
    } else{
      this.hideConfirmation();
      this.hideAlert();
      this.supplierDeleteEvent.emit(this._selectedSupplierToDelete);
      this.submitModal.closeModal();
    }
  }

  showAlert(message: string) {
    this.messageError = message;
    this.showingSupplierAlert = true;
  }

  showConfirmation(message: string) {
    this.messageError = message;
    this.showingSupplierConfirmationPanel = true;
  }

  hideAlert(){
    this.showingSupplierAlert = false;
  }

  hideConfirmation(){
    this.showingSupplierConfirmationPanel = false;
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

  navigateToSupplierGenerator(){
    this.router.navigate( ['administration/suppliers/new']);
  }
}
