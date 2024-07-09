import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { Bill } from '../../../../models/bills/bill';

@Component({
  selector: 'app-bills-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bills-payment.component.html',
  styleUrl: './bills-payment.component.css'
})
export class BillsPaymentComponent implements OnInit{

  @Input() bill!: Bill;

  constructor(

  ) {

  }

  ngOnInit(): void {
  }

}
