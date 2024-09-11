import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../../models/bills/bill';
import { SessionService } from '../session/session.service';
import { BulkCheckProductItems } from '../../models/bulks/bulkCheckProductItems';

@Injectable({
  providedIn: 'root'
})
export class BulksService {

  private bulkSupplierUrl = `${environment.apiBaseUrl}/api/bulkSuppliers/`;
  private bulkProductUrl = `${environment.apiBaseUrl}/api/bulkProducts/`;
  private bulkProductItemsUrl = `${environment.apiBaseUrl}/api/bulkProductItems/`;




  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

    generateSuppliersFromExcel(file: File): Observable<any> {
      let path = 'Excel';

      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      return this.http.post<any>(this.bulkSupplierUrl + path, formData, this.requestOptions);
    }

    generateProductsFromExcel(file: File): Observable<any> {
      let path = 'Excel';

      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      return this.http.post<any>(this.bulkProductUrl + path, formData, this.requestOptions);
    }

    generateProductItemsFromExcel(file: File): Observable<any> {
      let path = 'Excel';

      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      return this.http.post<any>(this.bulkProductItemsUrl + path, formData, this.requestOptions);
    }

    checkProductItemsFromExcel(file: File): Observable<any> {
      let path = 'CheckByExcel';

      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      let input = new BulkCheckProductItems();
      input.formData = formData;
      input.user = this.sessionService.getUser();

      return this.http.post<any>(this.bulkProductItemsUrl + path, input, this.requestOptions);
    }
}
