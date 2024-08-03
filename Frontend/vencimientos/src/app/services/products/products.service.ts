import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SessionService } from '../session/session.service';
import { Product } from '../../models/products/product';
import { ProductsGenerator } from '../../models/products/productsGenerator';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = `${environment.apiBaseUrl}/api/products/`;

  headerDict = {
    'Authorization': this.sessionService.getToken()
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService ) { }

  createProduct(product: Product): Observable<Product> {
    let path = 'CreateProduct';

    return this.http.post<Product>(this.productsUrl + path, product, this.requestOptions);
  }

  createProducts(products: ProductsGenerator): Observable<Product[]> {
    let path = 'CreateProducts';

    return this.http.post<Product[]>(this.productsUrl + path, products, this.requestOptions);
  }

  getActiveProducts(): Observable<Product[]> {
    let path = "ActiveProducts";

    return this.http.get<Product[]>(this.productsUrl + path, this.requestOptions);
  }

  deleteProduct(product: Product): Observable<any> {
    let path = "DeleteProduct";

    return this.http.post<Product[]>(this.productsUrl + path, product, this.requestOptions);
  }

  getProductByCodeBar(codeBar: string): Observable<Product> {
    let path = "CodeBar";

    return this.http.get<Product>(this.productsUrl + path +  "/" + codeBar, this.requestOptions);
  }

  getProductByName(codeBar: string): Observable<Product[]> {
    let path = "GetByName";

    return this.http.get<Product[]>(this.productsUrl + path + "/" + codeBar, this.requestOptions);
  }

  // updateConfigurationItem(configurationItem: ConfigurationItem): Observable<ConfigurationItem> {
  //   let path = 'UpdateConfigurationItem';

  //   return this.http.post<ConfigurationItem>(this.configurationItemsUrl + path, configurationItem, this.requestOptions);
  // }
}
