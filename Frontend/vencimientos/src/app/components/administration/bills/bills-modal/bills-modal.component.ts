import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Bill } from '../../../../models/bills/bill';
import { BillsManualCreateComponent } from '../bills-manual-create/bills-manual-create.component';

@Component({
  selector: 'app-bills-modal',
  standalone: true,
  imports: [BillsManualCreateComponent, CommonModule],
  templateUrl: './bills-modal.component.html',
  styleUrl: './bills-modal.component.css'
})
export class BillsModalComponent implements OnInit{

  isOpen = false;
  billData!: Bill;

  @ViewChild('manualBillCreate') billCreateComponent!: BillsManualCreateComponent;
  @Output() manualBillCreatedModal = new EventEmitter<Bill>();

  constructor() { }

  ngOnInit() { }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;

    if(this.billCreateComponent) this.billCreateComponent.clearFormFields();
  }

  handleManualBillCreated(manualBill: Bill) {
    this.billData = manualBill;
    this.manualBillCreatedModal.emit(this.billData);
  }
}
