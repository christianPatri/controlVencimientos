import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarDayGridComponent } from '../calendar-day-grid/calendar-day-grid.component';
import { ProductItem } from '../../../../models/productItems/productItem';
import { Subject } from 'rxjs';
import { PageTitleComponent } from '../../pagestitles/page-title/page-title.component';
import { CommonModule } from '@angular/common';
import { ProductItemsService } from '../../../../services/productItems/productItems.service';
import { ProductItemsExpirationDto } from '../../../../models/productItems/productItemsExpirationDto';
import { ProductItemsModalComponent } from '../../productItems/product-items-modal/product-items-modal.component';
import { Product } from '../../../../models/products/product';
import { SessionService } from '../../../../services/session/session.service';
import { CheckProductItem } from '../../../../models/productItems/checkProductItem';

@Component({
  selector: 'app-calendar-day',
  standalone: true,
  imports: [CalendarDayGridComponent, PageTitleComponent, CommonModule, ProductItemsModalComponent],
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.css'
})
export class CalendarDayComponent implements OnInit{

  _isLoading: boolean = false;
  private _year!: number;
  private _month!: number;
  private _day!: number;

  private _isLoadingDayExpirations: boolean = false;

  _successMessage: string = "";
  _errorMessage: Subject<string> = new Subject<string>();

  public _productItems: ProductItem[] = [];

  _pageTitle: string = "Vencimientos del dia";

  _daySelected: string ='';

  // @ViewChild('productItemCheckModal') productItemCheckModal!: ProductItemsModalComponent;
  // _selectedToCheck: ProductItem = new ProductItem();
  // _isCheckingProductItem: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productItemsService: ProductItemsService,
    private sessionService: SessionService
   ){
  }

  //Logica de esta pantalla
  //-------------------------

  // Al clickear en el calendario, me deriva a la pantalla actual, la cual deberia mostrarme los productos que vencen el dia seleccionado.
  // + productos que vencen el proximo dia + productos que vencen en 2 dias.
  // Esta bien eso ultimo, o solo los de ese dia ?

  // 2- Mostrarlos en una grilla
  // La grilla deberia mostrar con iconos o colores de vencimientos segun el calendario
  // Datos a mostrar: nombre producto, proveedor, cantidad productos y fecha ??
  // la grilla tiene que tener un campo con un estado : Check o no Check (icono, o lo que sea)
  // Accion de revisar producto: Donde abro un modal con: cantidad de productos y uno pra completar: cantidad vencidos.
  // Deberia ponerme tambien el nombre del usuario logeado como readonly onda : Revisado por: 'xxxxxx'



  // Esta pantalla deberia tener una segunda logica:
  //--------------------------------------------------

  // Si es el dia actual: debo traer todos los vencidos para atras que no se revisaron !!!!
  // Con una alerta de vencidos !! Onda color ROJO


  ngOnInit(): void {
    this._isLoading = true;
    this._isLoadingDayExpirations = true;

    this.route.paramMap.subscribe(params => {
      let year = params.get('year');
      if(year != null) {
        this._year = Number(year);
      };

      let month = params.get('month');
      if(month != null) {
        this._month = Number(month) -1;
      };

      let day = params.get('day');
      if(day != null) {
        this._day = Number(day);
      };
    });

    this._daySelected = `${this._year}-${this._month +1}-${this._day}`;
    this.getDayExpirations();
  }

  getDayExpirations(){
    let expirationDto = new ProductItemsExpirationDto();
    expirationDto.expirationDate = new Date(Number(this._year), Number(this._month), Number(this._day));

    this.productItemsService.getProductItemsForDateExpiration(expirationDto).subscribe(
      (productItems : ProductItem[]) => {
        this._productItems = productItems;
        this._isLoading = false;
    }, (err) => {
      //this.showAlert(err.error);
      this._isLoading = false;
    });
  }


  handleCheckProductItem(productItem: ProductItem){
    let user = this.sessionService.getUser();

    let checkedProductItem = new CheckProductItem();
    checkedProductItem.productItem = productItem;
    checkedProductItem.user = user;

    this.productItemsService.checkProductItem(checkedProductItem).subscribe(
      (productItem : ProductItem) => {
        //this._productItems = productItems;
        this.getDayExpirations();
        this._isLoading = false;
    }, (err) => {
      //this.showAlert(err.error);
      this._isLoading = false;
    });

  }


}
