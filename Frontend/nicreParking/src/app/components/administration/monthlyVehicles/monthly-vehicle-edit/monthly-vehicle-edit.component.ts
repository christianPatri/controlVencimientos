import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MonthlyVehicle } from '../../../../models/vehicles/monthlyVehicle';

@Component({
  selector: 'app-monthly-vehicle-edit',
  standalone: true,
  imports: [[FormsModule, ReactiveFormsModule],],
  templateUrl: './monthly-vehicle-edit.component.html',
  styleUrl: './monthly-vehicle-edit.component.css'
})
export class MonthlyVehicleEditComponent implements OnInit{


  monthlyVehicle: MonthlyVehicle = new MonthlyVehicle();
  myForm: FormGroup;

  @Output() monthlyVehicleEdited = new EventEmitter<MonthlyVehicle>();
  @Input() monthlyVehicleToEdit!: MonthlyVehicle;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      licenseplate: ['', [Validators.required]],
      color: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  editMonthlyVehicle(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.monthlyVehicle.brand = this.myForm.value.brand;
      this.monthlyVehicle.model = this.myForm.value.model;
      this.monthlyVehicle.licenseplate = this.myForm.value.licenseplate;
      this.monthlyVehicle.color = this.myForm.value.color;
      this.monthlyVehicle.price = this.myForm.value.price;

      this.monthlyVehicleEdited.emit(this.monthlyVehicle);
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

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties

    if (changes['monthlyVehicleToEdit']) {
      let monthlyVehicle = changes['monthlyVehicleToEdit'].currentValue;
      this.monthlyVehicle.brand = monthlyVehicle.brand;
      this.monthlyVehicle.model = monthlyVehicle.model;
      this.monthlyVehicle.licenseplate = monthlyVehicle.licenseplate;
      this.monthlyVehicle.color = monthlyVehicle.color;
      this.monthlyVehicle.price = monthlyVehicle.price;
    }
  }
}
