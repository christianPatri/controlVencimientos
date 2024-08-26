import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SessionService } from '../session/session.service';
import { ProductSupplier } from '../../models/suppliers/productSupplier';


@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private suppliersUrl = `${environment.apiBaseUrl}/api/productSuppliers/`;

  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

  createSupplier(supplier: ProductSupplier): Observable<ProductSupplier> {
    let path = 'Create';

    return this.http.post<ProductSupplier>(this.suppliersUrl + path, supplier, this.requestOptions);
  }

  getActiveSuppliers(): Observable<ProductSupplier[]> {
    let path = "ActiveSuppliers";

    return this.http.get<ProductSupplier[]>(this.suppliersUrl + path, this.requestOptions);
  }

  deleteSupplier(supplier: ProductSupplier): Observable<any> {
    let path = "";

    return this.http.get<ProductSupplier[]>(this.suppliersUrl + path, this.requestOptions);
  }

  getSupplier(supplierId: number): Observable<ProductSupplier> {
    //let path = "GetSupplier";

    return this.http.get<ProductSupplier>(`${this.suppliersUrl}${supplierId}`, this.requestOptions);
  }

}
