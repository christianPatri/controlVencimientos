import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../session/session.service';
import { ProductItem } from '../../models/productItems/productItem';
import { ProductItemsGenerator } from '../../models/productItems/productItemsGenerator';
import { ProductItemsExpirationDto } from '../../models/productItems/productItemsExpirationDto';
import { CheckProductItem } from '../../models/productItems/checkProductItem';

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

  getProductItemsForDateExpiration(productItemsExpiration: ProductItemsExpirationDto): Observable<ProductItem[]> {
    let path = 'GetProductItemsForDateExpiration';

    let params = new HttpParams()
      .set('expirationDate', productItemsExpiration.expirationDate.toDateString());

    return this.http.get<ProductItem[]>(this.productsUrl + path, { params, ...this.requestOptions });
  }

  checkProductItem(productItemToCheck: CheckProductItem): Observable<ProductItem> {
    let path = 'CheckProductItem';

    return this.http.post<ProductItem>(this.productsUrl + path, productItemToCheck, this.requestOptions);
  }

}
