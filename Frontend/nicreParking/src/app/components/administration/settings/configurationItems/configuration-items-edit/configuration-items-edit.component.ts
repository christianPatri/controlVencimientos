import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigurationItem } from '../../../../../models/settings/configurationItem';

@Component({
  selector: 'app-configuration-items-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './configuration-items-edit.component.html',
  styleUrl: './configuration-items-edit.component.css'
})
export class ConfigurationItemsEditComponent implements OnInit{


  configurationItem: ConfigurationItem = new ConfigurationItem();
  myForm: FormGroup;

  @Output() configurationItemEdited = new EventEmitter<ConfigurationItem>();
  @Input() configurationItemToEdit!: ConfigurationItem;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      value: ['', [Validators.required]]
    });

    this.myForm.get('name')?.disable();
  }

  ngOnInit(): void {
  }

  editConfigItem(){
    if (this.myForm.invalid ) { return; }

    if(this.myForm.valid){
      this.configurationItem.name = this.myForm.value.name;
      this.configurationItem.value = this.myForm.value.value;

      this.configurationItemEdited.emit(this.configurationItem);
    }
  }

  clearFormFields(){
    this.myForm.reset();
    this.configurationItem.name =  "";
    this.configurationItem.value = "";
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties

    if (changes['configurationItemToEdit']) {
      let configItem = changes['configurationItemToEdit'].currentValue;
      this.configurationItem.name = configItem.name;
      this.configurationItem.value = configItem.value;
    }
  }
}
