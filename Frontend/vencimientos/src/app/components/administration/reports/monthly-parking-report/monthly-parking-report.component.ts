import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthlyParkingReport } from '../../../../models/reports/monthlyParkingReport';
import { MonthlyParkingReportIn } from '../../../../models/reports/monthlyParkingReportIn';
import { ReportService } from '../../../../services/reports/report.service';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-monthly-parking-report',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './monthly-parking-report.component.html',
  styleUrl: './monthly-parking-report.component.css'
})
export class MonthlyParkingReportComponent implements OnInit{

  _monthlyParkingReport!: MonthlyParkingReport;
  _isLoading: boolean = true;

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
    this.getMonthlyParkingReport();
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }


  getMonthlyParkingReport() {
    let reportIn = new MonthlyParkingReportIn();
    reportIn.from = this.from;
    reportIn.to = this.to;

    this.reportService.getMonthlyParkingReport(reportIn).subscribe(
      (report: MonthlyParkingReport) => {
        this._monthlyParkingReport = report;
        this._isLoading = false;
        this._exportEnable = report.totalPayments != null && report.totalPayments > 0;
      }, (err) => {
        this._isLoading = false;
      }
    )
  }

  filterMonthlyParkingReport(){
    this._isLoading = true;
    this.getMonthlyParkingReport();
  }

  exportToExcel(): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    const datosTabla1 = this.formatDataToExcell();
    const datosTabla2 = this.formatTotalsToExcell();

    // Combinar las tablas: añadir los datos de la segunda tabla al final de la primera
    const combinedData = [...datosTabla1, {}, ...datosTabla2];

    // Convertir los datos combinados en una hoja de Excel
    const hoja: XLSX.WorkSheet = XLSX.utils.json_to_sheet(combinedData);

    XLSX.utils.book_append_sheet(workbook, hoja, 'Reporte parking mensual');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    this.saveAsExcelFile(excelBuffer, 'reporteParkingMensual');
  }

  // exportToExcel() {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.formatDataToExcell());
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, 'reporteParkingMensual');
  // }

  formatDataToExcell(){
    const formattedData = this._monthlyParkingReport.payments.map(item => ({
      'Nombre': item.clientName,
      'Documento': item.clientDocument,
      'Vehiculos': item.clientVehicles,
      'Fecha de pago': this.formatDate(item.paymentDate),
      'Nro Factura': item.billNumber,
      'Descripcion Factura': item.billDescription,
      'Monto Factura': item.billAmount
    }));

    return formattedData;
  }

  formatTotalsToExcell() {
    const formattedData : any = [
      { 'Total de pensiones' : this._monthlyParkingReport.totalPayments,
      'Total de ingresos' : this._monthlyParkingReport.totalAmount }]
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

