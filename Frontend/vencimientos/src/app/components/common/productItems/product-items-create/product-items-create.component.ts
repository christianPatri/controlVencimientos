import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Product } from '../../../../models/products/product';
import { ProductItem } from '../../../../models/productItems/productItem';
import moment from 'moment';

@Component({
  selector: 'app-product-items-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-items-create.component.html',
  styleUrl: './product-items-create.component.css'
})
export class ProductItemsCreateComponent implements OnInit{

  productItem: ProductItem = new ProductItem();
  myForm: FormGroup;
  productSelected: Product = new Product();

  @Input() product!: Product;
  @Output() productItemCreated = new EventEmitter<ProductItem>();

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

  createProductItem(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.productItem.amount = this.myForm.value.amount;
      const selectedDateMoment = moment(this.myForm.value.expirationDate, 'YYYY-MM-DD');

      this.productItem.expirationDate = selectedDateMoment.utc().toDate();
      this.productItem.product = new Product();
      this.productItem.product.id = this.product.id;
      this.productItem.product.name = this.product.name;
      this.productItem.product.description = this.product.description;

      this.productItemCreated.emit(this.productItem);
    }
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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {

      let product = changes['product'].currentValue;
      if(product != null || product != undefined){
        this.productSelected.name = product.name;
        this.productSelected.description = product.description;
        this.productSelected.barCode = product.barCode;
        this.productSelected.amountDaysPreviousNotification = product.amountDaysPreviousNotification;
      }

    }
  }
}

