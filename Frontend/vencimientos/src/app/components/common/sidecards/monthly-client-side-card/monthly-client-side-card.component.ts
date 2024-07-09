import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { MonthlyClientsModalComponent } from '../../../administration/monthlyClients/monthly-clients-modal/monthly-clients-modal.component';

@Component({
  selector: 'app-monthly-client-side-card',
  standalone: true,
  imports: [MonthlyClientsModalComponent],
  templateUrl: './monthly-client-side-card.component.html',
  styleUrl: './monthly-client-side-card.component.css'
})
export class MonthlyClientSideCardComponent implements OnInit{

  @Input() monthlyClient!: MonthlyClient;

  @Output() monthlyClientEditEvent = new EventEmitter<MonthlyClient>();
  @ViewChild('monthlyClientEditModal') monthlyCLientModal!: MonthlyClientsModalComponent;

  _monthlyClientToEdit!: MonthlyClient;

  constructor(){

  }

  ngOnInit(): void {

  }


  editMonthlyClient() {
    this._monthlyClientToEdit = this.monthlyClient;
    this.monthlyCLientModal.openModal();
  }

  handleEditMonthlyClient(editedMonthlyClient: MonthlyClient) {

    if (editedMonthlyClient) {
      editedMonthlyClient.id = this._monthlyClientToEdit.id;
      //this,this.monthlyCLientModal.closeModal();
      this.monthlyClientEditEvent.emit(editedMonthlyClient);
    }
  }

}
