import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';

@Component({
  selector: 'app-suppliers-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './suppliers-edit.component.html',
  styleUrl: './suppliers-edit.component.css'
})
export class SuppliersEditComponent implements OnInit {

  supplier: ProductSupplier = new ProductSupplier();
  myForm: FormGroup;

  @Output() supplierEdited = new EventEmitter<ProductSupplier>();
  @Input() supplierToEdit!: ProductSupplier;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      rut: ['', [Validators.required]],
      description: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      secondaryPhoneNumber: [''],
      contactName: ['', [Validators.required]],
      seller: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  editSupplier(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.supplier.name = this.myForm.value.name;
      this.supplier.rut = this.myForm.value.rut;
      this.supplier.description = this.myForm.value.description;
      this.supplier.phoneNumber = this.myForm.value.phoneNumber;
      this.supplier.secondaryPhoneNumber = this.myForm.value.secondaryPhoneNumber;
      this.supplier.contactName = this.myForm.value.contactName;
      this.supplier.seller = this.myForm.value.seller;

      this.supplierEdited.emit(this.supplier);
    }
  }

  clearFormFields(){
    this.myForm.reset();
    this.supplier.name =  "";
    this.supplier.rut = "";
    this.supplier.description = "";
    this.supplier.phoneNumber = "";
    this.supplier.secondaryPhoneNumber = "";
    this.supplier.contactName = "";
    this.supplier.seller = "";
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties
    //&& !changes['supplierToEdit'].firstChange
    if (changes['supplierToEdit'] ) {
      let supplier = changes['supplierToEdit'].currentValue;
      this.supplier.name = supplier.name;
      this.supplier.description = supplier.description;
      this.supplier.rut = supplier.rut;
      this.supplier.phoneNumber = supplier.phoneNumber;
      this.supplier.secondaryPhoneNumber = supplier.secondaryPhoneNumber;
      this.supplier.seller = supplier.seller;
      this.supplier.contactName = supplier.contactName;
    }
  }

}
