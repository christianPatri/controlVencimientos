import { Component } from '@angular/core';
import { BulksService } from '../../../../services/bulks/bulks.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bulk-uploaders',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './bulk-uploaders.component.html',
  styleUrl: './bulk-uploaders.component.css'
})
export class BulkUploadersComponent {

  selectedFile: File | null = null;
  selectedFileProducts: File | null = null;

  constructor(private bulksService: BulksService) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFileChangeProducts(event: any) {
    this.selectedFileProducts = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      this.bulksService.generateSuppliersFromExcel(this.selectedFile).subscribe(
        (response) => {
          console.log('Archivo subido exitosamente', response);
        },
        (error) => {
          console.error('Error al subir el archivo', error);
        }
      );
    }
  }

  onSubmitProducts() {
    if (this.selectedFileProducts) {
      this.bulksService.generateProductsFromExcel(this.selectedFileProducts).subscribe(
        (response) => {
          console.log('Archivo subido exitosamente', response);
        },
        (error) => {
          console.error('Error al subir el archivo', error);
        }
      );
    }
  }

  //Deberia generar un listado de todos los generados OK, y los que no se pudieron por algun error.

  // Deberia de devolver el listado de ProductItems, y un listado de errores, quizas diciendo el error generado?

}
