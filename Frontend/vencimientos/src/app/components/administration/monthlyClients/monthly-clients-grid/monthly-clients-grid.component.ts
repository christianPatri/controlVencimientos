import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { GenericModalComponent } from '../../../common/modals/generic-modal/generic-modal.component';
import { MonthlyClientsModalComponent } from '../monthly-clients-modal/monthly-clients-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monthly-clients-grid',
  standalone: true,
  imports:[CommonModule, FormsModule, ReactiveFormsModule, MonthlyClientsModalComponent, GenericModalComponent, NgxPaginationModule],
  templateUrl: './monthly-clients-grid.component.html',
  styleUrl: './monthly-clients-grid.component.css'
})
export class MonthlyClientsGridComponent implements OnInit{

  nombreFilter: string = '';
  apellidoFilter: string = '';
  documentFilter: string = '';
  filteredMonthlyClients: any[] = [];

  @Input() monthlyClients!: MonthlyClient[];
  @Input() successMessage: string = "";
  @Input() errorMessage: Subject<string> = new Subject<string>();
  @Output() monthlyClientDeleteEvent = new EventEmitter<MonthlyClient>();
  @Output() monthlyClientViewFileEvent = new EventEmitter<MonthlyClient>();

  //Eliminar
  @ViewChild('submitModal') submitModal!: GenericModalComponent;

  _submitModalTitle: string = "Eliminar Cliente";
  _submitedModalIsDeletingMonthlyClient: boolean = true;
  _selectedMonthlyClientToDelete!: MonthlyClient;
  //

  showingMonthlyClientAlert = false;
  showingMonthlyClientConfirmationPanel = false;
  messageError = '';

  _page: number = 1;
  _itemsPerPage: number = 5;

  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.filteredMonthlyClients = this.monthlyClients;
    this.errorMessage.subscribe(message => {
      this.messageError = message;
      this.showAlert(message);
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  filterMonthlyClients() {
    this.filteredMonthlyClients = this.monthlyClients.filter(user =>
      user.name.toLowerCase().includes(this.nombreFilter.toLowerCase()) &&
      user.lastname.toLowerCase().includes(this.apellidoFilter.toLowerCase()) &&
      user.document.includes(this.documentFilter)
    );
  }

  viewMonthlyClientFile(viewMonthlyClientFile: MonthlyClient) {
    if (viewMonthlyClientFile) {
      this.monthlyClientViewFileEvent.emit(viewMonthlyClientFile);
    }
  }

  openDeleteMonthlyClientModal(deleteMonthlyClient: MonthlyClient){
    var selected = deleteMonthlyClient;
    this._selectedMonthlyClientToDelete = selected;
    this.submitModal.openModal();

  }

  handleDeleteMonthlyClientModalEvent(event: boolean){
    if(event == false){
      this.submitModal.closeModal();
    } else{
      this.hideConfirmation();
      this.hideAlert();
      this.monthlyClientDeleteEvent.emit(this._selectedMonthlyClientToDelete);
      this.submitModal.closeModal();
    }
  }

  showAlert(message: string) {
    this.messageError = message;
    this.showingMonthlyClientAlert = true;
  }

  showConfirmation(message: string) {
    this.messageError = message;
    this.showingMonthlyClientConfirmationPanel = true;
  }

  hideAlert(){
    this.showingMonthlyClientAlert = false;
  }

  hideConfirmation(){
    this.showingMonthlyClientConfirmationPanel = false;
  }


  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const changedProp = changes[propName];

      if (changedProp.isFirstChange()) {
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

  navigateToMonthlyClientGenerator(){
    this.router.navigate( ['administration/monthlyClients/new']);
  }
}
