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
  selector: 'app-hourlyly-parking-report',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './hourlyly-parking-report.component.html',
  styleUrl: './hourlyly-parking-report.component.css'
})
export class HourlylyParkingReportComponent implements OnInit{

  _hourlyParkingReport!: NightlyParkingReport;
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
    this.getHourlyParkingReport();
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getHourlyParkingReport() {
    let reportIn = new NightlyParkingReportIn();
    reportIn.from = this.from;
    reportIn.to = this.to;

    this.reportService.getHourlyParkingReport(reportIn).subscribe(
      (report: NightlyParkingReport) => {
        this._hourlyParkingReport = report;
        this._exportEnable = report.totalMovements != null && report.totalMovements > 0;
        this._isLoading = false;
      }, (err) => {
        this._isLoading = false;
      }
    )
  }

  filterHourlyParkingReport(){
    this._isLoading = true;
    this.getHourlyParkingReport();
  }

  exportToExcel(): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    const datosTabla1 = this.formatDataToExcell();
    const datosTabla2 = this.formatTotalsToExcell();

    // Combinar las tablas: añadir los datos de la segunda tabla al final de la primera
    const combinedData = [...datosTabla1, {}, ...datosTabla2];

    // Convertir los datos combinados en una hoja de Excel
    const hoja: XLSX.WorkSheet = XLSX.utils.json_to_sheet(combinedData);

    XLSX.utils.book_append_sheet(workbook, hoja, 'Reporte parking por hora');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    this.saveAsExcelFile(excelBuffer, 'reporteParkingPorHora');
  }

  formatDataToExcell(){
    const formattedData = this._hourlyParkingReport.movements.map(item => ({
      'Nombre': item.name,
      'Matricula': item.licenseplate,
      'Modelo': item.model,
      'Fecha': this.formatDate(item.startingDate, false),
      'Hora de Entrada': this.formatDate(item.startingDate, true),
      'Hora de Salida': this.formatDate(item.startingDate, true),
      'Monto': item.totalAmount
    }));

    return formattedData;
  }

  formatTotalsToExcell() {
    const formattedData : any = [
      {
        'Total de pensiones' : this._hourlyParkingReport.totalMovements,
        'Total de ingresos' : this._hourlyParkingReport.totalAmount }]
    ;

    return formattedData;
  }

  formatDate(date: Date | string, formatTime: boolean): string {
    let formattedDate = '';

    if (typeof date === 'string') {
      // Intentar parsear el string a un objeto Date
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = formatTime ? this.formatTimeObject(parsedDate) : this.formatDateObject(parsedDate);
      }
    } else if (date instanceof Date && !isNaN(date.getTime())) {
      // Si ya es un objeto Date válido
      formattedDate = formatTime ? this.formatTimeObject(date) : this.formatDateObject(date);
    }

    return formattedDate;
  }

  private formatDateObject(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  private formatTimeObject(date: Date): string {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
