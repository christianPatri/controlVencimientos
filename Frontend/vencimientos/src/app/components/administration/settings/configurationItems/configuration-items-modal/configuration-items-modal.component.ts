import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ConfigurationItem } from '../../../../../models/settings/configurationItem';
import { ConfigurationItemsEditComponent } from '../configuration-items-edit/configuration-items-edit.component';

@Component({
  selector: 'app-configuration-items-modal',
  standalone: true,
  imports: [CommonModule, ConfigurationItemsEditComponent],
  templateUrl: './configuration-items-modal.component.html',
  styleUrl: './configuration-items-modal.component.css'
})
export class ConfigurationItemsModalComponent implements OnInit{
  isOpen = false;
  configurationItemData!: ConfigurationItem;

  @ViewChild('configurationItemEdit') configurationItemEditComponent!: ConfigurationItemsEditComponent;

  @Output() configurationItemEditedModal = new EventEmitter<ConfigurationItem>();
  @Input() isEditing!: boolean;
  @Input() configurationItemToEdit!: ConfigurationItem;

  constructor() { }

  ngOnInit() { }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    if(this.configurationItemEditComponent) this.configurationItemEditComponent.clearFormFields();

  }

  handleConfigurationItemEdited(configurationItemData: ConfigurationItem) {
    this.configurationItemData = configurationItemData;
    this.configurationItemEditedModal.emit(this.configurationItemData);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check for changes in specific properties
    if (changes['configurationItemToEdit']) {
      let user = changes['configurationItemToEdit'].currentValue;
    }

    // Perform any necessary updates based on the changes
  }

}
