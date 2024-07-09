import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, input, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { ConfigurationItem } from '../../../../models/settings/configurationItem';
import { MonthlyVehicle } from '../../../../models/vehicles/monthlyVehicle';
import { SettingsService } from '../../../../services/settings/settings.service';
import { GenericModalComponent } from '../../../common/modals/generic-modal/generic-modal.component';
import { MonthlyVehiclesModalComponent } from '../monthly-vehicles-modal/monthly-vehicles-modal.component';

@Component({
  selector: 'app-monthly-vehicles-grid',
  standalone: true,
  imports: [MonthlyVehiclesModalComponent, CommonModule, GenericModalComponent],
  templateUrl: './monthly-vehicles-grid.component.html',
  styleUrl: './monthly-vehicles-grid.component.css'
})
export class MonthlyVehiclesGridComponent implements OnInit{

  @Input() monthlyClient!: MonthlyClient;
  @Input() successMessage: string = "";
  @Input() errorUpdate: Subject<string> = new Subject<string>();
  @Output() monthlyVehicleCreateEvent = new EventEmitter<MonthlyVehicle>();
  @Output() monthlyVehicleEditEvent = new EventEmitter<MonthlyVehicle>();
  @Output() monthlyVehicleDeleteEvent = new EventEmitter<MonthlyVehicle>();
  @Output() monthlyVehicleViewMovementsEvent = new EventEmitter<MonthlyVehicle>();

  @ViewChild('monthlyVehiclesModal') monthlyVehiclesModal!: MonthlyVehiclesModalComponent;
  @ViewChild('monthlyVehiclesEditModal') monthlyVehiclesEditModal!: MonthlyVehiclesModalComponent;

  _monthlyVehicleToEdit: MonthlyVehicle = new MonthlyVehicle();
  _vehicleLoaded: boolean = false;
  _isEditingVehicle: boolean = false;
  _indexVehicleEdit: number = -1;

  _monthlyVehiclePriceItem: number = -1;

  showingMonthlyVehicleAlert = false;
  showingMonthlyVehicleConfirmationPanel = false;
  messageError = '';

  _loadingGrid: boolean = false;

  //Eliminar
  @ViewChild('submitModal') submitModal!: GenericModalComponent;

  _submitModalTitle: string = "Eliminar vehiculo";
  _submitedModalIsDeletingVehicle: boolean = true;
  _selectedVehicleToDelete!: MonthlyVehicle;
  //

  constructor(private cdr: ChangeDetectorRef, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this._loadingGrid = true;
    this.errorUpdate.subscribe(message => {
      this.messageError = message;
      this.showAlert(message);
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });

    this.getMonthlyVehiclePrice();
  }

  getMonthlyVehiclePrice(){
    this.settingsService.getConfigurationItems().subscribe(
      (configItems : ConfigurationItem[]) => {
        let configItem = configItems.find(i => i.name == 'Precio Por Mes');
        if(configItem != null) {
          this._monthlyVehiclePriceItem = Number(configItem.value);
        }
        this._loadingGrid = false;
    }, (err) => {
      this._loadingGrid = false;
    });
  }

  openMonthlyVehiclesModal() {
    this.monthlyVehiclesModal.openModal();
  }

  handleCreateMonthlyVehicle(newMonthlyVehicle: MonthlyVehicle) {
    this.handleModalVehicleEvent(newMonthlyVehicle, false);
  }

  handleEditMonthlyVehicle(editedMonthlyVehicle: MonthlyVehicle) {
    this.handleModalVehicleEvent(editedMonthlyVehicle, true);
  }

  handleModalVehicleEvent(monthlyVehicle: MonthlyVehicle, isEdit: boolean){
    this.hideConfirmation();
    this.hideAlert();

    if (monthlyVehicle) {
      var exists = this.validateVehicleEntry(monthlyVehicle, isEdit);

      if(isEdit){
        if(!exists){
          monthlyVehicle.id = this._monthlyVehicleToEdit.id;
          this.monthlyVehicleEditEvent.emit(monthlyVehicle);
        }
        this.monthlyVehiclesEditModal.closeModal();
      } else{
        if(!exists){
          this.monthlyVehicleCreateEvent.emit(monthlyVehicle);
        }
        this.monthlyVehiclesModal.closeModal();
      }
    }
  }

  validateVehicleEntry(monthlyVehicle: MonthlyVehicle, isEdit: boolean): boolean {
    let exists: boolean = false;
    let vehicles = this.monthlyClient.vehicles;

    if(vehicles.length == 0){
      return exists;
    }

    if(isEdit){
      let index = 0;
      vehicles.forEach(v => {
        if (exists) return;
        exists = v.licenseplate.replace(/\s/g, "") == monthlyVehicle.licenseplate.replace(/\s/g, "") && index != this._indexVehicleEdit;
        index++;
      })
    }

    if(!isEdit){
      exists = vehicles.find(vehicle => vehicle.licenseplate.replace(/\s/g, "") == monthlyVehicle.licenseplate.replace(/\s/g, "")) != null;
    }

    if(exists){
      this.showAlert('Matricula existente')
    }

    return exists;
  }

  editMonthlyVehicle(index: number) {
    this._isEditingVehicle = true;
    this._monthlyVehicleToEdit = this.mapModalVehicleToEdit(index);
    this.monthlyVehiclesEditModal.openModal();
  }

  mapModalVehicleToEdit(index: number) : MonthlyVehicle{
    var selected = this.monthlyClient.vehicles[index];
    var monthlyVehicleToEdit = new MonthlyVehicle();

    monthlyVehicleToEdit.brand = selected.brand;
    monthlyVehicleToEdit.model = selected.model;
    monthlyVehicleToEdit.licenseplate = selected.licenseplate;
    monthlyVehicleToEdit.color = selected.color;
    monthlyVehicleToEdit.price = selected.price;
    monthlyVehicleToEdit.id = selected.id;

    this._indexVehicleEdit = index;

    return monthlyVehicleToEdit;
  }

  showAlert(message: string) {
    this.messageError = message;
    this.showingMonthlyVehicleAlert = true;
  }

  showConfirmation(message: string) {
    this.messageError = message;
    this.showingMonthlyVehicleConfirmationPanel = true;
  }

  hideAlert(){
    this.showingMonthlyVehicleAlert = false;
  }

  hideConfirmation(){
    this.showingMonthlyVehicleConfirmationPanel = false;
  }


  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const changedProp = changes[propName];

      if (!changedProp.isFirstChange()) {
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

  openDeleteVehicleModal(index: number){
    //this._deleteVehicle = true;
    var selected = this.monthlyClient.vehicles[index];
    this._selectedVehicleToDelete = selected;
    this.submitModal.openModal();

  }

  handleDeleteVehicleModalEvent(event: boolean){
    if(event == false){
      //this._deleteVehicle = false;
      this.submitModal.closeModal();
    } else{
      this.hideConfirmation();
      this.hideAlert();
      this.monthlyVehicleDeleteEvent.emit(this._selectedVehicleToDelete);
      this.submitModal.closeModal();
    }
  }

  viewMonthlyVehicleMovements(vehicle: MonthlyVehicle) {
    this.monthlyVehicleViewMovementsEvent.emit(vehicle);
  }

}
