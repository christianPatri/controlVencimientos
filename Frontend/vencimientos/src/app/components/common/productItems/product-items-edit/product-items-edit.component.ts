import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductItem } from '../../../../models/productItems/productItem';
import moment from 'moment';
import { Product } from '../../../../models/products/product';

@Component({
  selector: 'app-product-items-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './product-items-edit.component.html',
  styleUrl: './product-items-edit.component.css'
})
export class ProductItemsEditComponent implements OnInit {

  productItem: ProductItem = new ProductItem();
  myForm: FormGroup;

  @Output() productItemEdited = new EventEmitter<ProductItem>();
  @Input() productItemToEdit!: ProductItem;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name:[''],
      amount: [0, [Validators.required]],
      expirationDate: ['', [Validators.required, this.dateValidator]]
    });
  }

  ngOnInit(): void {
  }

  dateValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    const isValidDate = !isNaN(Date.parse(value));
    return isValidDate ? null : { 'invalidDate': { value: value } };
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  clearFormFields(){
    this.myForm.reset();
    this.productItem.amount = 0;
    this.productItem.expirationDate = new Date();
    this.productItem.product = new Product();
  }

  editProductItem(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.productItem.amount = this.myForm.value.amount;
      const selectedDateMoment = moment(this.myForm.value.expirationDate, 'YYYY-MM-DD');
      this.productItem.expirationDate = selectedDateMoment.utc().toDate();

      this.productItemEdited.emit(this.productItem);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productItemToEdit']) {
      let product = changes['productItemToEdit'].currentValue;
      this.productItem.amount = product.amount;
      //this.productItem.expirationDate = product.expirationDate.

      const date = new Date(product.expirationDate);
        this.myForm.value.expirationDate = date.toISOString().split('T')[0]; // Formato ISO


      this.productItem.product = product.product;
      this.productItem.product.id = product.product.id;
      this.productItem.product.name = product.product.name;
      this.productItem.product.description = product.product.description;
    }
  }
}

