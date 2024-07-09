import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { ConfigurationItem } from '../../../../models/settings/configurationItem';
import { MonthlyVehicle } from '../../../../models/vehicles/monthlyVehicle';
import { MonthlyVehicleGenerator } from '../../../../models/vehicles/monthlyVehicleGenerator';
import { MonthlyClientService } from '../../../../services/monthlyClients/monthlyClient.service';
import { MonthlyVehicleService } from '../../../../services/monthlyVehicles/monthlyVehicle.service';
import { SettingsService } from '../../../../services/settings/settings.service';
import { GenericModalComponent } from '../../../common/modals/generic-modal/generic-modal.component';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';
import { MonthlyVehicleCreateComponent } from '../../monthlyVehicles/monthly-vehicle-create/monthly-vehicle-create.component';
import { MonthlyVehiclesModalComponent } from '../../monthlyVehicles/monthly-vehicles-modal/monthly-vehicles-modal.component';
import { MonthlyClientsCreateComponent } from '../month-clients-create/monthly-clients-create.component';
import { MonthlyClientsModalComponent } from '../monthly-clients-modal/monthly-clients-modal.component';

@Component({
  selector: 'app-monthly-clients-generator',
  standalone: true,
  imports: [MonthlyClientsCreateComponent, MonthlyClientsModalComponent, CommonModule, MonthlyVehiclesModalComponent,
     MonthlyVehicleCreateComponent, GenericModalComponent, SpinnerComponent, PageTitleComponent],
  templateUrl: './monthly-clients-generator.component.html',
  styleUrl: './monthly-clients-generator.component.css'
})
export class MonthlyClientsGeneratorComponent implements OnInit{

  _pageTitle: string = "Generacion de cliente mensual";

  showingCreateMonthlyClientAlert = false;
  showingCreateMonthlyClientConfirmationPanel = false;
  messageError = '';

  showingCreateMonthlyVehicleAlert = false;
  showingCreateMonthlyVehicleConfirmationPanel = false;

  showingCreateMonthlyAlert = false;
  showingCreateMonthlyConfirmationPanel = false;

  _isLoading: Boolean = false;
  _showClientModal: boolean = true;
  _stepOne: boolean = true;
  _stepTwo: boolean = false;
  _stepThree: boolean = false;
  _disableAllButtons: boolean = false;

  @ViewChild('monthlyClientsModal') monthlyClientsModal!: MonthlyClientsModalComponent;
  @ViewChild('monthlyClientsEditModal') monthlyClientsEditModal!: MonthlyClientsModalComponent;

  _clientLoaded: boolean = false;
  _newMonthlyClient: MonthlyClient = new MonthlyClient();
  _monthlyClientToEdit: MonthlyClient = new MonthlyClient();
  _isEditing: boolean = false;


  @ViewChild('monthlyVehiclesModal') monthlyVehiclesModal!: MonthlyVehiclesModalComponent;
  @ViewChild('monthlyVehiclesEditModal') monthlyVehiclesEditModal!: MonthlyVehiclesModalComponent;

  _monthlyVehicleToEdit: MonthlyVehicle = new MonthlyVehicle();
  _newMonthlyVehicles: MonthlyVehicle[] = [];

  _vehicleLoaded: boolean = false;
  _isEditingVehicle: boolean = false;
  _indexVehicleEdit: number = -1;

  @ViewChild('submitModal') submitModal!: GenericModalComponent;

  _submitModalTitle: string = "Creacion de cliente";
  _submitedModalIsCreating: boolean = true;

  _monthlyVehiclePriceItem: number = -1;

