import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../models/products/product';
import { CommonModule } from '@angular/common';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';

@Component({
  selector: 'app-products-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products-create.component.html',
  styleUrl: './products-create.component.css'
})
export class ProductsCreateComponent implements OnInit{

  product: Product = new Product();
  myForm: FormGroup;

  @Output() productCreated = new EventEmitter<Product>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      barCode: ['', [Validators.required]],
      description: ['', [Validators.required]],
      amountDaysPreviousNotification: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  createProduct(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.product.name = this.myForm.value.name;
      this.product.barCode = this.myForm.value.barCode;
      this.product.description = this.myForm.value.description;
      this.product.amountDaysPreviousNotification = this.myForm.value.amountDaysPreviousNotification;
      this.product.supplier = new ProductSupplier();

      this.productCreated.emit(this.product);
    }
  }

  clearFormFields(){
    this.myForm.reset();
    this.product.name = '';
    this.product.barCode = '';
    this.product.description = '';
    this.product.amountDaysPreviousNotification = 0;
  }
}

