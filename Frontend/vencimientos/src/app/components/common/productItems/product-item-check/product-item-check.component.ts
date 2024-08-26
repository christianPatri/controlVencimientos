import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductItem } from '../../../../models/productItems/productItem';
import moment from 'moment';
import { Product } from '../../../../models/products/product';

@Component({
  selector: 'app-product-item-check',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './product-item-check.component.html',
  styleUrl: './product-item-check.component.css'
})
export class ProductItemCheckComponent implements OnInit {

  productItem: ProductItem = new ProductItem();
  myForm: FormGroup;

  @Output() productItemChecked = new EventEmitter<ProductItem>();
  @Input() productItemToCheck!: ProductItem;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name:[''],
      expirationDate: ['', [Validators.required]],
      amountExpired: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.updateForm(this.productItemToCheck);
  }

  clearFormFields(){
    this.myForm.reset();
    this.productItem = new ProductItem();
    this.productItem.amount = 0;
    this.productItem.expirationDate = new Date();
    this.productItem.product = new Product();
    this.productItem.amountExpired = 0;
  }

  checkProductItem(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.productItem.amountExpired = this.myForm.value.amountExpired;

      this.productItemChecked.emit(this.productItem);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['productItemToCheck']) {
    //   let product = changes['productItemToCheck'].currentValue;

    //   if(product.amount > 0){
    //     this.productItem.amount = product.amount;

    //     const date = new Date(product.expirationDate);
    //     this.myForm.value.expirationDate = date.toISOString().split('T')[0]; // Formato ISO

    //     this.productItem.expirationDate = new Date(product.expirationDate);

    //     this.productItem.product = product.product;
    //     this.productItem.product.id = product.product.id;
    //     this.productItem.product.name = product.product.name;
    //   }


    // }

    if (changes['productItemToCheck']) {
      this.updateForm(changes['productItemToCheck'].currentValue);
    }
  }

  private updateForm(product: ProductItem) {
    if (product && product.amount > 0) {
      this.myForm.patchValue({
        name: product.product.name,
        expirationDate: moment(product.expirationDate).format('DD-MM-YYYY'), // Formatear la fecha a ISO
        amountExpired: product.amountExpired
      });

      this.productItem = {
        ...product,
        expirationDate: new Date(product.expirationDate)
      };
    }
  }
}


