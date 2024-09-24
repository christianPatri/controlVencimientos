import { Component } from '@angular/core';
import { BulksService } from '../../../../services/bulks/bulks.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { SuppliersBulkUploaderComponent } from '../uploaders/suppliers-bulk-uploader/suppliers-bulk-uploader.component';
import { ProductItemsBulkUploaderComponent } from '../uploaders/product-items-bulk-uploader/product-items-bulk-uploader.component';
import { ProductsBulkUploaderComponent } from '../uploaders/products-bulk-uploader/products-bulk-uploader.component';

@Component({
  selector: 'app-bulk-uploaders',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PageTitleComponent, SuppliersBulkUploaderComponent
    , ProductItemsBulkUploaderComponent, ProductsBulkUploaderComponent],
  templateUrl: './bulk-uploaders.component.html',
  styleUrl: './bulk-uploaders.component.css'
})
export class BulkUploadersComponent {

  _pageTitle = "Carga de Archivos"

  selectedFile: File | null = null;
  selectedFileProducts: File | null = null;
  selectedFileProductItems: File | null = null;

  _showSupplierUpload: boolean = true;
  _showProductsUpload: boolean = false;
  _showProductItemsUpload: boolean = false;


  constructor(private bulksService: BulksService) {}

  selectedOption: string = '1';  // Opción por defecto

  onOptionChange(event: any): void {
    const selectedValue = event.target.value;

    if (selectedValue === '1') {
      this._showSupplierUpload = true;
      this._showProductsUpload = false;
      this._showProductItemsUpload = false;
    } else if (selectedValue === '2') {
      this._showProductsUpload = true;
      this._showProductItemsUpload = false;
      this._showSupplierUpload = false;
    } else if (selectedValue === '3') {
      this._showProductItemsUpload = true;
      this._showProductsUpload = false;
      this._showSupplierUpload = false;
    }
  }

}
