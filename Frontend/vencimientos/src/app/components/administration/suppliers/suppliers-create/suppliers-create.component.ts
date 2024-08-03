import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';

@Component({
  selector: 'app-suppliers-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './suppliers-create.component.html',
  styleUrl: './suppliers-create.component.css'
})
export class SuppliersCreateComponent implements OnInit{

  supplier: ProductSupplier = new ProductSupplier();
  myForm: FormGroup;

  @Output() supplierCreated = new EventEmitter<ProductSupplier>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      rut: ['', [Validators.required]],
      description: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      secondaryPhoneNumber: [''],
      contactName: ['', [Validators.required]],
      seller: ['', [Validators.required]],
      interval: [0, [Validators.required]],
      visitDays: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  createSupplier(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.supplier.name = this.myForm.value.name;
      this.supplier.rut = this.myForm.value.rut;
      this.supplier.description = this.myForm.value.description;
      this.supplier.phoneNumber = this.myForm.value.phoneNumber;
      this.supplier.secondaryPhoneNumber = this.myForm.value.secondaryPhoneNumber;
      this.supplier.contactName = this.myForm.value.contactName;
      this.supplier.seller = this.myForm.value.seller;
      this.supplier.interval = this.myForm.value.interval;
      let visitDays: number[] = [];
      (this.myForm.value.visitDays as string).split(',').forEach(v => visitDays.push(parseInt(v)));
      this.supplier.visitDays = visitDays;


      this.supplierCreated.emit(this.supplier);
    }
  }

  clearFormFields(){
    this.myForm.reset();
    this.supplier.name = '';
    this.supplier.rut = '';
    this.supplier.description = '';
    this.supplier.phoneNumber = '';
    this.supplier.secondaryPhoneNumber = '';
    this.supplier.contactName = '';
    this.supplier.seller = '';
    this.supplier.interval = 0;
    this.supplier.visitDays = [];
  }
}
