import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../../models/products/product';
import { ProductsService } from '../../../../services/products/products.service';
import { GenericModalComponent } from '../../modals/generic-modal/generic-modal.component';
import { PageTitleComponent } from '../../pagestitles/page-title/page-title.component';
import { SpinnerComponent } from '../../spinner/spinner/spinner.component';
import { ProductsGridComponent } from '../../../administration/products/products-grid/products-grid.component';
import { ProductItemsModalComponent } from '../product-items-modal/product-items-modal.component';
import { ProductItem } from '../../../../models/productItems/productItem';
import { ProductItemsService } from '../../../../services/productItems/productItems.service';
import { ProductItemsGenerator } from '../../../../models/productItems/productItemsGenerator';
import { ProductItemCreate } from '../../../../models/productItems/productItemCreate';

@Component({
  selector: 'app-product-items-generator',
  standalone: true,
  imports: [CommonModule, ProductItemsModalComponent, GenericModalComponent, SpinnerComponent, PageTitleComponent, FormsModule, ProductsGridComponent],
  templateUrl: './product-items-generator.component.html',
  styleUrl: './product-items-generator.component.css'
})
export class ProductItemsGeneratorComponent implements OnInit{

  _pageTitle: string = "Ingreso de productos";

  barCodeFilter: string = '';
  productNameFilter: string = '';
  filteredProductItems: any[] = [];

  isAddingProductItems: boolean = true;
  _productList: Product[] = [];
  _productSelected: Product = new Product();

  @ViewChild('productItemsModal') productItemsModal!: ProductItemsModalComponent;

  _isLoading: Boolean = true;
  _isLoadingProducts: boolean = true;
  _newProductItems: ProductItem[] = [];
  _newProductItem: ProductItem = new ProductItem();

  @ViewChild('productItemsEditModal') productItemsEditModal!: ProductItemsModalComponent;

  _productItemToEdit: ProductItem = new ProductItem();
  _isEditingProductItem: boolean = false;
  _indexProductItemEdit!: number;

  // Product Items arriba
  showingCreateProductStep1Alert = false;
  showingCreateProductStep1ConfirmationPanel = false;
  messageError = '';

  showingCreateProductAlert = false;
  showingCreateProductConfirmationPanel = false;

  _disableAllButtons: boolean = false;
  @ViewChild('submitModal') submitModal!: GenericModalComponent;

  _submitModalTitle: string = "Creacion de productos";
  _submitedModalIsCreating: boolean = true;
  _showProductsModal: boolean = true;
  _productLoaded: boolean = false;

  constructor(
    private productsService: ProductsService,
    private productItemsService: ProductItemsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    //this.getProductSuppliers();
    this._isLoading = false;
  }

  filterProductItems(){

  }

  getProducts(){
    let products: Product[] =  [];

    if(this.barCodeFilter != null || this.barCodeFilter != undefined || this.barCodeFilter != ""){
      if(this.productNameFilter == null || this.productNameFilter == undefined || this.productNameFilter == ""){
        //filtro por codigo de barras
        this._isLoading = true;
        this._isLoadingProducts = true;

        this.productsService.getProductByCodeBar(this.barCodeFilter).subscribe(
          (response: Product) => {
            this._productList = [];
            this._productList.push(response);
            this._isLoading = false;
            this._isLoadingProducts = false;
          }, (err) => {
            this._isLoading = false;
            this._isLoadingProducts = false;
            console.log(err);
          });
      } else {
        //filtro por los 2
      }
    } else {
      //Filtro por nombre
    }
  }

  handleAddProductItem(product: Product){
    //tengo selected product
    this._productSelected.id = product.id;
    this._productSelected.name = product.name;
    this._productSelected.description = product.description;

    //abro modal
    this.productItemsModal.openModal();
    console.log(product);
  }

  handleCreateProductItem(newProductItem: ProductItem) {
    console.log(newProductItem);
    this.handleModalProductItemEvent(newProductItem, false);
  }

  handleModalProductItemEvent(product: ProductItem, isEdit: boolean){
    this.hideConfirmation(false);
    this.hideAlert(false);
    this.hideAlertsCreated();

    if (product) {
      this._isLoading = true;
      this._productLoaded = true;
      var isValid = this.validateProductEntry(product);

      if(isEdit){
        if(isValid){
          this.mapModalProductItemEdit(product);
        }
        this.productItemsEditModal.closeModal();
      } else{
        if(isValid){
          this.mapModalProductCreate(product);
          this._showProductsModal = false;
        }
        else{
          this._productLoaded = false;
        }

        this.productItemsModal.closeModal();
      }


      this._isLoading = false;
      setTimeout( () => { this.hideConfirmation(false); }, 5000);
    }
  }

