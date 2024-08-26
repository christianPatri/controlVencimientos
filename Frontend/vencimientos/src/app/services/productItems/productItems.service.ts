import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../session/session.service';
import { ProductItem } from '../../models/productItems/productItem';
import { ProductItemsGenerator } from '../../models/productItems/productItemsGenerator';

@Injectable({
  providedIn: 'root'
})
export class ProductItemsService {

  private productsUrl = `${environment.apiBaseUrl}/api/productItems/`;

  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

  createProductItems(productItems: ProductItemsGenerator): Observable<ProductItem[]> {
    let path = 'CreateProductItems';

    return this.http.post<ProductItem[]>(this.productsUrl + path, productItems, this.requestOptions);
  }
}