  constructor(
    private monthlyClientService: MonthlyClientService,
    private monthlyVehicleService: MonthlyVehicleService,
    private router: Router,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit(): void {
    this.getMonthlyVehiclePrice();
  }

  getMonthlyVehiclePrice(){
    this.settingsService.getConfigurationItems().subscribe(
      (configItems : ConfigurationItem[]) => {
        let configItem = configItems.find(i => i.name == 'Precio Por Mes');
        if(configItem != null) {
          this._monthlyVehiclePriceItem = Number(configItem.value);
        }
    }, (err) => {

    });
  }

  openMonthlyClientsModal() {
    this.monthlyClientsModal.openModal();
  }

  handleCreateMonthlyClient(newMonthlyClient: MonthlyClient) {
    this.handleModalEvent(newMonthlyClient, false);
  }

  editMonthlyClient() {
    this._isEditing = true;
    this._monthlyClientToEdit = this.mapModalClientToEdit();
    this.monthlyClientsEditModal.openModal();
  }

  mapModalClientToEdit() : MonthlyClient{
    var monthlyCientToEdit = new MonthlyClient();

    monthlyCientToEdit.name = this._newMonthlyClient.name;
    monthlyCientToEdit.lastname = this._newMonthlyClient.lastname;
    monthlyCientToEdit.document = this._newMonthlyClient.document;
    monthlyCientToEdit.phoneNumber = this._newMonthlyClient.phoneNumber;
    monthlyCientToEdit.secondaryPhoneNumber = this._newMonthlyClient.secondaryPhoneNumber;
    monthlyCientToEdit.address = this._newMonthlyClient.address;

    return monthlyCientToEdit;
  }

  handleEditMonthlyClient(editedMonthlyClient: MonthlyClient) {
    this.handleModalEvent(editedMonthlyClient, true);
  }

  handleModalEvent(monthlyClient: MonthlyClient, isEdit: boolean){
    this.hideConfirmation(true);

    if (monthlyClient) {
      this._isLoading = true;
      this.mapModalClient(monthlyClient);

      this._clientLoaded = true;
      this._stepTwo = true;
      this._showClientModal = false;
      this.hideAlert(true);
      this.hideAlertsCreated();

      if(isEdit){
        this.monthlyClientsEditModal.closeModal();
        this._isLoading = false;
        this.showConfirmation('Se ha modificado con exito', true);
      } else{
        this.monthlyClientsModal.closeModal();
        this._isLoading = false;
        //this.showConfirmation('Se ha ingresado con exito', true);
      }

      setTimeout( () => { this.hideConfirmation(true); }, 5000);
    }
  }

  mapModalClient(newMonthlyClient: MonthlyClient){
    this._newMonthlyClient.name = newMonthlyClient.name;
    this._newMonthlyClient.lastname = newMonthlyClient.lastname;
    this._newMonthlyClient.document = newMonthlyClient.document;
    this._newMonthlyClient.phoneNumber = newMonthlyClient.phoneNumber;
    this._newMonthlyClient.secondaryPhoneNumber = newMonthlyClient.secondaryPhoneNumber;
    this._newMonthlyClient.address = newMonthlyClient.address;
  }

  openMonthlyVehiclesModal() {
    this.monthlyVehiclesModal.openModal();
  }

  handleCreateMonthlyVehicle(newMonthlyVehicle: MonthlyVehicle) {
    this.handleModalVehicleEvent(newMonthlyVehicle, false);
  }

  editMonthlyVehicle(index: number) {
    this._isEditingVehicle = true;
    this._monthlyVehicleToEdit = this.mapModalVehicleToEdit(index);
    this.monthlyVehiclesEditModal.openModal();
  }

  mapModalVehicleToEdit(index: number) : MonthlyVehicle{
    var selected = this._newMonthlyVehicles[index];
    var monthlyVehicleToEdit = new MonthlyVehicle();

    monthlyVehicleToEdit.brand = selected.brand;
    monthlyVehicleToEdit.model = selected.model;
    monthlyVehicleToEdit.licenseplate = selected.licenseplate;
    monthlyVehicleToEdit.color = selected.color;
    monthlyVehicleToEdit.price = selected.price;

    this._indexVehicleEdit = index;

    return monthlyVehicleToEdit;
  }

  removeMonthlyVehicle(index: number) {
    this._isEditingVehicle = true;
    this._isLoading = true;

    this._newMonthlyVehicles.splice(index, 1);

    if(this._newMonthlyVehicles.length == 0){
      this._vehicleLoaded = false;
    }

    this._isLoading = false;
    this._isEditing = false;
  }

  handleEditMonthlyVehicle(editedMonthlyVehicle: MonthlyVehicle) {
    this.handleModalVehicleEvent(editedMonthlyVehicle, true);
  }

  handleModalVehicleEvent(monthlyVehicle: MonthlyVehicle, isEdit: boolean){
    this.hideConfirmation(false);
    this.hideAlert(false);
    this.hideAlertsCreated();

    if (monthlyVehicle) {
      this._isLoading = true;
      this._vehicleLoaded = true;
      this._stepThree = true;
      var exists = this.validateVehicleEntry(monthlyVehicle, isEdit);

      if(isEdit){
        if(!exists){
          this.mapModalVehicleEdit(monthlyVehicle);
          //this.showConfirmation('Se ha modificado con exito', false);
        }
        this.monthlyVehiclesEditModal.closeModal();
      } else{
        if(!exists){
          this.mapModalVehicleCreate(monthlyVehicle);
          //this.showConfirmation('Se ha ingresado con exito', false);
        }

        this.monthlyVehiclesModal.closeModal();
      }

      this._isLoading = false;
      setTimeout( () => { this.hideConfirmation(false); }, 5000);

      if(!exists){

      }
    }
  }

  validateVehicleEntry(monthlyVehicle: MonthlyVehicle, isEdit: boolean): boolean {
    let exists: boolean = false;

    if(this._newMonthlyVehicles.length == 0){
      return exists;
    }

    if(isEdit){
      var vehicles = this._newMonthlyVehicles;
      let index = 0;

      vehicles.forEach(v => {
        if (exists) return;
        exists = v.licenseplate.replace(/\s/g, "") == monthlyVehicle.licenseplate.replace(/\s/g, "") && index != this._indexVehicleEdit;
        index++;
      })
    }

    if(!isEdit){
      var vehicles = this._newMonthlyVehicles;
      exists = vehicles.find(vehicle => vehicle.licenseplate.replace(/\s/g, "") == monthlyVehicle.licenseplate.replace(/\s/g, "")) != null;
    }

    if(exists){
      this.showAlert('Matricula existente', false)
    }

    return exists;
  }

  mapModalVehicleCreate(newMonthlyVehicle: MonthlyVehicle){
    var monthlyVehicle = new MonthlyVehicle();

    monthlyVehicle.brand = newMonthlyVehicle.brand;
    monthlyVehicle.model = newMonthlyVehicle.model;
    monthlyVehicle.licenseplate = newMonthlyVehicle.licenseplate;
    monthlyVehicle.color = newMonthlyVehicle.color;
    monthlyVehicle.price = newMonthlyVehicle.price;

    this._newMonthlyVehicles.push(monthlyVehicle);
  }

  mapModalVehicleEdit(newMonthlyVehicle: MonthlyVehicle,){
    var monthlyVehicle = this._newMonthlyVehicles[this._indexVehicleEdit];

    monthlyVehicle.brand = newMonthlyVehicle.brand;
    monthlyVehicle.model = newMonthlyVehicle.model;
    monthlyVehicle.licenseplate = newMonthlyVehicle.licenseplate;
    monthlyVehicle.color = newMonthlyVehicle.color;
    monthlyVehicle.price = newMonthlyVehicle.price;
  }


  openSubmitModal() {
    this.submitModal.openModal();
  }

  handleSubmitModalEvent(event: boolean){

    if(event == false){
      this.submitModal.closeModal();
    } else{
      this.hideAlertsCreated();
      this.submitModal.closeModal();
      this._isLoading = true;

      this.createFullMonthlyClient();
    }
  }

  createFullMonthlyClient() {
    if (this._newMonthlyClient) {
      this.monthlyClientService.createMonthlyClient(this._newMonthlyClient).subscribe(
        (response: MonthlyClient) => {

          if(this._newMonthlyVehicles && this._newMonthlyVehicles.length > 0) {

            let monthlyVehicleGenerator = new MonthlyVehicleGenerator();
            monthlyVehicleGenerator.monthlyClient = response;
            monthlyVehicleGenerator.monthlyVehicles = this._newMonthlyVehicles;

            this.monthlyVehicleService.generateMonthlyVehicles(monthlyVehicleGenerator).subscribe(
              (response: MonthlyVehicleGenerator) => {
                this._isLoading = false;
                this._disableAllButtons = true;
                this.showConfirmationCreated("Cliente generado exitosamente. Sera redirigido a la seccion anterior.");
                this.goToMonthlyClientsMainPage();
              }, (errVehicle) => {
                this._isLoading = false;
                this.showAlertCreated(errVehicle.error);
              });
          }
      }, (err) => {
        this.showAlertCreated(err.error);
        this._isLoading = false;
      });
    }
  }

  goToMonthlyClientsMainPage(){
    setTimeout( () => { this.router.navigate( ['administration/monthlyClients']);}, 3000);
  }

  showConfirmationCreated(message: string){
    this.messageError = message;
    this.showingCreateMonthlyConfirmationPanel = true;
  }

  showAlertCreated(message: string){
    this.messageError = message;
    this.showingCreateMonthlyAlert = true;
  }

  hideAlertsCreated(){
    this.showingCreateMonthlyConfirmationPanel = false;
    this.showingCreateMonthlyAlert = false;
  }


  showAlert(message: string, isClient: boolean) {
    this.messageError = message;

    if(isClient) {
      this.showingCreateMonthlyClientAlert = true;
    }
    else{
      this.showingCreateMonthlyVehicleAlert = true;
    }
  }

  showConfirmation(message: string, isClient: boolean) {
    this.messageError = message;
    if(isClient) {
      this.showingCreateMonthlyClientConfirmationPanel = true;
    }
    else{
      this.showingCreateMonthlyVehicleConfirmationPanel = true;
    }
  }

  hideAlert(isClient: boolean){
    if(isClient) {
      this.showingCreateMonthlyClientAlert = false;
    }
    else{
      this.showingCreateMonthlyVehicleAlert = false;
    }
  }

  hideConfirmation(isClient: boolean){
    if(isClient) {
      this.showingCreateMonthlyClientConfirmationPanel = false;
    }
    else{
      this.showingCreateMonthlyVehicleConfirmationPanel = false;
    }
  }

}

