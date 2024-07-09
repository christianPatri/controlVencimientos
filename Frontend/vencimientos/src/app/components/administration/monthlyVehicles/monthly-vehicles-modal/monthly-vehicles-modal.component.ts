import { CommonModule } from '@angular/common';
import { Component, EventEmitter, INJECTOR, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ConfigurationItem } from '../../../../models/settings/configurationItem';
import { MonthlyVehicle } from '../../../../models/vehicles/monthlyVehicle';
import { SettingsService } from '../../../../services/settings/settings.service';
import { MonthlyVehicleCreateComponent } from '../monthly-vehicle-create/monthly-vehicle-create.component';
import { MonthlyVehicleEditComponent } from '../monthly-vehicle-edit/monthly-vehicle-edit.component';


@Component({
  selector: 'app-monthly-vehicles-modal',
  standalone: true,
  imports: [CommonModule, MonthlyVehicleCreateComponent, MonthlyVehicleEditComponent],
  templateUrl: './monthly-vehicles-modal.component.html',
  styleUrl: './monthly-vehicles-modal.component.css'
})
export class MonthlyVehiclesModalComponent implements OnInit{

  isOpen = false;
  monthlyVehicleData!: MonthlyVehicle;

  @ViewChild('monthlyVehicleCreate') monthlyVehicleCreateComponent!: MonthlyVehicleCreateComponent;
  @ViewChild('monthlyVehicleEdit') monthlyVehicleEditComponent!: MonthlyVehicleEditComponent;

  @Output() monthlyVehicleCreatedModal = new EventEmitter<MonthlyVehicle>();
  @Output() monthlyVehicleEditedModal = new EventEmitter<MonthlyVehicle>();

  @Input() isEditing!: boolean;
  @Input() monthlyVehicleToEdit!: MonthlyVehicle;
  @Input() monthlyVehicleConfigPrice!: number;

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.isOpen = true;
    if(this.monthlyVehicleCreateComponent) {
      this.monthlyVehicleCreateComponent.myForm.value.price = this.monthlyVehicleConfigPrice;
    }
  }

  closeModal() {
    this.isOpen = false;

    if(this.monthlyVehicleCreateComponent) this.monthlyVehicleCreateComponent.clearFormFields();
    if(this.monthlyVehicleEditComponent) this.monthlyVehicleEditComponent.clearFormFields();
  }

  handleMonthlyVehicleCreated(monthlyVehicleData: MonthlyVehicle) {
    this.monthlyVehicleData = monthlyVehicleData;
    this.monthlyVehicleCreatedModal.emit(this.monthlyVehicleData);
  }

  handleMonthlyVehicleEdited(monthlyVehicleData: MonthlyVehicle) {
    this.monthlyVehicleData = monthlyVehicleData;
    this.monthlyVehicleEditedModal.emit(this.monthlyVehicleData);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties
    if (changes['monthlyVehicleToEdit']) {
      let user = changes['monthlyVehicleToEdit'].currentValue;
    }

    // Perform any necessary updates based on the changes
  }
}
