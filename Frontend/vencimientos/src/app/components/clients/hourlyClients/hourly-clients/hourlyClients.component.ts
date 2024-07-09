import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HourlyVehicle } from '../../../../models/clients/hourlyVehicle';
import { HourlyClientsService } from '../../../../services/hourlyClients/hourly-clients.service';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { MonthlyClientsComponent } from '../../monthlyClients/monthly-clients/monthlyClients.component';
import { HourlyVehicleEntryComponent } from '../hourly-vehicle-entry/hourly-vehicle-entry.component';
import { HourlyVehicleExitComponent } from '../hourly-vehicle-exit/hourly-vehicle-exit.component';


@Component({
  selector: 'app-hourly-clients',
  standalone: true,
  imports:[HourlyVehicleEntryComponent, MonthlyClientsComponent, CommonModule, HourlyVehicleExitComponent, PageTitleComponent],
  templateUrl: './hourlyClients.component.html',
  styleUrls: ['./hourlyClients.component.css']
})
export class HourlyClientsComponent implements OnInit {

  private _showEntry : boolean;
  private _showExit : boolean;

  private _showEntryPanel : boolean = false;
  private _showExitPanel : boolean = false;

  returnStatus : HourlyVehicle;
  returnStatusExit : HourlyVehicle;

  successMessage: string = "";
  errorExit: Subject<string> = new Subject<string>();

  _pageTitle: string = "Pensiones por hora"

  @Output() vehicleEntryResponse: EventEmitter<any> = new EventEmitter();

  private _hourlyClientService: HourlyClientsService;

  constructor(private router: Router, private hourlyClientsService: HourlyClientsService,) {
    this._showEntry = true;
    this._showExit = true;
    this._hourlyClientService = hourlyClientsService;

    this.returnStatus = new HourlyVehicle();
    this.returnStatusExit = new HourlyVehicle();
   }

  ngOnInit(): void {

  }

  showEntry() : boolean{
    return this._showEntry;
  }

  showExit(){
    return this._showExit;
  }

  showEntryPanel(){
    return this._showEntryPanel;
  }

  showExitPanel(){
    return this._showExitPanel;
  }

  showVehicleEntryPanel(){
    this._showEntryPanel = true;
    this._showExitPanel = false;
  }

  showVehicleExitPanel(){
    this._showExitPanel = true;
    this._showEntryPanel = false;
  }

  handleEntryCompleted(entryVehicle: HourlyVehicle) {
    this.successMessage = "";
    if (entryVehicle) {
      this._hourlyClientService.entryHourlyVehicle(entryVehicle).subscribe(
        (response: HourlyVehicle) => {
          this.successMessage = "Pension ingresada correctamente.";
          this.returnStatus = response;
        }, (err) =>{
          this.triggerErrorExit(err.error);
        });
    }
  }

  handleExitCompleted(exitVehicle: HourlyVehicle) {
    this.successMessage = "";
    if (exitVehicle) {
      this._hourlyClientService.exitHourlyVehicle(exitVehicle).subscribe(
        (response: HourlyVehicle) => {
          this.successMessage = "Vehiculo entregado correctamente.";
          this.returnStatusExit = response;
        }, (err) =>{
          this.triggerErrorExit(err.error);
        });
    }
  }

  triggerErrorExit(message: string): void {
    this.errorExit.next(message);
  }

  goToMainMenu(){
    this.router.navigate( ['home']);
  }
}
