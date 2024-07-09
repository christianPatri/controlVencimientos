import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { MonthlyClientCheck } from '../../../../models/clients/monthlyClientCheck';
import { MonthlyClientConsultationGridComponent } from '../monthly-client-consultation-grid/monthly-client-consultation-grid.component';
import { MonthlyClientPaymentComponent } from '../monthly-client-payment/monthly-client-payment.component';

@Component({
  selector: 'app-monthly-client-consultation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MonthlyClientConsultationGridComponent, MonthlyClientPaymentComponent],
  templateUrl: './monthly-client-consultation.component.html',
  styleUrl: './monthly-client-consultation.component.css'
})
export class MonthlyClientConsultationComponent implements OnInit {


  documentForm: FormGroup;
  licenseplateForm: FormGroup;

  showClientData: boolean = false;
  showClientBills: boolean = false;
  clickedShowClientData: boolean = false;
  showErrorMessage: boolean = false;
  returnErrorMessage: string = "";

  @Output() checkDocumentCompleted = new EventEmitter<MonthlyClientCheck>();
  @Output() checklicenseplateCompleted = new EventEmitter<MonthlyClientCheck>();

  @Input() returnMonthlyClient: MonthlyClient;
  @Input() errorUpdate: Subject<string> = new Subject<string>();

  constructor(private formBuilder: FormBuilder, private router: Router, private cdr: ChangeDetectorRef) {
    this.documentForm = this.formBuilder.group({
      document: ['', Validators.required]
    });

    this.licenseplateForm = this.formBuilder.group({
      licenseplate: ['', Validators.required]
    });

    this.returnMonthlyClient = new MonthlyClient();
   }


   ngOnInit(): void {
    this.errorUpdate.subscribe(message => {
      this.returnErrorMessage = message;
      this.showClientData = false;
      this.showClientBills = false;
      this.showErrorMessage = true;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  checkDocumentVehicle(clickedShowData: boolean) {
    if (this.documentForm.invalid ) { return; }

    this.clickedShowClientData = clickedShowData;

    if(this.documentForm.valid){
      this.checkDocumentCompleted.emit(this.documentForm.value);
    }
  }

  checklicenseplateVehicle(clickedShowData: boolean) {
    if (this.licenseplateForm.invalid ) { return; }

    if(this.licenseplateForm.valid){
      this.checklicenseplateCompleted.emit(this.licenseplateForm.value);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
      for (const propName in changes) {
        const changedProp = changes[propName];

        if (!changedProp.isFirstChange()) {
          if(propName == "returnMonthlyClient"){
            this.showClientData = this.clickedShowClientData;
            this.showClientBills = !this.clickedShowClientData;
            this.showErrorMessage = false;
          }

          if(propName == "returnErrorMessage"){
            this.showClientData = false;
            this.showClientBills = false;
            this.showErrorMessage = true;
          }
        }
      }
  }
}
