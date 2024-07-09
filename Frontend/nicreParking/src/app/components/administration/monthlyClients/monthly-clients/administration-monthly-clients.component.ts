import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { BillService } from '../../../../services/bills/bill.service';
import { MonthlyClientService } from '../../../../services/monthlyClients/monthlyClient.service';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';
import { MonthlyClientsCreateComponent } from '../month-clients-create/monthly-clients-create.component';
import { MonthlyClientsGridComponent } from '../monthly-clients-grid/monthly-clients-grid.component';
import { MonthlyClientsModalComponent } from '../monthly-clients-modal/monthly-clients-modal.component';

@Component({
  selector: 'app-administration-monthly-clients',
  standalone: true,
  imports: [MonthlyClientsModalComponent, CommonModule, MonthlyClientsCreateComponent, MonthlyClientsGridComponent, PageTitleComponent, SpinnerComponent],
  templateUrl: './administration-monthly-clients.component.html',
  styleUrl: './administration-monthly-clients.component.css'
})
export class AdmininstrationMonthlyClientsComponent implements OnInit {

  _newMonthlyClient: MonthlyClient = new MonthlyClient();
  _monthlyClientList: MonthlyClient[] = [];

  showingGenerateBillsAlert = false;
  showingGenerateBillsPanel = false;
  messageError = '';

  _isLoading: Boolean = true;

  _pageTitle: string = "Administracion Mensualidades";

  monthlyClientSuccessMessage: string = "";
  errorMonthlyClientDelete: Subject<string> = new Subject<string>();

  //Generate monthlyBills
  _showGenerateMonthlyBillButton: boolean = false;
  _isGeneratinMonthlyBill: boolean = false;

  constructor(
    private monthlyClientService: MonthlyClientService,
    private billService: BillService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this._isLoading = true;
    this.getMonthlyClients();
  }

  getMonthlyClients() {
    this.monthlyClientService.getActiveMonthlyClients().subscribe(
      (monthlyClients : MonthlyClient[]) => {
        this._monthlyClientList = monthlyClients;
        this._isLoading = false;
    }, (err) => {
      //this.showAlert(err.error);
      this._isLoading = false;
    });
  }

  handleDeleteMonthlyClient(mClientToDelete: MonthlyClient) {
    this.hideConfirmation();

    if (mClientToDelete) {
      this.monthlyClientService.deleteMonthlyClient(mClientToDelete).subscribe(
        (response: any) => {
          this.monthlyClientSuccessMessage = "Cliente Eliminado";
          this._isLoading = true;
          this.getMonthlyClients();
      }, (err) => {
        this.triggerErrorMonthlyClient(err.error);
      });
    }
  }

  //

  showGenerateMonthlyBills(){
    this._showGenerateMonthlyBillButton = true;
  }

  generateMonthlyBills() {
    this.hideAlert();
    this.hideConfirmation();
    this._isGeneratinMonthlyBill = true;

    this.billService.generateMonthlyBills().subscribe(
      (response: number) => {
          this._isGeneratinMonthlyBill = false;
          this.showConfirmation("Facturas generadas correctamente. Facturas generadas: " + response);
          setTimeout( () => { this.hideConfirmation(); }, 5000);
      }, (error) => {
        this._isGeneratinMonthlyBill = false;
        this.showAlert("Error al generar las facturas " + error.error);
      }
    );
  }

  showAlert( message: string ) {
    this.messageError = message;
    this.showingGenerateBillsAlert = true;
  }

  showConfirmation( message: string ) {
    this.messageError = message;
    this.showingGenerateBillsPanel = true;
  }

  hideAlert(){
    this.showingGenerateBillsAlert = false;
  }

  hideConfirmation(){
    this.showingGenerateBillsPanel = false;
  }

  triggerErrorMonthlyClient(message: string): void {
    this.errorMonthlyClientDelete.next(message);
  }

  // navigateToMonthlyClientGenerator(){
  //   this.router.navigate( ['administration/monthlyClients/new']);
  // }

  handleViewMonthlyClientFile(monthlyClient: MonthlyClient) {
    this.router.navigate( [`administration/monthlyClients/file/${monthlyClient.id}`]);
  }
}
