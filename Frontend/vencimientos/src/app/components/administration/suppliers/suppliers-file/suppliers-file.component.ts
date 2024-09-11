import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SuppliersService } from '../../../../services/suppliers/suppliers.service';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';
import { Product } from '../../../../models/products/product';
import { ProductsService } from '../../../../services/products/products.service';
import { Subject } from 'rxjs';
import { ProductsGridComponent } from '../../products/products-grid/products-grid.component';
import { SupplierCardComponent } from '../supplier-card/supplier-card.component';


@Component({
  selector: 'app-suppliers-file',
  standalone: true,
  imports: [SpinnerComponent, CommonModule, SupplierCardComponent, PageTitleComponent, ProductsGridComponent,
    NgxPaginationModule],
  templateUrl: './suppliers-file.component.html',
  styleUrl: './suppliers-file.component.css'
})
export class SuppliersFileComponent implements OnInit {

  //

  _pageTitle: string = "Ficha Proveedor";
  _supplierId: number = -1;
  _isLoading: boolean = false;
  _supplier: ProductSupplier = new ProductSupplier();

  //


  //Products
  _supplierProducts!: Product[];
  _isLoadingProducts: boolean = false;
  productSuccessMessage: string = "";
  errorProductDelete: Subject<string> = new Subject<string>();

  //


  //Vehicles
  vehicleSuccessMessage: string = "";
  errorUpdate: Subject<string> = new Subject<string>();
  //_monthlyClientVehicles!: MonthlyVehicle[];

  //EDIT CLIENT

  //BILLS
  //_monthlyClientBills : Bill[] = [];
  billSuccessMessage: string = "";
  errorBillCreate: Subject<string> = new Subject<string>();

