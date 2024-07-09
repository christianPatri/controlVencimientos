import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HourlyVehicle } from '../../../../models/clients/hourlyVehicle';
import { NightlyClientsService } from '../../../../services/nightlyClients/nightly-clients.service';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { NightlyVehicleEntryComponent } from '../nightly-vehicle-entry/nightly-vehicle-entry.component';
import { NightlyVehicleExitComponent } from '../nightly-vehicle-exit/nightly-vehicle-exit.component';

@Component({
  selector: 'app-nightly-clients',
  standalone: true,
  imports:[NightlyVehicleEntryComponent, CommonModule, NightlyVehicleExitComponent, PageTitleComponent],
  templateUrl: './nightly-clients.component.html',
  styleUrl: './nightly-clients.component.css'
})
export class NightlyClientsComponent implements OnInit{

  private _showEntry : boolean;
  private _showExit : boolean;

  private _showEntryPanel : boolean = false;
  private _showExitPanel : boolean = false;

  returnStatus : HourlyVehicle;
  returnStatusExit : HourlyVehicle;

  _pageTitle: string = "Pensiones Nocturnas"

  successMessage: string = "";
  errorPension: Subject<string> = new Subject<string>();


  @Output() vehicleEntryResponse: EventEmitter<any> = new EventEmitter();

  private _nightlyClientService: NightlyClientsService;


  constructor(private router: Router, private nightlyClientsService: NightlyClientsService) {
    this._showEntry = true;
    this._showExit = true;
    this._nightlyClientService = nightlyClientsService;

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
      this._nightlyClientService.entryNightlyVehicle(entryVehicle).subscribe(
        (response: HourlyVehicle) => {
          this.returnStatus = response;
          this.successMessage = "Pension ingresada correctamente.";
        }, (err) =>{
          this.triggerError(err.error);
        });
    }
  }

  handleExitCompleted(exitVehicle: HourlyVehicle) {
    this.successMessage = "";
    if (exitVehicle) {
      this._nightlyClientService.exitNightlyVehicle(exitVehicle).subscribe(
        (response: HourlyVehicle) => {
          this.returnStatusExit = response;
          this.successMessage = "Vehiculo entregado correctamente.";
        }, (err) =>{
          this.triggerError(err.error);
        });
    }
  }

  triggerError(message: string): void {
    this.errorPension.next(message);
  }

  goToMainMenu(){
    this.router.navigate( ['home']);
  }
}
