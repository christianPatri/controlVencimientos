import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import moment from 'moment';
import { Subject } from 'rxjs';
import { Bill } from '../../../../models/bills/bill';
import { GenericModalComponent } from '../../../common/modals/generic-modal/generic-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductItem } from '../../../../models/productItems/productItem';
import { ProductItemStatus } from '../../../../models/productItems/productItemStatus';
import { ProductItemsModalComponent } from '../../productItems/product-items-modal/product-items-modal.component';
import { Product } from '../../../../models/products/product';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-day-grid',
  standalone: true,
  imports: [CommonModule, GenericModalComponent, NgxPaginationModule, ProductItemsModalComponent],
  templateUrl: './calendar-day-grid.component.html',
  styleUrl: './calendar-day-grid.component.css'
})
export class CalendarDayGridComponent implements OnInit {

  @Input() productItems!: ProductItem[];
  @Input() successMessage: string = "";
  @Input() errorMessage: Subject<string> = new Subject<string>();
  @Input() daySelected!: string;

  @Output() checkProductItemExpiration = new EventEmitter<ProductItem>();

  @ViewChild('productItemCheckModal') productItemCheckModal!: ProductItemsModalComponent;
  _selectedToCheck: ProductItem = new ProductItem();
  _selectedIndexToCheck: number = -1;
  _isCheckingProductItem: boolean = false;

  showingCreateBillAlert = false;
  showingCreateBillConfirmationPanel = false;
  messageError = '';

  _page: number = 1;
  _itemsPerPage: number = 5;

  ProductItemStatus = ProductItemStatus

  //Export Section
  _exportEnable: boolean = false;


  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.errorMessage.subscribe(message => {
      this.messageError = message;
      this.showAlert(message);
      this.cdr.detectChanges();
    });

    this._exportEnable = true;
  }

  openCheckExpirationModal(productItem: ProductItem) {
    this._selectedToCheck = new ProductItem();

    //abro modal
    this._selectedToCheck.id = productItem.id;
    this._selectedToCheck.amount = productItem.amount;
    this._selectedToCheck.expirationDate = productItem.expirationDate;
    this._selectedToCheck.product = new Product();
    this._selectedToCheck.product.name = productItem.product.name;

    this._selectedIndexToCheck = this.productItems.indexOf(productItem);

    this._isCheckingProductItem = true;
    this.productItemCheckModal.openModal();
  }

  handleCheckProductItem(productItem: ProductItem){
    let productItemToCheck = this.productItems[this._selectedIndexToCheck];
    productItemToCheck.amountExpired = productItem.amountExpired;

    this.productItemCheckModal.closeModal();
    this.checkProductItemExpiration.emit(productItemToCheck);
  }

  showAlert(message: string) {
    this.messageError = message;
    this.showingCreateBillAlert = true;
  }

  showConfirmation(message: string) {
    this.messageError = message;
    this.showingCreateBillConfirmationPanel = true;
  }

  hideAlert(){
    this.showingCreateBillAlert = false;
  }

  hideConfirmation(){
    this.showingCreateBillConfirmationPanel = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const changedProp = changes[propName];

      if (!changedProp.isFirstChange()) {
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

  exportToExcel(): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    const datosTabla1 = this.formatDataToExcell();

    // Convertir los datos combinados en una hoja de Excel
    const hoja: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosTabla1);


    XLSX.utils.book_append_sheet(workbook, hoja, `Vencimientos del dia ${this.daySelected}`);
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    this.saveAsExcelFile(excelBuffer, `Vencimientos del dia ${this.daySelected}`);
  }

  formatDataToExcell(){
    const formattedData = this.productItems.map(item => ({
      'Producto': item.product.name,
      'Proveedor': 'Proveedor',
      'Vencimiento': this.formatDate(item.expirationDate),
      'Cantidad': item.amount,
      'Revisado': item.status == ProductItemStatus.Checked ? 'SI' : 'NO',
      'Fecha revision': item.status == ProductItemStatus.Checked ? this.formatDate(item.checkedDate) : '--',
      'Revisado Por': item.status == ProductItemStatus.Checked ? item.checkedBy?.username : '--',
      'Vencidos': item.status == ProductItemStatus.Checked ? item.amountExpired : '--'
    }));

    return formattedData;
  }

  // formatTotalsToExcell() {
  //   const formattedData : any = [
  //     { 'Total de pensiones' : this._monthlyParkingReport.totalPayments,
  //       'Total de ingresos' : this._monthlyParkingReport.totalAmount }]
  //   ;

  //   return formattedData;
  // }

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

  goBack(){
    this.router.navigate( ['calendar']);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
