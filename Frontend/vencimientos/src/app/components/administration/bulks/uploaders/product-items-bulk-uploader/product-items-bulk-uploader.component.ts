import { Component, OnInit } from '@angular/core';
import { BulksService } from '../../../../../services/bulks/bulks.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../../../common/pagestitles/page-title/page-title.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ProductItemsExcelUpload } from '../../../../../models/bulks/productItemsExcelUpload';
import { SuppliersExcelUpload } from '../../../../../models/bulks/suppliersExcelUpload';

@Component({
  selector: 'app-product-items-bulk-uploader',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PageTitleComponent],
  templateUrl: './product-items-bulk-uploader.component.html',
  styleUrl: './product-items-bulk-uploader.component.css'
})
export class ProductItemsBulkUploaderComponent implements OnInit{

  _pageTitle = "Carga de Archivos"

  selectedFile: File | null = null;
  _isLoadingFile: boolean = false;

  _showResultSection: boolean = false;
  _productItemsExcelUploadResult!: ProductItemsExcelUpload;
  _responseError: boolean = false;


  constructor(private bulksService: BulksService) {}

  ngOnInit(): void {

  }

  fileName: string = '';

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = event.target.files[0];

    if (file) {
      this.fileName = file.name;
    } else {
      this.fileName = '';
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      this._isLoadingFile = true;
      this.bulksService.generateProductItemsFromExcel(this.selectedFile).subscribe(
        (response: ProductItemsExcelUpload) => {
          this._productItemsExcelUploadResult = response;
          this._isLoadingFile = false;
          this._showResultSection = true;
          this.selectedFile = null;
        },
        (error) => {
          //console.error('Error al subir el archivo', error);
          this._responseError = true;
          this._isLoadingFile = false;
          this._showResultSection = true;
          this.selectedFile = null;
        }
      );
    }
  }

  downloadResultReport(){
    this.exportToExcel();
  }

  exportToExcel(): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Obtener los datos de cada tabla
    const datosTabla1 = this.formatErrorInExcelDataToExcell();
    const datosTabla2 = this.formatErrorInSupplierDataToExcell();
    const datosTabla3 = this.formatTotalCreatedDataToExcell();

    // Crear una hoja vacía
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);

    // Agregar encabezado para la primera tabla y los datos
    XLSX.utils.sheet_add_aoa(worksheet, [['Filas con datos con error']], { origin: -1 });
    XLSX.utils.sheet_add_json(worksheet, datosTabla1, { skipHeader: true, origin: -1 });

    // Insertar una fila en blanco para separar tablas
    XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });

    // Agregar encabezado para la segunda tabla y los datos
    XLSX.utils.sheet_add_aoa(worksheet, [['Errores en Productis']], { origin: -1 });
    XLSX.utils.sheet_add_json(worksheet, datosTabla2, { skipHeader: true, origin: -1 });

    // Insertar una fila en blanco para separar tablas
    XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });

    // Agregar encabezado para la tercera tabla y los datos
    XLSX.utils.sheet_add_aoa(worksheet, [['Total de Productos Ingresados']], { origin: -1 });
    XLSX.utils.sheet_add_json(worksheet, datosTabla3, { skipHeader: true, origin: -1 });

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Resultado Ingresos Minimercado');

    // Generar el archivo Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    this.saveAsExcelFile(excelBuffer, 'ResultadoCargaProveedores');
  }

  formatErrorInExcelDataToExcell(){
    let formattedData = [];

    if(this._productItemsExcelUploadResult.rowsError.length > 0 ){
      formattedData = this._productItemsExcelUploadResult.rowsError.map(item => ({
        'Filas con datos con error': item
      }));
    } else{
      formattedData.push({'Filas con datos con error': 0});
    }

    return formattedData;
  }

  formatTotalCreatedDataToExcell(){
    let total = this._productItemsExcelUploadResult.productItemsToCreate.length - this._productItemsExcelUploadResult.productItemsError.length;
    const formattedData = [];
    let x =
    {
      'Total Creados': total
    };
    formattedData.push(x);

    return formattedData;
  }

  formatErrorInSupplierDataToExcell(){
    const formattedData = this._productItemsExcelUploadResult.productItemsError.map(item => ({
      'Producto': item.product.name,
      'Codigo Barras': item.productCodeBar,
      'Vencimiento': item.expirationDate,
      'Cantidad': item.amount,
      'Error': item.errorMessage
    }));

    return formattedData;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
