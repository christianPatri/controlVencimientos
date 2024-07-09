import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { MonthlyClientCheck } from '../../../../models/clients/monthlyClientCheck';
import { MonthlyParkingLog } from '../../../../models/vehicles/monthlyParkingLog';
import { MonthlyVehicle } from '../../../../models/vehicles/monthlyVehicle';
import { MonthlyClientService } from '../../../../services/monthlyClients/monthlyClient.service';
import { MonthlyVehicleService } from '../../../../services/monthlyVehicles/monthlyVehicle.service';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { MonthlyClientConsultationComponent } from '../monthly-client-consultation/monthly-client-consultation.component';
import { MonthlyClientPaymentComponent } from '../monthly-client-payment/monthly-client-payment.component';
import { MonthlyClientVehicleEntryComponent } from '../monthly-client-vehicle-entry/monthly-client-vehicle-entry.component';
import { MonthlyClientVehicleExitComponent } from '../monthly-client-vehicle-exit/monthly-client-vehicle-exit.component';

@Component({
  selector: 'app-monthly-clients',
  standalone: true,
  imports: [CommonModule, MonthlyClientConsultationComponent, MonthlyClientVehicleEntryComponent,
     MonthlyClientVehicleExitComponent, PageTitleComponent, MonthlyClientPaymentComponent],
  templateUrl: './monthlyClients.component.html',
  styleUrls: ['./monthlyClients.component.css']
})
export class MonthlyClientsComponent implements OnInit {

  private _showConsultationMonthlyClientPanel : boolean = false;
  private _showPayMonthlyClientPanel : boolean = false;
  private _showEntryPanel : boolean = false;
  private _showExitPanel : boolean = false;


  returnMonthlyClient : MonthlyClient;
  private _monthlyClientService: MonthlyClientService;
  private _monthlyVehicleService: MonthlyVehicleService;

  returnExitEntryVehicle: MonthlyParkingLog;
  returnError: string = "";

  errorUpdate: Subject<string> = new Subject<string>();

  _pageTitle: string = "Parking Mensual"


  constructor(private router: Router, private monthlyClientService: MonthlyClientService, private monthlyVehicleService: MonthlyVehicleService) {
    this.returnMonthlyClient = new MonthlyClient();
    this.returnExitEntryVehicle = new MonthlyParkingLog();
    this._monthlyClientService = monthlyClientService;
    this._monthlyVehicleService = monthlyVehicleService;
   }

  ngOnInit(): void {
  }

  getShowConsultationMonthlyClientPanel() : boolean{
    return this._showConsultationMonthlyClientPanel;
  }

  showConsultationMonthlyClientPanel(){
    this._showEntryPanel = false;
    this._showExitPanel = false;
    this._showPayMonthlyClientPanel = false;
    return this._showConsultationMonthlyClientPanel = true;
  }

  getShowEntryMonthlyVehiclePanel() : boolean{
    return this._showEntryPanel;
  }

  showEntryMonthlyVehiclePanel(){
    this._showExitPanel = false;
    this._showConsultationMonthlyClientPanel = false;
    this._showPayMonthlyClientPanel = false;
    return this._showEntryPanel = true;
  }

  getShowExitMonthlyVehiclePanel() : boolean{
    return this._showExitPanel;
  }

  showExitMonthlyVehiclePanel(){
    this._showConsultationMonthlyClientPanel = false;
    this._showEntryPanel = false;
    this._showPayMonthlyClientPanel = false;
    return this._showExitPanel = true;
  }

  getShowPayMonthlyClientPanel() {
    return this._showPayMonthlyClientPanel;
  }

  showPayMonthlyClientPanel() {
    this._showConsultationMonthlyClientPanel = false;
    this._showEntryPanel = false;
    this._showExitPanel = false;

    return this._showPayMonthlyClientPanel = true;
  }



  handleCheckDocumentCompleted(checkVehicle: MonthlyClientCheck) {
    if (checkVehicle) {
      checkVehicle.licenseplate="";
      this._monthlyClientService.checkMonthlyClient(checkVehicle).subscribe(
        (response: MonthlyClient) => {
          this.returnMonthlyClient = response;
        }, (err) =>{
          this.returnError = err.error;
          this.triggerErrorUpdate("Ocurrio un error al consultar el vehiculo: Cliente inexistente");
        });
    }
  }

  handleChecklicenseplateCompleted(checkVehicle: MonthlyClientCheck) {
    if (checkVehicle) {
      checkVehicle.document = "";
      this._monthlyClientService.checkMonthlyClient(checkVehicle).subscribe(
        (response: MonthlyClient) => {
          this.returnMonthlyClient = response;
        }, (err) =>{
          this.returnError = err.error;
          this.triggerErrorUpdate("Ocurrio un error al consultar el vehiculo: Cliente inexistente");
        });
    }
  }

  handleEntryVehicleCompleted(entryVehicle: MonthlyVehicle) {
    if(entryVehicle) {
      this._monthlyVehicleService.entryMonthlyVehicle(entryVehicle).subscribe(
        (response: MonthlyParkingLog) => {
          this.returnExitEntryVehicle = response;
        }, (err) =>{
          this.returnError = err.error;
          this.triggerErrorUpdate(err.error);
        });
    }
  }

  handleExitVehicleCompleted(exitVehicle: MonthlyVehicle) {
    if(exitVehicle) {
      this._monthlyVehicleService.exitMonthlyVehicle(exitVehicle).subscribe(
        (response: MonthlyParkingLog) => {
          this.returnExitEntryVehicle = response;
        }, (err) =>{
          this.returnError = err.error;
          this.triggerErrorUpdate(err.error);
        });
    }
  }

  triggerErrorUpdate(message: string): void {
    this.returnError = message;
    this.errorUpdate.next(message);
  }

  goToMainMenu(){
    this.router.navigate( ['home']);
  }

}
