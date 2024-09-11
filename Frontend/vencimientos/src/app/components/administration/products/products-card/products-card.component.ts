import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../../models/products/product';

@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.css'
})
export class ProductsCardComponent implements OnInit{

  @Input() product!: Product;

  @Output() productEditEvent = new EventEmitter<Product>();

  _productToEdit!: Product;

  public constructor(){

  }

  public ngOnInit(): void {

  }

}

