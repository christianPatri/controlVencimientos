import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthlyVehicle } from '../../../../models/vehicles/monthlyVehicle';

@Component({
  selector: 'app-monthly-vehicle-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './monthly-vehicle-create.component.html',
  styleUrl: './monthly-vehicle-create.component.css'
})
export class MonthlyVehicleCreateComponent implements OnInit{

  monthlyVehicle: MonthlyVehicle = new MonthlyVehicle();
  myForm: FormGroup;

  @Output() monthlyVehicleCreated = new EventEmitter<MonthlyVehicle>();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      licenseplate: ['', [Validators.required]],
      color: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  createMonthlyVehicle(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.monthlyVehicle.brand = this.myForm.value.brand;
      this.monthlyVehicle.model = this.myForm.value.model;
      this.monthlyVehicle.licenseplate = this.myForm.value.licenseplate;
      this.monthlyVehicle.color = this.myForm.value.color;
      this.monthlyVehicle.price = this.myForm.value.price;

      this.monthlyVehicleCreated.emit(this.monthlyVehicle);
    }
  }

  clearFormFields(){
    this.myForm.reset();
    this.monthlyVehicle.brand =  "";
    this.monthlyVehicle.model = "";
    this.monthlyVehicle.licenseplate = "";
    this.monthlyVehicle.color = "";
    this.monthlyVehicle.price = 0;
  }
}
