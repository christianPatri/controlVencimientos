import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../../models/products/product';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';
import { ProductsService } from '../../../../services/products/products.service';
import { SuppliersService } from '../../../../services/suppliers/suppliers.service';
import { GenericModalComponent } from '../../../common/modals/generic-modal/generic-modal.component';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';
import { ProductsModalComponent } from '../products-modal/products-modal.component';
import { FormsModule } from '@angular/forms';
import { ProductsGenerator } from '../../../../models/products/productsGenerator';

@Component({
  selector: 'app-products-generator',
  standalone: true,
  imports: [CommonModule, ProductsModalComponent, GenericModalComponent, SpinnerComponent, PageTitleComponent, FormsModule],
  templateUrl: './products-generator.component.html',
  styleUrl: './products-generator.component.css'
})
export class ProductsGeneratorComponent implements OnInit{

  _pageTitle: string = "Generacion de productos";

  showingCreateProductStep1Alert = false;
  showingCreateProductStep1ConfirmationPanel = false;
  messageError = '';

  showingCreateProductAlert = false;
  showingCreateProductConfirmationPanel = false;

  _disableAllButtons: boolean = false;

  @ViewChild('productsModal') productsModal!: ProductsModalComponent;
  @ViewChild('productsEditModal') productsEditModal!: ProductsModalComponent;

  _productToEdit: Product = new Product();
  _isEditingProduct: boolean = false;

  @ViewChild('submitModal') submitModal!: GenericModalComponent;

  _submitModalTitle: string = "Creacion de productos";
  _submitedModalIsCreating: boolean = true;

  //
  _isLoading: Boolean = true;
  _newProducts: Product[] = [];
  _newProduct: Product = new Product();

  _showProductsModal: boolean = true;
  _productLoaded: boolean = false;

  _clickedAddSupplier: boolean = false;
  _showAddSupplier: boolean = false;
  _showAddSupplierSection: boolean = false;
  _productHasSupplier: boolean = false;

  _suppliers: ProductSupplier[] = [];
  _selectedSupplierId: number = -1;

  constructor(
    private supplierService: SuppliersService,
    private productsService: ProductsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getProductSuppliers();
  }

  getProductSuppliers(){
    this.supplierService.getActiveSuppliers().subscribe(
      (response: ProductSupplier[]) => {
        this._suppliers = response;
        this._isLoading = false;
    }, (err) => {
      //Mostrar mensaje ?
      this._isLoading = false;
    });
  }

  openProductsModal() {
    this.productsModal.openModal();
  }

  handleCreateProduct(newProduct: Product) {
    this.handleModalProductEvent(newProduct, false);
  }

  handleModalProductEvent(product: Product, isEdit: boolean){
    this.hideConfirmation(false);
    this.hideAlert(false);
    this.hideAlertsCreated();

    if (product) {
      this._isLoading = true;
      this._productLoaded = true;
      var exists = this.validateProductEntry(product);

      if(isEdit){
        if(!exists){
          this.mapModalProductEdit(product);
        }
        this.productsEditModal.closeModal();
      } else{
        if(!exists){
          this.showAddSupplierToProduct();
          this.mapModalProductCreate(product);
          this._showProductsModal = false;
        }
        else{
          this._productLoaded = false;
        }

        this.productsModal.closeModal();
      }


      this._isLoading = false;
      setTimeout( () => { this.hideConfirmation(false); }, 5000);
    }
  }

  validateProductEntry(product: Product): boolean {
    let exists: boolean = false;

    if(this._newProducts.length == 0){
      return exists;
    }

    var products = this._newProducts;
      exists = products.find(p => p.barCode.replace(/\s/g, "") == product.barCode.replace(/\s/g, "")) != null;

    if(exists){
      this.showAlert('Codigo de Barras existente', false)
    }

    return exists;
  }

  showAddSupplierToProduct(){
    this._showAddSupplier = true;
  }

  showAddSupplierSection(){

    //Ver de hacerlo con un modal que liste los proveedores y seleccione uno.

    this._clickedAddSupplier = true;
    this._showAddSupplierSection = true;
  }

  addProduct(){
    this._newProducts.push(this._newProduct);
    this.cleanProduct();
  }

  cleanProduct(){
    this._newProduct = new Product();
    this._showProductsModal = true;
    this._showAddSupplier = false;
    this._productLoaded = false;
    this._showAddSupplierSection = false;
    this._productHasSupplier = false;
    this._selectedSupplierId = -1;
    this._clickedAddSupplier = false;
  }

  onSupplierChange(event: any): void {

    this._newProduct.supplier = new ProductSupplier();
    var supplier = this._suppliers[this._selectedSupplierId - 1];
    this._newProduct.supplier.name = supplier.name;
    this._newProduct.supplier.id = supplier.id;
    this._newProduct.supplierId = supplier.id;

    this._productHasSupplier = true;
  }

  mapModalProductCreate(newProduct: Product){
    this._newProduct.name = newProduct.name;
    this._newProduct.barCode = newProduct.barCode;
    this._newProduct.description = newProduct.description;
    this._newProduct.amountDaysPreviousNotification = newProduct.amountDaysPreviousNotification;
    this._newProduct.supplier = newProduct.supplier;
  }

  mapModalProductEdit(newProductEdited: Product){
    this._newProduct.name = newProductEdited.name;
    this._newProduct.description = newProductEdited.description;
    this._newProduct.barCode = newProductEdited.barCode;
    this._newProduct.amountDaysPreviousNotification = newProductEdited.amountDaysPreviousNotification;
  }

  editProduct() {
    this._isEditingProduct = true;
    this._productToEdit = this.mapModalProductToEdit();
    this.productsEditModal.openModal();
  }

  mapModalProductToEdit() : Product{
    var selected = this._newProduct;
    var productToEdit = new Product();

    productToEdit.name = selected.name;
    productToEdit.description = selected.description;
    productToEdit.barCode = selected.barCode;
    productToEdit.amountDaysPreviousNotification = selected.amountDaysPreviousNotification;

    return productToEdit;
  }

  removeProductFromList(index: number){
    this._newProducts.splice(index, 1);
  }

  handleEditProduct(editedProduct: Product) {
    this.handleModalProductEvent(editedProduct, true);
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

      this.createProducts();
    }
  }

  createProducts() {
    if (this._newProducts) {
      let productsGenerator = new ProductsGenerator();
      productsGenerator.products = this._newProducts

      this.productsService.createProducts(productsGenerator).subscribe(
        (response: Product[]) => {

          this._isLoading = false;
          this._disableAllButtons = true;
          this.showConfirmationCreated("Productos generados. Sera redirigido a la seccion anterior.");
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

