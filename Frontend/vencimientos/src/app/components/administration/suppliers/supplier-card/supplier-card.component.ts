import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { MonthlyClientsModalComponent } from '../../monthlyClients/monthly-clients-modal/monthly-clients-modal.component';

@Component({
  selector: 'app-supplier-card',
  standalone: true,
  imports: [],
  templateUrl: './supplier-card.component.html',
  styleUrl: './supplier-card.component.css'
})
export class SupplierCardComponent implements OnInit{

  @Input() supplier!: ProductSupplier;

  @Output() supplierEditEvent = new EventEmitter<ProductSupplier>();
  //@ViewChild('monthlyClientEditModal') monthlyCLientModal!: MonthlyClientsModalComponent;

  _supplierToEdit!: ProductSupplier;

  public constructor(){

  }

  public ngOnInit(): void {

  }

}
