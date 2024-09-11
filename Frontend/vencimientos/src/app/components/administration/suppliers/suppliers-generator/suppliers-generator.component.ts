import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GenericModalComponent } from '../../../common/modals/generic-modal/generic-modal.component';
import { PageTitleComponent } from '../../../common/pagestitles/page-title/page-title.component';
import { SpinnerComponent } from '../../../common/spinner/spinner/spinner.component';
import { SuppliersService } from '../../../../services/suppliers/suppliers.service';
import { ProductSupplier } from '../../../../models/suppliers/productSupplier';
import { SuppliersModalComponent } from '../suppliers-modal/suppliers-modal.component';
import { SuppliersCreateComponent } from '../suppliers-create/suppliers-create.component';
import { Product } from '../../../../models/products/product';
import { ProductsModalComponent } from '../../products/products-modal/products-modal.component';
import { ProductsService } from '../../../../services/products/products.service';
import { ProductsCreateComponent } from '../../products/products-create/products-create.component';

@Component({
  selector: 'app-suppliers-generator',
  standalone: true,
  imports: [SuppliersCreateComponent, SuppliersModalComponent, CommonModule,ProductsModalComponent,
    ProductsCreateComponent, GenericModalComponent, SpinnerComponent, PageTitleComponent],
  templateUrl: './suppliers-generator.component.html',
  styleUrl: './suppliers-generator.component.css'
})
export class SuppliersGeneratorComponent implements OnInit{

  _pageTitle: string = "Generacion de proveedor";

  showingCreateSupplierStep1Alert = false;
  showingCreateSupplierStep1ConfirmationPanel = false;
  messageError = '';

  showingCreateProductAlert = false;
  showingCreateProductConfirmationPanel = false;

  showingCreateSupplierAlert = false;
  showingCreateSupplierConfirmationPanel = false;

  _isLoading: Boolean = false;
  _showSupplierModal: boolean = true;
  _stepOne: boolean = true;
  _stepTwo: boolean = false;
  _stepThree: boolean = false;
  _disableAllButtons: boolean = false;

  @ViewChild('suppliersModal') suppliersModal!: SuppliersModalComponent;
  @ViewChild('suppliersEditModal') suppliersEditModal!: SuppliersModalComponent;

  _supplierLoaded: boolean = false;
  _newSupplier: ProductSupplier = new ProductSupplier();
  _supplierToEdit: ProductSupplier = new ProductSupplier();
  _isEditing: boolean = false;

  @ViewChild('productsModal') productsModal!: ProductsModalComponent;
  @ViewChild('productsEditModal') productsEditModal!: ProductsModalComponent;

  _productToEdit: Product = new Product();
  _newSupplierProducts: Product[] = [];

  _productLoaded: boolean = false;
  _isEditingProduct: boolean = false;
  _indexProductEdit: number = -1;

  @ViewChild('submitModal') submitModal!: GenericModalComponent;

  _submitModalTitle: string = "Creacion de proveedor";
  _submitedModalIsCreating: boolean = true;

  _wantToCreateProducts : boolean = false;

