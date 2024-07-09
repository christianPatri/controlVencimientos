import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import moment from 'moment';
import { Subject } from 'rxjs';
import { Bill } from '../../../../models/bills/bill';
import { GenericModalComponent } from '../../../common/modals/generic-modal/generic-modal.component';
import { BillsModalComponent } from '../bills-modal/bills-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-bills-grid',
  standalone: true,
  imports: [BillsModalComponent, CommonModule, GenericModalComponent, NgxPaginationModule],
  templateUrl: './bills-grid.component.html',
  styleUrl: './bills-grid.component.css'
})
export class BillsGridComponent implements OnInit{

  @Input() bills!: Bill[];
  @Input() successMessage: string = "";
  @Input() errorMessage: Subject<string> = new Subject<string>();
  @Input() canCreateManualBills: boolean = true;
  @Output() manualBillCreateEvent = new EventEmitter<Bill>();
  @Output() billPayEvent = new EventEmitter<Bill>();

  @ViewChild('billsModal') manualBillModal!: BillsModalComponent;

  //Pago Factura
  @ViewChild('submitModal') submitModal!: GenericModalComponent;

  _submitModalTitle: string = "Pago de Factura";
  _submitedModalIsPayingBill: boolean = true;
  _selectedBillToPay!: Bill;
  //

  showingCreateBillAlert = false;
  showingCreateBillConfirmationPanel = false;
  messageError = '';

  _page: number = 1;
  _itemsPerPage: number = 5;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.errorMessage.subscribe(message => {
      this.messageError = message;
      this.showAlert(message);
      this.cdr.detectChanges();
    });
  }

  openCreateBillModal() {
    this.manualBillModal.openModal();
  }

  handleCreateManualBill(newManualBill: Bill) {
    this.handleModaBillEvent(newManualBill);
  }

  handleModaBillEvent(manualBill: Bill){
    this.hideConfirmation();
    this.hideAlert();

    if (manualBill) {
      this.manualBillCreateEvent.emit(manualBill);
      this.manualBillModal.closeModal();
    }
  }

  showAlert(message: string) {
    this.messageError = message;
    this.showingCreateBillAlert = true;
  }

  showConfirmation(message: string) {
    this.messageError = message;
    this.showingCreateBillConfirmationPanel = true;
  }

  hideAlert(){
    this.showingCreateBillAlert = false;
  }

  hideConfirmation(){
    this.showingCreateBillConfirmationPanel = false;
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
        }
      }
    }
  }

  isPayedBill(paymentDate: Date){

    return paymentDate.toString() != '0001-01-01T00:00:00';
  }

  openPayBillModal(bill : Bill) {
    //this._payBill = true;
    this._selectedBillToPay = bill;
    this.submitModal.openModal();
  }

  handlePayBillModalEvent(event: boolean){
    if(event == false){
      //this._payBill = false;
      this.submitModal.closeModal();
    } else{
      this.hideConfirmation();
      this.hideAlert();
      this.billPayEvent.emit(this._selectedBillToPay);
      this.submitModal.closeModal();
    }
  }

  printBillTicket(bill: Bill){

    let styles = this.getTicketStyles();
    let content = this.getTicketContent(bill);

    // Abrir una nueva ventana y escribir el contenido del ticket
    const printWindow = window.open('', '_blank');

    if(printWindow != null) {
      printWindow.document.write(styles + content);
      printWindow.document.close();

      // Imprimir el contenido
      printWindow.print();
    } else {
      console.log("Error al abrir la ventana de impresion");
    }

  }

  getTicketStyles() {
    const ticketStyles = `
      <style>
        .ticket-container {
          width: 5cm;
          margin: 0 auto;
          padding-top: 2px;
          padding-bottom: 20px;
          padding-left: 20px;
          padding-right: 20px;
          border: 2px solid #000;
          background-color: #fff;
          font-family: Arial, sans-serif;
          font-size: 12px;
        }

        .ticket-date {
          text-align: right;
        }

        .ticket-container h3 {
          text-align: center;
          margin-top:2px;
        }

        .ticket-date-container {
          width: 5cm;
          margin: 0 auto;
          padding: 2px;
          background-color: #fff;
          font-family: Arial, sans-serif;
          font-size: 12px;
        }
      </style>
      `
   ;

    return ticketStyles;
  }

  getTicketContent(bill: Bill){
    // Contenido del ticket
    const ticketContent = `
      <div class="ticket-container">
        <div class="ticket-date-container">
          <p class="ticket-date">${moment().format('DD/MM/YYYY')}</p>
        </div>

        <h3>Estacion Ancap Nicre</h3>
        <p>-----------------------------------------------</p>
        <p>Factura: ${bill.billNumber}</p>
        <p>Fecha Emision: ${moment(bill.issueDate).format('DD/MM/YYYY')}</p>
        </br>
        <p>${bill.description}</p>
        </br>
        <p>Total pagado: ${bill.totalAmount}</p>
        </br>
        </br>
      </div>
      `
    ;

    return ticketContent;
  }
}
