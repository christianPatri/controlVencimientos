import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';
import { User } from '../../../../models/users/user';

@Component({
  selector: 'app-monthly-clients-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './monthly-clients-create.component.html',
  styleUrl: './monthly-clients-create.component.css'
})
export class MonthlyClientsCreateComponent implements OnInit{

  monthlyClient: MonthlyClient = new MonthlyClient();
  myForm: FormGroup;

  @Output() monthlyClientCreated = new EventEmitter<MonthlyClient>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      secondaryPhoneNumber: [''],
      document: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  createMonthlyClient(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.monthlyClient.name = this.myForm.value.name;
      this.monthlyClient.lastname = this.myForm.value.lastname;
      this.monthlyClient.phoneNumber = this.myForm.value.phoneNumber;
      this.monthlyClient.secondaryPhoneNumber = this.myForm.value.secondaryPhoneNumber;
      this.monthlyClient.document = this.myForm.value.document;
      this.monthlyClient.address = this.myForm.value.address;

      this.monthlyClientCreated.emit(this.monthlyClient);
    }
  }

  clearFormFields(){
    this.myForm.reset();
    this.monthlyClient.document =  "";
    this.monthlyClient.name = "";
    this.monthlyClient.lastname = "";
    this.monthlyClient.phoneNumber = "";
    this.monthlyClient.secondaryPhoneNumber = "";
    this.monthlyClient.address = "";
  }

}
