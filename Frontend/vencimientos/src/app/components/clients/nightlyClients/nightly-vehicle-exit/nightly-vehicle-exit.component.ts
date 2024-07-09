import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import moment from 'moment';
import { Subject } from 'rxjs';
import { HourlyVehicle } from '../../../../models/clients/hourlyVehicle';

@Component({
  selector: 'app-nightly-vehicle-exit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nightly-vehicle-exit.component.html',
  styleUrl: './nightly-vehicle-exit.component.css'
})
export class NightlyVehicleExitComponent {

  hourlyClient : HourlyVehicle = new HourlyVehicle();

  @Output() exitCompleted = new EventEmitter<HourlyVehicle>();
  @Input() returnStatusExit: HourlyVehicle;

  myForm: FormGroup;
  exitVehicleSuccess: boolean = false;

  showBackButton: boolean = false;
  printingTicket: boolean = false;

  @Input() successMessage: string = "";
  @Input() errorPension: Subject<string> = new Subject<string>();

  messageError: string = "";
  showingAlert: boolean = false;
  showingPanel: boolean = false;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.myForm = this.formBuilder.group({
      licenseplate: ['', [Validators.required]],
      ticket: ['', [Validators.required]]
    });

    this.returnStatusExit = new HourlyVehicle();
  }

  ngOnInit(): void {
    this.errorPension.subscribe(message => {
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
      <p>Dia y Hora de ingreso: ${moment(this.returnStatusExit.startingDate).format('DD-MMM HH:mm')}</p>
      <p>Dia y Hora de salida: ${moment(this.returnStatusExit.endingDate).format('DD-MMM HH:mm')}</p>


      <p>Noches: ${this.returnStatusExit.totalTime}</p>
      <p>Precio por noche: ${this.returnStatusExit.price}</p>
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
