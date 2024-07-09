import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { MonthlyVehicle } from '../../../../models/vehicles/monthlyVehicle';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';
import { MonthlyVehicleMovements } from '../../../../models/vehicles/monthlyVehicleMovements';
import { MonthlyVehicleService } from '../../../../services/monthlyVehicles/monthlyVehicle.service';
import { MonthlyParkingLog } from '../../../../models/vehicles/monthlyParkingLog';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import localeEs from '@angular/common/locales/es';

// Registra los datos de localización para español
registerLocaleData(localeEs);

@Component({
  selector: 'app-monthly-vehicle-movements',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, SpinnerComponent, PageTitleComponent, FormsModule, ReactiveFormsModule],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'es' }],
  templateUrl: './monthly-vehicle-movements.component.html',
  styleUrl: './monthly-vehicle-movements.component.css'
})
export class MonthlyVehicleMovementsComponent implements OnInit{

  @Input() vehicle!: MonthlyVehicle;

  _vehicleParkingLog!: MonthlyParkingLog[];

  _pageTitle: string = "Movimientos de vehiculo";
  _isLoading: boolean = true;

  _totalItems!: number;
  _page: number = 1;
  _itemsPerPage: number = 10;

  from!: string;
  to!: string;

  _exportEnable: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private monthlyVehicleService: MonthlyVehicleService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    let now = new Date();
    this.from = this.formatDateForSearch(new Date(now.getFullYear(), now.getMonth(), 1));

    this.route.paramMap.subscribe(() => {
      if (history.state) {
        this.vehicle = history.state;

        this._totalItems = this.vehicle.vehicleParkingLogs.length;
        this._vehicleParkingLog = this.vehicle.vehicleParkingLogs;
        this._exportEnable = this._totalItems > 0;
      }
    });

    this._isLoading = false;
  }

  formatDateForSearch(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  filterMonthlyVehicleLogs(){
    this._isLoading = true;
    this.getMonthlyVehiclesMovements();
  }

  getMonthlyVehiclesMovements(): void {
    let input = new MonthlyVehicleMovements();
    input.monthlyVehicleId = this.vehicle.id;
    input.from = this.from;
    input.to = this.to;

    this.monthlyVehicleService.getMonthlyVehicleMovements(input).subscribe(
      (logs : MonthlyParkingLog[]) => {
        this._vehicleParkingLog = logs;
        this._totalItems = logs.length;
        this._isLoading = false;
        this._exportEnable = this._totalItems > 0;
      }, err => {
        this._isLoading = false;
        console.log(err);
      }
    )
  }

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.formatDataToExcell());
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'movimientosVehiculo' + this.vehicle.licenseplate);
  }

  formatDataToExcell(){
    const formattedData = this._vehicleParkingLog.map(item => ({
      'Fecha Completa': this.formatDate(item.entryExitDate, false, false),
      'Dia-Mes': this.formatDate(item.entryExitDate, false, true),
      'Hora de entrada': item.isEntry ? this.formatDate(item.entryExitDate, true, false) : '--',
      'Hora de salida': !item.isEntry ? this.formatDate(item.entryExitDate, true, false) : '--',
    }));

    return formattedData;
  }

  formatDate(date: Date | string, formatTime: boolean, formatDay: boolean): string {
    let formattedDate = '';

    if (typeof date === 'string') {
      // Intentar parsear el string a un objeto Date
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        if(formatDay){
          formattedDate = this.formatDateObjectText(parsedDate);
        }
        else{
          formattedDate = formatTime ? this.formatTimeObject(parsedDate) : this.formatDateObject(parsedDate);
        }
      }
    } else if (date instanceof Date && !isNaN(date.getTime())) {
      if(formatDay){
        formattedDate = this.formatDateObjectText(date);
      }
      else{
        formattedDate = formatTime ? this.formatTimeObject(date) : this.formatDateObject(date);
      }
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

  private formatDateObjectText(date: Date): string {
    return this.datePipe.transform(date, 'dd-MMMM', 'GMT-5', 'es')!;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