  //Parking movements
  //_isLoadingMovements: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suppliersService: SuppliersService,
    private productsService: ProductsService){
  }

  ngOnInit(): void {
    this._isLoading = true;
    this._isLoadingProducts = true;

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if(id != null) {
        this._supplierId = Number(id);
        this.getSupplierInformation();
      };
    });
  }

  getSupplierInformation(){
    this.suppliersService.getSupplier(this._supplierId).subscribe(
      (supplier : ProductSupplier) => {
        this._supplier = supplier;
        this._isLoading = false;
        this.getSupplierProducts();
    }, (err) => {
      //this.showAlert(err.error);
      this._isLoading = false;
    });
  }

  getSupplierProducts() {
    this.productsService.getSupplierProducts(this._supplierId).subscribe(
      (products : Product[]) => {
        this._supplierProducts = products;
        this._isLoadingProducts = false;

      }, (err) => {
        this._isLoadingProducts = false;
        console.log(err);
      }
    )
  }

  //Products Interaction
  handleDeleteProduct(productToDelete: Product) {
    if (productToDelete) {
      this.productsService.deleteProduct(productToDelete).subscribe(
        (response: any) => {
          this.productSuccessMessage = "Producto Eliminado";
          this._isLoading = true;
          this.getSupplierProducts();
      }, (err) => {
        this.triggerErrorProduct(err.error);
      });
    }
  }

  handleViewProductFile(product: Product) {
    this.router.navigate( [`administration/products/file/${product.id}`]);
  }

  triggerErrorProduct(message: string): void {
    this.errorProductDelete.next(message);
  }

  //Supplier Interaction

  handleEditSupplier(supplierToEdit : ProductSupplier){
    console.log(supplierToEdit);
  }

  // getMonthlyVehiclesMovements(): void {
  //   let vehicles = this._monthlyClient.vehicles;

  //   const requests  = vehicles.map(vehicle => {
  //     let input = new MonthlyVehicleMovements();
  //     input.monthlyVehicleId = vehicle.id;
  //     const now = new Date();
  //     input.from = new Date(now.getFullYear(), now.getMonth(), 1).toDateString();

  //     return this.monthlyVehicleService.getMonthlyVehicleMovements(input).pipe(
  //       map(response => {
  //         vehicle.vehicleParkingLogs = response;
  //       }))
  //   });

  //   forkJoin(requests).subscribe({
  //     next: (responses: any) => {
  //       this._isLoadingMovements = false;
  //     },
  //     error: (error) => {
  //       this._isLoadingMovements = false;
  //     }
  //   });
  // }

  // getMonthlyClientBills(): void {
  //   this.billService.getMonthlyClientBills(this.monthlyClientId).subscribe(
  //     (bills : Bill[]) => {
  //       this._monthlyClientBills = bills;
  //       //this._isLoading = false;

  //   }, (err) => {
  //     //this.showAlert(err.error);
  //     this._isLoading = false;
  //   });
  // }

  // mapModalVehicleCreate(newMonthlyVehicle: MonthlyVehicle){
  //   this.vehicleSuccessMessage = "";
  //   var monthlyVehicle = new MonthlyVehicle();

  //   monthlyVehicle.brand = newMonthlyVehicle.brand;
  //   monthlyVehicle.model = newMonthlyVehicle.model;
  //   monthlyVehicle.licenseplate = newMonthlyVehicle.licenseplate;
  //   monthlyVehicle.color = newMonthlyVehicle.color;
  //   monthlyVehicle.price = newMonthlyVehicle.price;

  //   let monthlyVehicleGenerator = new MonthlyVehicleGenerator();
  //   monthlyVehicleGenerator.monthlyClient = this._monthlyClient;
  //   monthlyVehicleGenerator.monthlyVehicles = [];
  //   monthlyVehicleGenerator.monthlyVehicles.push(monthlyVehicle);

  //   this.monthlyVehicleService.generateMonthlyVehicle(monthlyVehicleGenerator).subscribe(
  //     (response: MonthlyVehicleGenerator) => {
  //       this.getMonthlyClientInformation();
  //       this.vehicleSuccessMessage = "Vehiculo agregado";
  //     }, (errVehicle) => {
  //       this._isLoading = false;
  //       this.triggerErrorUpdate(errVehicle.error);
  //     });
  // }

  // mapModalVehicleEdit(monthlyVehicleToEdit: MonthlyVehicle,){
  //   this.vehicleSuccessMessage = "";
  //   this.monthlyVehicleService.updateMonthlyVehicle(monthlyVehicleToEdit).subscribe(
  //     (response: MonthlyVehicle) => {
  //       this.vehicleSuccessMessage = "Vehiculo actualizado";
  //       var monthlyVehicle = this._monthlyClient.vehicles.find(v => v.id == monthlyVehicleToEdit.id);

  //       if(monthlyVehicle != null){
  //         monthlyVehicle.brand = response.brand;
  //         monthlyVehicle.model = response.model;
  //         monthlyVehicle.licenseplate = response.licenseplate;
  //         monthlyVehicle.color = response.color;
  //         monthlyVehicle.price = response.price;
  //       }
  //     }, (errVehicle) => {
  //       this._isLoading = false;
  //       this.triggerErrorUpdate(errVehicle.error);
  //     });
  // }


  // handleEditMonthlyClient(mcToEdit: MonthlyClient) {
  //   if (mcToEdit) {
  //     this.monthlyClientService.updateMonthlyClient(mcToEdit).subscribe(
  //       (response: MonthlyClient) => {
  //         //this.hideAlert();
  //         //this.showConfirmation('Se ha actualizado con exito');
  //         this._isLoading = true;
  //         this.ngOnInit();
  //     }, (err) => {
  //       this._isLoading = false;
  //       //this.showAlert(err.error);
  //     });
  //   }
  // }

  // handleManualBillCreate(manualBill: Bill) {
  //   if (manualBill) {
  //     manualBill.monthlyClient = this._monthlyClient;
  //     manualBill.monthlyClientId = this._monthlyClient.id;
  //     this.billService.generateManualMonthlyClientBill(manualBill).subscribe(
  //       (response: Bill) => {
  //         //this.hideAlert();
  //         //this.showConfirmation('Se ha actualizado con exito');
  //         //this._isLoading = true;
  //         this.billSuccessMessage = "Factura generada";
  //         this.getMonthlyClientBills();
  //     }, (err) => {
  //       //this._isLoading = false;
  //       //this.showAlert(err.error);
  //       this.triggerErrorBill(err.error);
  //     });
  //   }
  // }

  // handlePayBillEvent(billToPay: Bill) {
  //   if(billToPay) {
  //     this.billService.payBill(billToPay).subscribe(
  //       (response: Bill) => {
  //         this.billSuccessMessage = "Factura pagada";
  //         this.getMonthlyClientBills();
  //       }, (err) => {
  //         this.triggerErrorBill(err.error);
  //       }
  //     );
  //   }
  // }

  // handleMonthlyVehicleDeleteEvent(monthlyVehicle: MonthlyVehicle) {
  //   if(monthlyVehicle) {
  //     this.monthlyVehicleService.deleteMonthlyVehicle(monthlyVehicle).subscribe(
  //       (response: MonthlyVehicle) => {
  //         this.vehicleSuccessMessage = "Vehiculo Eliminado";
  //         this.getMonthlyClientInformation();
  //       }, (errVehicle) => {
  //         this._isLoading = false;
  //         this.triggerErrorUpdate(errVehicle.error);
  //       }
  //     );
  //   }
  // }

  triggerErrorUpdate(message: string): void {
    this.errorUpdate.next(message);
  }

  triggerErrorBill(message: string): void {
    this.errorBillCreate.next(message);
  }

  // handleMonthlyVehicleViewMovementsEvent(monthlyVehicle: MonthlyVehicle) {

  //   this.router.navigate( [`administration/monthlyClients/file/${this.monthlyClientId}/vehicleMovements`], { state: monthlyVehicle });

  // }

}