  constructor(
    private supplierService: SuppliersService,
    private productsService: ProductsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  openSuppliersModal() {
    this.suppliersModal.openModal();
  }

  handleCreateSupplier(newSupplier: ProductSupplier) {
    this.handleModalEvent(newSupplier, false);
  }

  editSupplier() {
    this._isEditing = true;
    this._supplierToEdit = this.mapModalClientToEdit();
    this.suppliersEditModal.openModal();
  }

  mapModalClientToEdit() : ProductSupplier{
    var supplierToEdit = new ProductSupplier();

    supplierToEdit.name = this._newSupplier.name;
    supplierToEdit.rut = this._newSupplier.rut;
    supplierToEdit.description = this._newSupplier.description;
    supplierToEdit.phoneNumber = this._newSupplier.phoneNumber;
    supplierToEdit.secondaryPhoneNumber = this._newSupplier.secondaryPhoneNumber;
    supplierToEdit.seller = this._newSupplier.seller;
    supplierToEdit.contactName = this._newSupplier.contactName;
    supplierToEdit.visitDays = this._newSupplier.visitDays;
    supplierToEdit.interval = this._newSupplier.interval;

    return supplierToEdit;
  }

  handleEditSupplier(editedSupplier: ProductSupplier) {
    this.handleModalEvent(editedSupplier, true);
  }

  handleModalEvent(supplier: ProductSupplier, isEdit: boolean){
    this.hideConfirmation(true);

    if (supplier) {
      this._isLoading = true;
      this.mapModalClient(supplier);

      this._supplierLoaded = true;
      this._stepTwo = true;
      this._showSupplierModal = false;
      this.hideAlert(true);
      this.hideAlertsCreated();

      if(isEdit){
        this.suppliersEditModal.closeModal();
        this._isLoading = false;
        this.showConfirmation('Se ha modificado con exito', true);
      } else{
        this.suppliersModal.closeModal();
        this._isLoading = false;
        //this.showConfirmation('Se ha ingresado con exito', true);
      }

      setTimeout( () => { this.hideConfirmation(true); }, 5000);
    }
  }

  mapModalClient(newSupplier: ProductSupplier){
    this._newSupplier.name = newSupplier.name;
    this._newSupplier.rut = newSupplier.rut;
    this._newSupplier.description = newSupplier.description;
    this._newSupplier.phoneNumber = newSupplier.phoneNumber;
    this._newSupplier.secondaryPhoneNumber = newSupplier.secondaryPhoneNumber;
    this._newSupplier.seller = newSupplier.seller;
    this._newSupplier.contactName = newSupplier.contactName;
    this._newSupplier.visitDays = newSupplier.visitDays;
    this._newSupplier.interval = newSupplier.interval;
  }

  openProductsModal() {
    this.productsModal.openModal();
  }

  handleCreateProduct(newProduct: Product) {
    this.handleModalProductEvent(newProduct, false);
  }

  editProduct(index: number) {
    this._isEditingProduct = true;
    this._productToEdit = this.mapModalProductToEdit(index);
    this.productsEditModal.openModal();
  }

  mapModalProductToEdit(index: number) : Product{
    var selected = this._newSupplierProducts[index];
    var productToEdit = new Product();

    productToEdit.name = selected.name;
    productToEdit.description = selected.description;
    productToEdit.barCode = selected.barCode;
    productToEdit.amountDaysPreviousNotification = selected.amountDaysPreviousNotification;

    this._indexProductEdit = index;

    return productToEdit;
  }

  removeProduct(index: number) {
    this._isEditingProduct = true;
    this._isLoading = true;

    this._newSupplierProducts.splice(index, 1);

    if(this._newSupplierProducts.length == 0){
      this._productLoaded = false;
    }

    this._isLoading = false;
    this._isEditing = false;
  }

  handleEditProduct(editedProduct: Product) {
    this.handleModalProductEvent(editedProduct, true);
  }

  handleModalProductEvent(product: Product, isEdit: boolean){
    this.hideConfirmation(false);
    this.hideAlert(false);
    this.hideAlertsCreated();

    if (product) {
      this._isLoading = true;
      this._productLoaded = true;
      this._stepThree = true;
      var exists = this.validateProductEntry(product, isEdit);

      if(isEdit){
        if(!exists){
          this.mapModalProductEdit(product);
          //this.showConfirmation('Se ha modificado con exito', false);
        }
        this.productsEditModal.closeModal();
      } else{
        if(!exists){
          this.mapModalProductCreate(product);
          //this.showConfirmation('Se ha ingresado con exito', false);
        }

        this.productsModal.closeModal();
      }

      this._isLoading = false;
      setTimeout( () => { this.hideConfirmation(false); }, 5000);

      if(!exists){

      }
    }
  }

  validateProductEntry(product: Product, isEdit: boolean): boolean {
    let exists: boolean = false;

    if(this._newSupplierProducts.length == 0){
      return exists;
    }

    if(isEdit){
      var products = this._newSupplierProducts;
      let index = 0;

      products.forEach(p => {
        if (exists) return;
        exists = p.barCode.replace(/\s/g, "") == product.barCode.replace(/\s/g, "") && index != this._indexProductEdit;
        index++;
      })
    }

    if(!isEdit){
      var products = this._newSupplierProducts;
      exists = products.find(p => p.barCode.replace(/\s/g, "") == product.barCode.replace(/\s/g, "")) != null;
    }

    if(exists){
      this.showAlert('Codigo de Barras existente', false)
    }

    return exists;
  }

  mapModalProductCreate(newProduct: Product){
    var product = new Product();

    product.name = newProduct.name;
    product.description = newProduct.description;
    product.barCode = newProduct.barCode;
    product.amountDaysPreviousNotification = newProduct.amountDaysPreviousNotification;

    this._newSupplierProducts.push(product);
  }

  mapModalProductEdit(newProduct: Product,){
    var product = this._newSupplierProducts[this._indexProductEdit];

    product.name = newProduct.name;
    product.description = newProduct.description;
    product.barCode = newProduct.barCode;
    product.amountDaysPreviousNotification = newProduct.amountDaysPreviousNotification;
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

      this.createFullSupplier();
    }
  }

