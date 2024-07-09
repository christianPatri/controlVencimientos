import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MonthlyClient } from '../../../../models/clients/monthlyClient';

@Component({
  selector: 'app-monthly-clients-edit',
  standalone: true,
  imports: [[FormsModule, ReactiveFormsModule],],
  templateUrl: './monthly-clients-edit.component.html',
  styleUrl: './monthly-clients-edit.component.css'
})
export class MonthlyClientsEditComponent implements OnInit {

  monthlyClient: MonthlyClient = new MonthlyClient();
  myForm: FormGroup;

  @Output() monthlyClientEdited = new EventEmitter<MonthlyClient>();
  @Input() monthlyClientToEdit!: MonthlyClient;

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

  editMonthlyClient(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.monthlyClient.name = this.myForm.value.name;
      this.monthlyClient.lastname = this.myForm.value.lastname;
      this.monthlyClient.phoneNumber = this.myForm.value.phoneNumber;
      this.monthlyClient.secondaryPhoneNumber = this.myForm.value.secondaryPhoneNumber;
      this.monthlyClient.document = this.myForm.value.document;
      this.monthlyClient.address = this.myForm.value.address;

      this.monthlyClientEdited.emit(this.monthlyClient);
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

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties

    if (changes['monthlyClientToEdit'] && !changes['monthlyClientToEdit'].firstChange) {
      let monthlyClient = changes['monthlyClientToEdit'].currentValue;
      this.monthlyClient.name = monthlyClient.name;
      this.monthlyClient.lastname = monthlyClient.lastname;
      this.monthlyClient.document = monthlyClient.document;
      this.monthlyClient.phoneNumber = monthlyClient.phoneNumber;
      this.monthlyClient.secondaryPhoneNumber = monthlyClient.secondaryPhoneNumber;
      this.monthlyClient.address = monthlyClient.address;
    }
  }

}
