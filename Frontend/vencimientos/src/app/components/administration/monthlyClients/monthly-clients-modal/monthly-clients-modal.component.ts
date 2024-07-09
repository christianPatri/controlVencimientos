import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { MonthlyClientsCreateComponent } from '../month-clients-create/monthly-clients-create.component';
import { MonthlyClientsEditComponent } from '../monthly-clients-edit/monthly-clients-edit.component';

@Component({
  selector: 'app-monthly-clients-modal',
  standalone: true,
  imports: [CommonModule, MonthlyClientsCreateComponent, MonthlyClientsEditComponent],
  templateUrl: './monthly-clients-modal.component.html',
  styleUrl: './monthly-clients-modal.component.css'
})
export class MonthlyClientsModalComponent implements OnInit{

  isOpen = false;
  monthlyClientData!: MonthlyClient;

  @ViewChild('monthlyClientsCreate') monthlyClientCreateComponent!: MonthlyClientsCreateComponent;
  @ViewChild('monthlyClientsEdit') monthlyClientEditComponent!: MonthlyClientsEditComponent;

  @Output() monthlyClientCreatedModal = new EventEmitter<MonthlyClient>();
  @Output() monthlyClientEditedModal = new EventEmitter<MonthlyClient>();

  @Input() isEditing!: boolean;
  @Input() monthlyClientToEdit!: MonthlyClient;

  constructor() { }

  ngOnInit() { }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;

    if(this.monthlyClientCreateComponent) this.monthlyClientCreateComponent.clearFormFields();
    if(this.monthlyClientEditComponent) this.monthlyClientEditComponent.clearFormFields();

  }

  showRegisterUserMessage() {

  }

  handleMonthlyClientCreated(monthlyClientData: MonthlyClient) {
    this.monthlyClientData = monthlyClientData;
    this.monthlyClientCreatedModal.emit(this.monthlyClientData);
  }

  handleMonthlyClientEdited(monthlyClientData: MonthlyClient) {
    this.monthlyClientData = monthlyClientData;
    this.monthlyClientEditedModal.emit(this.monthlyClientData);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties
    if (changes['monthlyClientToEdit']) {
      let user = changes['monthlyClientToEdit'].currentValue;
    }

    // Perform any necessary updates based on the changes
  }
}
