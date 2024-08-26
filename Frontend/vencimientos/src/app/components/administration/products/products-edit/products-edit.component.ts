import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../../../models/products/product';

@Component({
  selector: 'app-products-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './products-edit.component.html',
  styleUrl: './products-edit.component.css'
})
export class ProductsEditComponent implements OnInit {

  product: Product = new Product();
  myForm: FormGroup;

  @Output() productEdited = new EventEmitter<Product>();
  @Input() productToEdit!: Product;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      barCode: ['', [Validators.required]],
      amountDaysPreviousNotification: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  editProduct(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.product.name = this.myForm.value.name;
      this.product.barCode = this.myForm.value.barCode;
      this.product.description = this.myForm.value.description;
      this.product.amountDaysPreviousNotification = this.myForm.value.amountDaysPreviousNotification;

      this.productEdited.emit(this.product);
    }
  }

  clearFormFields(){
    this.myForm.reset();
    this.product.name =  "";
    this.product.barCode = "";
    this.product.description = "";
    this.product.amountDaysPreviousNotification = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productToEdit']) {
      let product = changes['productToEdit'].currentValue;
      this.product.name = product.name;
      this.product.description = product.description;
      this.product.barCode = product.barCode;
      this.product.amountDaysPreviousNotification = product.amountDaysPreviousNotification;
    }
  }
}

