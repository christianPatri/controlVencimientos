import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, Observable, Subject } from 'rxjs';
import { Bill } from '../../../../models/bills/bill';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { MonthlyParkingLog } from '../../../../models/vehicles/monthlyParkingLog';
import { MonthlyVehicle } from '../../../../models/vehicles/monthlyVehicle';
import { MonthlyVehicleGenerator } from '../../../../models/vehicles/monthlyVehicleGenerator';
import { MonthlyVehicleMovements } from '../../../../models/vehicles/monthlyVehicleMovements';
import { BillService } from '../../../../services/bills/bill.service';
import { MonthlyClientService } from '../../../../services/monthlyClients/monthlyClient.service';
import { MonthlyVehicleService } from '../../../../services/monthlyVehicles/monthlyVehicle.service';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { MonthlyClientSideCardComponent } from '../../../common/sidecards/monthly-client-side-card/monthly-client-side-card.component';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';
import { BillsGridComponent } from '../../bills/bills-grid/bills-grid.component';
import { MonthlyVehiclesGridComponent } from '../../monthlyVehicles/monthly-vehicles-grid/monthly-vehicles-grid.component';
import { MonthlyVehiclesModalComponent } from '../../monthlyVehicles/monthly-vehicles-modal/monthly-vehicles-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MonthlyVehicleMovementsComponent } from '../../monthlyVehicles/monthly-vehicle-movements/monthly-vehicle-movements.component';

@Component({
  selector: 'app-monthly-clients-file',
  standalone: true,
  imports: [SpinnerComponent, CommonModule, MonthlyVehiclesModalComponent, MonthlyClientSideCardComponent, PageTitleComponent,
     MonthlyVehiclesGridComponent, BillsGridComponent, NgxPaginationModule, MonthlyVehicleMovementsComponent],
  templateUrl: './monthly-clients-file.component.html',
  styleUrl: './monthly-clients-file.component.css'
})
export class MonthlyClientsFileComponent implements OnInit {

  _pageTitle: string = "Ficha de cliente mensual";
  monthlyClientId: number = -1;
  _monthlyClient: MonthlyClient = new MonthlyClient();
  _isLoading: boolean = false;

  //Vehicles
  vehicleSuccessMessage: string = "";
  errorUpdate: Subject<string> = new Subject<string>();
  _monthlyClientVehicles!: MonthlyVehicle[];

  //EDIT CLIENT

  //BILLS
  _monthlyClientBills : Bill[] = [];
  billSuccessMessage: string = "";
  errorBillCreate: Subject<string> = new Subject<string>();

