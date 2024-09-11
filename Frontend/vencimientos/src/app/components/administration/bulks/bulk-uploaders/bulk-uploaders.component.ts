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

  // onFileChange(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  // onFileChangeProducts(event: any) {
  //   this.selectedFileProducts = event.target.files[0];
  // }

  // onFileChangeProductItemss(event: any) {
  //   this.selectedFileProductItems = event.target.files[0];
  // }

  // onSubmit() {
  //   if (this.selectedFile) {
  //     this.bulksService.generateSuppliersFromExcel(this.selectedFile).subscribe(
  //       (response) => {
  //         console.log('Archivo subido exitosamente', response);
  //       },
  //       (error) => {
  //         console.error('Error al subir el archivo', error);
  //       }
  //     );
  //   }
  // }

  // onSubmitProducts() {
  //   if (this.selectedFileProducts) {
  //     this.bulksService.generateProductsFromExcel(this.selectedFileProducts).subscribe(
  //       (response) => {
  //         console.log('Archivo subido exitosamente', response);
  //       },
  //       (error) => {
  //         console.error('Error al subir el archivo', error);
  //       }
  //     );
  //   }
  // }

  // onSubmitProductItems() {
  //   if (this.selectedFileProductItems) {
  //     this.bulksService.generateProductsFromExcel(this.selectedFileProductItems).subscribe(
  //       (response) => {
  //         console.log('Archivo subido exitosamente', response);
  //       },
  //       (error) => {
  //         console.error('Error al subir el archivo', error);
  //       }
  //     );
  //   }
  // }

  //Deberia generar un listado de todos los generados OK, y los que no se pudieron por algun error.

  // Deberia de devolver el listado de ProductItems, y un listado de errores, quizas diciendo el error generado?

}