  validateProductEntry(product: ProductItem): boolean {
    let isValid: boolean = false;

    if(product.amount <= 0){
      this.showAlert('Cantidad de productos tiene que ser myor a 0', false);
    } else{
      isValid = true;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let dateToCompare = product.expirationDate;
    dateToCompare.setHours(0, 0, 0, 0);

    if(product.expirationDate  <= today){
      this.showAlert('Fecha mayor al dia de hoy', false);
      isValid = false;
    }

    return isValid;
  }

  // showAddSupplierToProduct(){
  //   this._showAddSupplier = true;
  // }

  // showAddSupplierSection(){

  //   //Ver de hacerlo con un modal que liste los proveedores y seleccione uno.

  //   this._clickedAddSupplier = true;
  //   this._showAddSupplierSection = true;
  // }

  // addProduct(){
  //   this._newProducts.push(this._newProduct);
  //   this.cleanProduct();
  // }

  // cleanProduct(){
  //   this._newProduct = new Product();
  //   this._showProductsModal = true;
  //   //this._showAddSupplier = false;
  //   this._productLoaded = false;
  //   //this._showAddSupplierSection = false;
  //   //this._productHasSupplier = false;
  //   //this._selectedSupplierId = -1;
  //   //this._clickedAddSupplier = false;
  // }

  // onSupplierChange(event: any): void {

  //   // this._newProduct.supplier = new ProductSupplier();
  //   //var supplier = this._suppliers[this._selectedSupplierId - 1];
  //   // this._newProduct.supplier.name = supplier.name;
  //   // this._newProduct.supplier.id = supplier.id;
  //   // this._newProduct.supplierId = supplier.id;

  //   this._productHasSupplier = true;
  // }

  mapModalProductCreate(newProduct: ProductItem){

    let alreadyCreated = this._newProductItems.find(p => p.product.id == newProduct.product.id
      && p.expirationDate.getFullYear == newProduct.expirationDate.getFullYear && p.expirationDate.getMonth == newProduct.expirationDate.getMonth
      && p.expirationDate.getDay == newProduct.expirationDate.getDay)

    if(alreadyCreated != null ){
      alreadyCreated.amount += newProduct.amount;
    }
    else{
      var productItem = new ProductItem();
      productItem.product = newProduct.product;
      productItem.amount = newProduct.amount;
      productItem.expirationDate = newProduct.expirationDate;
      productItem.productId = newProduct.product.id;

      this._newProductItems.push(productItem);
    }

  }

  mapModalProductItemEdit(newProductEdited: ProductItem){

    var productItemEdited = this._newProductItems[this._indexProductItemEdit];


    productItemEdited.amount = newProductEdited.amount;
    productItemEdited.expirationDate = newProductEdited.expirationDate;
  }

  editProductItem(index: number) {
    this._isEditingProductItem = true;
    this._productItemToEdit = this.mapModalProductToEdit(index);
    this.productItemsEditModal.openModal();
  }

  mapModalProductToEdit(index: number) : ProductItem{
    var selected = this._newProductItems[index];
    var productItemToEdit = new ProductItem();

    productItemToEdit.amount = selected.amount;
    productItemToEdit.expirationDate = selected.expirationDate;
    productItemToEdit.productId = selected.productId;
    productItemToEdit.product = new Product();
    productItemToEdit.product.name = selected.product.name;
    productItemToEdit.product.id = selected.product.id;
    productItemToEdit.product.description = selected.product.description;

    this._indexProductItemEdit = index;

    return productItemToEdit;
  }

  removeProductFromList(index: number){
    this._newProductItems.splice(index, 1);
  }

  handleEditProductItem(editedProduct: ProductItem) {
    this.handleModalProductItemEvent(editedProduct, true);
  }

  openSubmitModal() {
    this.submitModal.openModal();
  }

  handleSubmitModalEvent(event: boolean){
    if(event == false){
      this.submitModal.closeModal();
    } else{
      this.hideAlertsCreated();
      this.submitModal.closeModal();
      this._isLoading = true;

      this.createProductItems();
    }
  }

  createProductItems() {
    if (this._newProductItems) {

      let productItemsGenerator = new ProductItemsGenerator();
      productItemsGenerator.ProductItemsCreate = [];

      this._newProductItems.forEach(p => {
        let npc = new ProductItemCreate();
        npc.amount = p.amount;
        npc.expirationDate = p.expirationDate;
        npc.productId = p.productId;

        productItemsGenerator.ProductItemsCreate.push(npc);
      })

      this.productItemsService.createProductItems(productItemsGenerator).subscribe(
        (response: ProductItem[]) => {

          this._isLoading = false;
          this._disableAllButtons = true;
          this.showConfirmationCreated("Productos ingresados exitosamente. Sera redirigido a la seccion anterior.");
          this.goToProductsMainPage();

      }, (err) => {
        this.showAlertCreated(err.error);
        this._isLoading = false;
      });
    }
  }

  goToProductsMainPage(){
    setTimeout( () => { this.router.navigate( ['administration/products']);}, 3000);
  }

  showConfirmationCreated(message: string){
    this.messageError = message;
    this.showingCreateProductConfirmationPanel = true;
  }

  showAlertCreated(message: string){
    this.messageError = message;
    this.showingCreateProductAlert = true;
  }

  hideAlertsCreated(){
    this.showingCreateProductConfirmationPanel = false;
    this.showingCreateProductAlert = false;
  }

  ///Estios para que ?

  showAlert(message: string, isSupplier: boolean) {
    this.messageError = message;

    if(isSupplier) {
      this.showingCreateProductStep1ConfirmationPanel = true;
    }
    else{
      this.showingCreateProductAlert = true;
    }
  }

  showConfirmation(message: string, isSupplier: boolean) {
    this.messageError = message;
    if(isSupplier) {
      this.showingCreateProductStep1ConfirmationPanel = true;
    }
    else{
      this.showingCreateProductConfirmationPanel = true;
    }
  }

  hideAlert(isSupplier: boolean){
    if(isSupplier) {
      this.showingCreateProductStep1Alert = false;
    }
    else{
      this.showingCreateProductAlert = false;
    }
  }

  hideConfirmation(isSupplier: boolean){
    if(isSupplier) {
      this.showingCreateProductStep1ConfirmationPanel = false;
    }
    else{
      this.showingCreateProductConfirmationPanel = false;
    }
  }
}


