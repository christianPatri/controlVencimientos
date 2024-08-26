import { Component, Input, OnInit } from '@angular/core';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';

@Component({
  selector: 'app-suppliers-delete',
  standalone: true,
  imports: [],
  templateUrl: './suppliers-delete.component.html',
  styleUrl: './suppliers-delete.component.css'
})
export class SuppliersDeleteComponent implements OnInit{

  @Input() supplier!: ProductSupplier;

  constructor(

  ) {

  }

  ngOnInit(): void {
  }

}
