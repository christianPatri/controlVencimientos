import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigurationItem } from '../../../../../models/settings/configurationItem';
import { GenericModalComponent } from '../../../../common/modals/generic-modal/generic-modal.component';
import { ConfigurationItemsModalComponent } from '../configuration-items-modal/configuration-items-modal.component';

@Component({
  selector: 'app-configuration-items-grid',
  standalone: true,
  imports: [CommonModule, ConfigurationItemsModalComponent],
  templateUrl: './configuration-items-grid.component.html',
  styleUrl: './configuration-items-grid.component.css'
})
export class ConfigurationItemsGridComponent implements OnInit{

  @Input() configurationItems!: ConfigurationItem[];
  @Input() successMessage: string = "";
  @Input() errorMessage: Subject<string> = new Subject<string>();

  @Output() modifyConfigurationItemEvent = new EventEmitter<ConfigurationItem>();

  @ViewChild('configurationItemEditModal') configurationItemEditModal!: ConfigurationItemsModalComponent;

  _selectedConfigItemToEdit: ConfigurationItem = new ConfigurationItem();

  showingEditConfirmationPanel = false;
  showingEditAlert = false;
  messageError = '';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.errorMessage.subscribe(message => {
      this.messageError = message;
      this.showAlert(message);
      this.cdr.detectChanges();
    });
  }

  showAlert(message: string) {
    this.messageError = message;
  }

  showConfirmation(message: string) {
    this.messageError = message;
    this.showingEditConfirmationPanel = true;
  }

  hideAlert(){
    this.showingEditAlert = false;
  }

  hideConfirmation(){
    this.showingEditConfirmationPanel = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const changedProp = changes[propName];

      if (changedProp.isFirstChange()) {
        if(propName == "successMessage"){
          if(changedProp.currentValue != ""){
            this.hideAlert();
            this.showConfirmation(changedProp.currentValue);
            setTimeout( () => this.hideConfirmation(), 5000);
          }
        }
      }
    }
  }

  editConfigurationItem(configItem: ConfigurationItem) {
    this._selectedConfigItemToEdit = this.mapModalConfigItemToEdit(configItem);

    this.configurationItemEditModal.openModal();
  }

  mapModalConfigItemToEdit(configItem: ConfigurationItem) : ConfigurationItem{
    var configItemToEdit = new ConfigurationItem();

    configItemToEdit.name = configItem.name;
    configItemToEdit.value = configItem.value;
    configItemToEdit.id = configItem.id;

    return configItemToEdit;
  }

  handleEditConfigurationItem(editedConfigItem: ConfigurationItem){
      this.hideConfirmation();
      this.hideAlert();
      editedConfigItem.id = this._selectedConfigItemToEdit.id;
      this.modifyConfigurationItemEvent.emit(editedConfigItem);
  }

}