  //Parking movements
  _isLoadingMovements: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monthlyClientService: MonthlyClientService,
    private monthlyVehicleService: MonthlyVehicleService,
    private billService: BillService){
  }

  ngOnInit(): void {
    this._isLoading = true;
    this._isLoadingMovements = true;

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if(id != null) {
        this.monthlyClientId = Number(id);
        this.getMonthlyClientInformation();
      };
    });
  }

  getMonthlyClientInformation(){
    this.monthlyClientService.getMonthlyClient(this.monthlyClientId).subscribe(
      (monthlyClient : MonthlyClient) => {
        this._monthlyClient = monthlyClient;
        this._monthlyClientVehicles = monthlyClient.vehicles;
        this._isLoading = false;
        this.getMonthlyVehiclesMovements();
        this.getMonthlyClientBills();
    }, (err) => {
      //this.showAlert(err.error);
      this._isLoading = false;
    });
  }

  getMonthlyVehiclesMovements(): void {
    let vehicles = this._monthlyClient.vehicles;

    const requests  = vehicles.map(vehicle => {
      let input = new MonthlyVehicleMovements();
      input.monthlyVehicleId = vehicle.id;
      const now = new Date();
      input.from = new Date(now.getFullYear(), now.getMonth(), 1).toDateString();

      return this.monthlyVehicleService.getMonthlyVehicleMovements(input).pipe(
        map(response => {
          vehicle.vehicleParkingLogs = response;
        }))
    });

    forkJoin(requests).subscribe({
      next: (responses: any) => {
        this._isLoadingMovements = false;
      },
      error: (error) => {
        this._isLoadingMovements = false;
      }
    });
  }

  getMonthlyClientBills(): void {
    this.billService.getMonthlyClientBills(this.monthlyClientId).subscribe(
      (bills : Bill[]) => {
        this._monthlyClientBills = bills;
        //this._isLoading = false;

    }, (err) => {
      //this.showAlert(err.error);
      this._isLoading = false;
    });
  }

  mapModalVehicleCreate(newMonthlyVehicle: MonthlyVehicle){
    this.vehicleSuccessMessage = "";
    var monthlyVehicle = new MonthlyVehicle();

    monthlyVehicle.brand = newMonthlyVehicle.brand;
    monthlyVehicle.model = newMonthlyVehicle.model;
    monthlyVehicle.licenseplate = newMonthlyVehicle.licenseplate;
    monthlyVehicle.color = newMonthlyVehicle.color;
    monthlyVehicle.price = newMonthlyVehicle.price;

    let monthlyVehicleGenerator = new MonthlyVehicleGenerator();
    monthlyVehicleGenerator.monthlyClient = this._monthlyClient;
    monthlyVehicleGenerator.monthlyVehicles = [];
    monthlyVehicleGenerator.monthlyVehicles.push(monthlyVehicle);

    this.monthlyVehicleService.generateMonthlyVehicle(monthlyVehicleGenerator).subscribe(
      (response: MonthlyVehicleGenerator) => {
        this.getMonthlyClientInformation();
        this.vehicleSuccessMessage = "Vehiculo agregado";
      }, (errVehicle) => {
        this._isLoading = false;
        this.triggerErrorUpdate(errVehicle.error);
      });
  }

  mapModalVehicleEdit(monthlyVehicleToEdit: MonthlyVehicle,){
    this.vehicleSuccessMessage = "";
    this.monthlyVehicleService.updateMonthlyVehicle(monthlyVehicleToEdit).subscribe(
      (response: MonthlyVehicle) => {
        this.vehicleSuccessMessage = "Vehiculo actualizado";
        var monthlyVehicle = this._monthlyClient.vehicles.find(v => v.id == monthlyVehicleToEdit.id);

        if(monthlyVehicle != null){
          monthlyVehicle.brand = response.brand;
          monthlyVehicle.model = response.model;
          monthlyVehicle.licenseplate = response.licenseplate;
          monthlyVehicle.color = response.color;
          monthlyVehicle.price = response.price;
        }
      }, (errVehicle) => {
        this._isLoading = false;
        this.triggerErrorUpdate(errVehicle.error);
      });
  }


  handleEditMonthlyClient(mcToEdit: MonthlyClient) {
    if (mcToEdit) {
      this.monthlyClientService.updateMonthlyClient(mcToEdit).subscribe(
        (response: MonthlyClient) => {
          //this.hideAlert();
          //this.showConfirmation('Se ha actualizado con exito');
          this._isLoading = true;
          this.ngOnInit();
      }, (err) => {
        this._isLoading = false;
        //this.showAlert(err.error);
      });
    }
  }

  handleManualBillCreate(manualBill: Bill) {
    if (manualBill) {
      manualBill.monthlyClient = this._monthlyClient;
      manualBill.monthlyClientId = this._monthlyClient.id;
      this.billService.generateManualMonthlyClientBill(manualBill).subscribe(
        (response: Bill) => {
          //this.hideAlert();
          //this.showConfirmation('Se ha actualizado con exito');
          //this._isLoading = true;
          this.billSuccessMessage = "Factura generada";
          this.getMonthlyClientBills();
      }, (err) => {
        //this._isLoading = false;
        //this.showAlert(err.error);
        this.triggerErrorBill(err.error);
      });
    }
  }

  handlePayBillEvent(billToPay: Bill) {
    if(billToPay) {
      this.billService.payBill(billToPay).subscribe(
        (response: Bill) => {
          this.billSuccessMessage = "Factura pagada";
          this.getMonthlyClientBills();
        }, (err) => {
          this.triggerErrorBill(err.error);
        }
      );
    }
  }

  handleMonthlyVehicleDeleteEvent(monthlyVehicle: MonthlyVehicle) {
    if(monthlyVehicle) {
      this.monthlyVehicleService.deleteMonthlyVehicle(monthlyVehicle).subscribe(
        (response: MonthlyVehicle) => {
          this.vehicleSuccessMessage = "Vehiculo Eliminado";
          this.getMonthlyClientInformation();
        }, (errVehicle) => {
          this._isLoading = false;
          this.triggerErrorUpdate(errVehicle.error);
        }
      );
    }
  }

  triggerErrorUpdate(message: string): void {
    this.errorUpdate.next(message);
  }

  triggerErrorBill(message: string): void {
    this.errorBillCreate.next(message);
  }

  handleMonthlyVehicleViewMovementsEvent(monthlyVehicle: MonthlyVehicle) {

    this.router.navigate( [`administration/monthlyClients/file/${this.monthlyClientId}/vehicleMovements`], { state: monthlyVehicle });

  }

}
