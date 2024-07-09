import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigurationItem } from '../../../../models/settings/configurationItem';
import { SettingsService } from '../../../../services/settings/settings.service';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { ConfigurationItemsGridComponent } from '../configurationItems/configuration-items-grid/configuration-items-grid.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ConfigurationItemsGridComponent, CommonModule, PageTitleComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

  _isLoading: Boolean = true;
  _pageTitle: string = "Configuraciones del sistema";

  _configItems!: ConfigurationItem[];

  configSuccessMessage: string = "";
  errorUpdate: Subject<string> = new Subject<string>();

  constructor(
    private settingsService: SettingsService,
  ) {
  }

  ngOnInit(): void {
    this._isLoading = true;
    this.getSistemConfigurations();
  }

  getSistemConfigurations() {
    this.settingsService.getConfigurationItems().subscribe(
      (configItems : ConfigurationItem[]) => {
        this._configItems = configItems;
        this._isLoading = false;
    }, (err) => {
      this._isLoading = false;
    });
  }


  handleEditConfigurationItem(configItem: ConfigurationItem) {
    if (configItem) {
      this.settingsService.updateConfigurationItem(configItem).subscribe(
        (response: ConfigurationItem) => {
          this.configSuccessMessage = "Configuracion Modificada";
          this._isLoading = true;
          this.getSistemConfigurations();
      }, (err) => {
        this._isLoading = false;
        this.triggerErrorUpdate(err.error);
      });
    }
  }

  triggerErrorUpdate(message: string): void {
    this.errorUpdate.next(message);
  }
}
