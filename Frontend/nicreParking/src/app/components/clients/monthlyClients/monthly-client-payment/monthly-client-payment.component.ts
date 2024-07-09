import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { Bill } from '../../../../models/bills/bill';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { BillService } from '../../../../services/bills/bill.service';
import { BillsGridComponent } from '../../../administration/bills/bills-grid/bills-grid.component';

@Component({
  selector: 'app-monthly-client-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BillsGridComponent],
  templateUrl: './monthly-client-payment.component.html',
  styleUrl: './monthly-client-payment.component.css'
})
export class MonthlyClientPaymentComponent implements OnInit {

  showClientData: boolean = false;
  showErrorMessage: boolean = false;
  returnErrorMessage: string = "";

  @Input() returnMonthlyClient: MonthlyClient;
  @Input() errorUpdate: Subject<string> = new Subject<string>();

  _monthlyClientBills!: Bill[];
  billSuccessMessage: string = "";
  errorBillCreate: Subject<string> = new Subject<string>();

  constructor(private formBuilder: FormBuilder,
     private cdr: ChangeDetectorRef,
     private billService: BillService) {

    this.returnMonthlyClient = new MonthlyClient();
   }


   ngOnInit(): void {
    this.errorUpdate.subscribe(message => {
      this.returnErrorMessage = message;
      this.showClientData = false;
      this.showErrorMessage = true;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  ngOnChanges(changes: SimpleChanges) {
      for (const propName in changes) {
        const changedProp = changes[propName];

        if(propName == "returnMonthlyClient"){
          this.showErrorMessage = false;
          this.getMonthlyClientBills();
        }

        if(propName == "returnErrorMessage"){
          this.showClientData = false;
          this.showErrorMessage = true;
        }
      }
  }

  getMonthlyClientBills(): void {
    this.billService.getMonthlyClientBills(this.returnMonthlyClient.id).subscribe(
      (bills : Bill[]) => {
        this._monthlyClientBills = bills;
        this.showClientData = true;

    }, (err) => {
      this.showClientData = false;
    });
  }

  handlePayBillEvent(billToPay: Bill) {
    if(billToPay) {
      this.billService.payBill(billToPay).subscribe(
        (response: Bill) => {
          this.billSuccessMessage = "Factura pagada";
          this.getMonthlyClientBills();
        }, (err) => {
          this.triggerErrorBill(err.error);
        }
      );
    }
  }

  triggerErrorBill(message: string): void {
    this.errorBillCreate.next(message);
  }

}
