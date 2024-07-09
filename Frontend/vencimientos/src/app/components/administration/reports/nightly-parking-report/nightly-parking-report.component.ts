import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NightlyParkingReport } from '../../../../models/reports/nighltyParkingReport';
import { NightlyParkingReportIn } from '../../../../models/reports/nightlyParkingReportIn';
import { ReportService } from '../../../../services/reports/report.service';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-nightly-parking-report',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './nightly-parking-report.component.html',
  styleUrl: './nightly-parking-report.component.css'
})
export class NightlyParkingReportComponent implements OnInit{

  _nighltyParkingReport!: NightlyParkingReport;
  _isLoading: boolean = false;

  from!: string;
  to!: string;

  _exportEnable: boolean = false;
  _page: number = 1;
  _itemsPerPage: number = 5;

  public constructor(
    private reportService: ReportService,
  ){

  }

  ngOnInit(): void {
    let now = new Date();
    this.from = this.formatDateForInput(new Date(now.getFullYear(), now.getMonth(), 1));
    this.getNightlyParkingReport();
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getNightlyParkingReport() {
    let reportIn = new NightlyParkingReportIn();
    reportIn.from = this.from;
    reportIn.to = this.to;

    this.reportService.getNightlyParkingReport(reportIn).subscribe(
      (report: NightlyParkingReport) => {
        this._nighltyParkingReport = report;
        this._exportEnable = report.totalAmount != null && report.totalMovements > 0;
        this._isLoading = false;
      }, (err) => {
        this._isLoading = false;
      }
    )
  }

  filterNighltyParkingReport(){
    this._isLoading = true;
    this.getNightlyParkingReport();
  }

  exportToExcel(): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    const datosTabla1 = this.formatDataToExcell();
    const datosTabla2 = this.formatTotalsToExcell();

    // Combinar las tablas: añadir los datos de la segunda tabla al final de la primera
    const combinedData = [...datosTabla1, {}, ...datosTabla2];

    // Convertir los datos combinados en una hoja de Excel
    const hoja: XLSX.WorkSheet = XLSX.utils.json_to_sheet(combinedData);

    XLSX.utils.book_append_sheet(workbook, hoja, 'Reporte parking nocturno');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    this.saveAsExcelFile(excelBuffer, 'reporteParkingNocturno');
  }

  formatDataToExcell(){
    const formattedData = this._nighltyParkingReport.movements.map(item => ({
      'Nombre': item.name,
      'Matricula': item.licenseplate,
      'Modelo': item.model,
      'Fecha de Ingreso': this.formatDate(item.startingDate),
      'Monto': item.totalAmount,
    }));

    return formattedData;
  }

  formatTotalsToExcell() {
    const formattedData : any = [
      {
         'Total de pensiones' : this._nighltyParkingReport.totalMovements,
        'Total de ingresos' : this._nighltyParkingReport.totalAmount }]
    ;

    return formattedData;
  }

  formatDate(date: Date | string): string {
    let formattedDate = '';

    if (typeof date === 'string') {
      // Intentar parsear el string a un objeto Date
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = this.formatDateObject(parsedDate);
      }
    } else if (date instanceof Date && !isNaN(date.getTime())) {
      // Si ya es un objeto Date válido
      formattedDate = this.formatDateObject(date);
    }

    return formattedDate;
  }

  private formatDateObject(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
