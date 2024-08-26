import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';
import { SuppliersCreateComponent } from '../suppliers-create/suppliers-create.component';
import { SuppliersGridComponent } from '../suppliers-grid/suppliers-grid.component';
import { SuppliersService } from '../../../../services/suppliers/suppliers.service';
import { SuppliersModalComponent } from '../suppliers-modal/suppliers-modal.component';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [SuppliersModalComponent, CommonModule, SuppliersCreateComponent, SuppliersGridComponent, PageTitleComponent, SpinnerComponent],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent implements OnInit {

  _newSupplier: ProductSupplier = new ProductSupplier();
  _supplierList: ProductSupplier[] = [];

  messageError = '';

  _isLoading: Boolean = true;
  _pageTitle: string = "Administracion Proveedores";

  supplierSuccessMessage: string = "";
  errorSupplierDelete: Subject<string> = new Subject<string>();

  constructor(
    private supplierService: SuppliersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this._isLoading = true;
    this.getSuppliers();
  }

  getSuppliers() {
    this.supplierService.getActiveSuppliers().subscribe(
      (suppliers : ProductSupplier[]) => {
        this._supplierList = suppliers;
        this._isLoading = false;
    }, (err) => {
      //this.showAlert(err.error);
      this._isLoading = false;
    });
  }

  handleDeleteSupplier(supplierToDelete: ProductSupplier) {

    if (supplierToDelete) {
      this.supplierService.deleteSupplier(supplierToDelete).subscribe(
        (response: any) => {
          this.supplierSuccessMessage = "Proveedor Eliminado";
          this._isLoading = true;
          this.getSuppliers();
      }, (err) => {
        this.triggerErrorSupplier(err.error);
      });
    }
  }

  triggerErrorSupplier(message: string): void {
    this.errorSupplierDelete.next(message);
  }

  handleViewSupplierFile(supplier: ProductSupplier) {
    this.router.navigate( [`administration/suppliers/file/${supplier.id}`]);
  }

  handleViewSupplierProducts(supplier: ProductSupplier) {
    this.router.navigate( [`administration/suppliers/products/${supplier.id}`]);
  }
}


