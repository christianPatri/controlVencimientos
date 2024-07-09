import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, input, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { HourlyVehicle } from '../../../../models/clients/hourlyVehicle';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { MonthlyParkingLog } from '../../../../models/vehicles/monthlyParkingLog';
import { MonthlyVehicle } from '../../../../models/vehicles/monthlyVehicle';

@Component({
  selector: 'app-monthly-client-vehicle-exit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './monthly-client-vehicle-exit.component.html',
  styleUrl: './monthly-client-vehicle-exit.component.css'
})
export class MonthlyClientVehicleExitComponent implements OnInit, OnChanges{

  @Output() exitCompleted = new EventEmitter<MonthlyVehicle>();
  @Input() returnStatusExit: MonthlyParkingLog;
  @Input() returnErrorMessage: string;
  @Input() errorUpdate: Subject<string> = new Subject<string>();

  myForm: FormGroup;
  exitVehicleSuccess: boolean = false;
  exitVehicleError: boolean = false;
  showBackButton: boolean = false;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.myForm = this.formBuilder.group({
      licenseplate: ['', [Validators.required]]
    });

    this.returnStatusExit = new MonthlyParkingLog();
    this.returnErrorMessage = "";
  }

  ngOnInit(): void {
    this.errorUpdate.subscribe(message => {
      this.returnErrorMessage = message;
      this.exitVehicleSuccess = false;
      this.exitVehicleError = true;
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
        if(propName == "returnStatusExit"){
          this.exitVehicleError = false;
          this.exitVehicleSuccess = true;
          this.returnErrorMessage = "Se ha entregado el vehiculo correctamente."

          setTimeout(() => this.goBack(), 4000);
        }

        if(propName == "returnErrorMessage"){
          this.exitVehicleSuccess = false;
          this.exitVehicleError = true;

          setTimeout(() =>
            this.goBack(), 4000);
        }
      }
    }
  }

  goBack(){
    this.exitVehicleSuccess = false;
    this.exitVehicleError = false;
    this.myForm.reset();
    this.cdr.detectChanges();
  }
}
