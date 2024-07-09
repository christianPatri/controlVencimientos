import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { MonthlyParkingLog } from '../../../../models/vehicles/monthlyParkingLog';
import { MonthlyVehicle } from '../../../../models/vehicles/monthlyVehicle';

@Component({
  selector: 'app-monthly-client-vehicle-entry',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './monthly-client-vehicle-entry.component.html',
  styleUrl: './monthly-client-vehicle-entry.component.css'
})
export class MonthlyClientVehicleEntryComponent implements OnInit, OnChanges{

  @Output() entryCompleted = new EventEmitter<MonthlyVehicle>();
  @Input() returnStatusEntry: MonthlyParkingLog;
  @Input() returnErrorMessage: string;
  @Input() errorUpdate: Subject<string> = new Subject<string>();

  myForm: FormGroup;
  entryVehicleSuccess: boolean = false;
  entryVehicleError: boolean = false;
  showBackButton: boolean = false;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.myForm = this.formBuilder.group({
      licenseplate: ['', [Validators.required]]
    });

    this.returnStatusEntry = new MonthlyParkingLog();
    this.returnErrorMessage = "";
  }

  ngOnInit(): void {
    this.errorUpdate.subscribe(message => {
      this.returnErrorMessage = message;
      this.entryVehicleSuccess = false;
      this.entryVehicleError = true;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  entryVehicle() {
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.entryCompleted.emit(this.myForm.value);
    }
  }

   //Me va a generar un ingreso de vehiculo
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const changedProp = changes[propName];

      if (!changedProp.isFirstChange()) {
        if(propName == "returnStatusEntry"){
          this.entryVehicleError = false;
          this.entryVehicleSuccess = true;
          this.returnErrorMessage = "Se ha ingresado el vehiculo correctamente."

          setTimeout(() => this.goBack(), 4000);
        }

        if(propName == "returnErrorMessage"){
          this.entryVehicleSuccess = false;
          this.entryVehicleError = true;
          setTimeout(() =>
            this.goBack(), 4000);
        }
      }
    }
  }

  goBack(){
    this.entryVehicleSuccess = false;
    this.entryVehicleError = false;
    this.myForm.reset();
    this.cdr.detectChanges();
  }
}
