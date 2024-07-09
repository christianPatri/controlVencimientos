import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bill } from '../../../../models/bills/bill';

@Component({
  selector: 'app-bills-manual-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './bills-manual-create.component.html',
  styleUrl: './bills-manual-create.component.css'
})
export class BillsManualCreateComponent implements OnInit{

  manualBill: Bill = new Bill();
  myForm: FormGroup;

  @Output() manualBillCreated = new EventEmitter<Bill>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      totalAmount: [0, [Validators.required]],
      month: [0, [Validators.required]],
      year: [0, [Validators.required]],
      day: [0, [Validators.required]],
      description: ['']
    });
  }

  ngOnInit(): void {
  }

  createManualBill(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.manualBill.totalAmount = this.myForm.value.totalAmount;
      this.manualBill.month = this.myForm.value.month;
      this.manualBill.year = this.myForm.value.year;
      this.manualBill.description = this.myForm.value.description;

      let day: number = this.myForm.value.day;
      let month: number = this.myForm.value.month;
      let year: number = this.myForm.value.year;

      this.manualBill.issueDate = new Date(this.myForm.value.year, this.myForm.value.month - 1, this.myForm.value.day);

      this.manualBillCreated.emit(this.manualBill);
    }
  }

  clearFormFields(){
    this.myForm.reset();
    this.manualBill.totalAmount =  0;
    this.manualBill.month = 0;
    this.manualBill.year = 0;
    this.manualBill.issueDate = new Date();
    this.manualBill.description = '';
  }
}
