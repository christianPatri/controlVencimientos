import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import { Subject } from 'rxjs';
import { HourlyVehicle } from '../../../../models/clients/hourlyVehicle';

@Component({
  selector: 'app-nightly-vehicle-entry',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nightly-vehicle-entry.component.html',
  styleUrl: './nightly-vehicle-entry.component.css'
})
export class NightlyVehicleEntryComponent {

  @Output() entryCompleted = new EventEmitter<HourlyVehicle>();
  @Input() returnStatus: HourlyVehicle;

  myForm: FormGroup;
  entryVehicleSuccess: boolean = false;

  showBackButton: boolean = false;
  printingTicket: boolean = false;

  @Input() successMessage: string = "";
  @Input() errorPension: Subject<string> = new Subject<string>();

  messageError: string = "";
  showingAlert: boolean = false;
  showingPanel: boolean = false;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      model: ['', [Validators.required]],
      licenseplate: ['', [Validators.required]]
    });

    this.returnStatus = new HourlyVehicle();
  }

  ngOnInit(): void {
    this.errorPension.subscribe(message => {
      this.messageError = message;
      this.showAlert(message);
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  entryVehicle() {
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.entryCompleted.emit(this.myForm.value);
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
            setTimeout( () =>
              {
                this.hideConfirmation();
                this.successMessage = "";
              }, 5000);
          }

          this.entryVehicleSuccess = true;
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
      <p>Dia y Hora de ingreso: ${moment(this.returnStatus.startingDate).format('DD-MMM HH:mm')}</p>
      <p>Matricula: ${this.returnStatus.licenseplate}</p>
      <p>Ticket: ${this.returnStatus.ticket}</p>
      </br>
      </br>
      <p>Debe presentar este ticket para retira el vehiculo</p>
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
    this.entryVehicleSuccess = false;
    this.myForm.reset();
  }


}
