import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { Subject } from 'rxjs';
import { HourlyVehicle } from '../../../../models/clients/hourlyVehicle';


@Component({
  selector: 'app-hourly-vehicle-exit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './hourly-vehicle-exit.component.html',
  styleUrls: ['./hourly-vehicle-exit.component.css']
})
export class HourlyVehicleExitComponent implements OnInit {


  hourlyClient : HourlyVehicle = new HourlyVehicle();

  @Output() exitCompleted = new EventEmitter<HourlyVehicle>();
  @Input() returnStatusExit: HourlyVehicle;

  @Input() successMessage: string = "";
  @Input() errorExit: Subject<string> = new Subject<string>();

  messageError: string = "";
  showingAlert: boolean = false;
  showingPanel: boolean = false;

  myForm: FormGroup;
  exitVehicleSuccess: boolean = false;

  showBackButton: boolean = false;
  printingTicket: boolean = false;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.myForm = this.formBuilder.group({
      licenseplate: ['', [Validators.required]],
      ticket: ['', [Validators.required]]
    });

    this.returnStatusExit = new HourlyVehicle();
  }

  ngOnInit(): void {
    this.errorExit.subscribe(message => {
      this.messageError = message;
      this.showAlert(message);
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  exitVehicle( ) {
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.exitCompleted.emit(this.myForm.value);
    }
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

            this.exitVehicleSuccess = true;
        }else {
          //Error
        }
      }
    }
  }

  showAlert( message: string ) {
    this.messageError = message;
    this.showingAlert = true;
  }

  showConfirmation( message: string ) {
    this.messageError = message;
    this.showingPanel = true;
  }

  hideAlert(){
    this.showingAlert = false;
  }

  hideConfirmation(){
    this.showingPanel = false;
  }

    imprimirTicket(): void {
      this.printingTicket = true;

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
    `;

      // Contenido del ticket
      const ticketContent = `
      <div class="ticket-container">
        <div class="ticket-date-container">
          <p class="ticket-date">${moment().format('DD/MM/YYYY')}</p>
        </div>

        <h3>Estacion Ancap Nicre</h3>
        <p>-----------------------------------------------</p>
        <p>Matricula: ${this.returnStatusExit.licenseplate}</p>
        <p>Hora de ingreso: ${moment(this.returnStatusExit.startingDate).format('HH:mm:ss')}</p>
        <p>Hora de salida: ${moment(this.returnStatusExit.endingDate).format('HH:mm:ss')}</p>


        <p>Tiempo: ${this.returnStatusExit.totalTime}</p>
        <p>Precio por hora: ${this.returnStatusExit.price}</p>
        <p>Total: ${this.returnStatusExit.totalAmount}</p>

        <p>Ticket: ${this.returnStatusExit.ticket}</p>
        </br>
        </br>
      </div>
    `;

      // Abrir una nueva ventana y escribir el contenido del ticket
      const printWindow = window.open('', '_blank');

      if(printWindow != null) {
        printWindow.document.write(ticketStyles + ticketContent);
        printWindow.document.close();

        // Imprimir el contenido
        printWindow.print();
      } else {
        console.log("Error al abrir la ventana de impresion");
      }

      this.showBackButton = true;
      this.printingTicket = false;

    }

  goBack(){
    this.exitVehicleSuccess = false;
    this.myForm.reset();
  }
}