  createFullSupplier() {
    if (this._newSupplier) {
      this.supplierService.createSupplier(this._newSupplier).subscribe(
        (response: ProductSupplier) => {

          if(this._wantToCreateProducts) {
            if(this._newSupplierProducts && this._newSupplierProducts.length > 0) {

              // let productGenerator = new ProductGenerator();
              // productGenerator.supplier = response;
              // productGenerator.products = this._newProducts;

              // this.productsService.generateProducts(productGenerator).subscribe(
              //   (response: ProductGenerator) => {
              //     this._isLoading = false;
              //     this._disableAllButtons = true;
              //     this.showConfirmationCreated("Cliente generado exitosamente. Sera redirigido a la seccion anterior.");
              //     this.goToSuppliersMainPage();
              //   }, (errProduct) => {
              //     this._isLoading = false;
              //     this.showAlertCreated(errProduct.error);
              //   });
            }
          }
          else{
            this._isLoading = false;
            this._disableAllButtons = true;
            this.showConfirmationCreated("Cliente generado exitosamente. Sera redirigido a la seccion anterior.");
            this.goToSuppliersMainPage();
          }

      }, (err) => {
        this.showAlertCreated(err.error);
        this._isLoading = false;
      });
    }
  }

  goToSuppliersMainPage(){
    setTimeout( () => { this.router.navigate( ['administration/suppliers']);}, 3000);
  }

  showConfirmationCreated(message: string){
    this.messageError = message;
    this.showingCreateSupplierConfirmationPanel = true;
  }

  showAlertCreated(message: string){
    this.messageError = message;
    this.showingCreateSupplierAlert = true;
  }

  hideAlertsCreated(){
    this.showingCreateSupplierConfirmationPanel = false;
    this.showingCreateSupplierAlert = false;
  }


  showAlert(message: string, isSupplier: boolean) {
    this.messageError = message;

    if(isSupplier) {
      this.showingCreateSupplierStep1ConfirmationPanel = true;
    }
    else{
      this.showingCreateProductAlert = true;
    }
  }

  showConfirmation(message: string, isSupplier: boolean) {
    this.messageError = message;
    if(isSupplier) {
      this.showingCreateSupplierStep1ConfirmationPanel = true;
    }
    else{
      this.showingCreateProductConfirmationPanel = true;
    }
  }

  hideAlert(isSupplier: boolean){
    if(isSupplier) {
      this.showingCreateSupplierStep1Alert = false;
    }
    else{
      this.showingCreateProductAlert = false;
    }
  }

  hideConfirmation(isSupplier: boolean){
    if(isSupplier) {
      this.showingCreateSupplierStep1ConfirmationPanel = false;
    }
    else{
      this.showingCreateProductConfirmationPanel = false;
    }
  }

  wantToCreateProducts(){
    this._wantToCreateProducts = true;
  }
}
