import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Product, ProductDTO, ProductState, ProductStateModel } from './state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  product: ProductDTO = { id: -1, name: 'sample product 1' };
  private itemCount = 0;
  allProducts: ProductDTO[] = [];

  //#region Select State

  //#region Option 1,

  // Select whole State Slice from storage directly
  // @Select(ProductState) allProducts$: Observable<ProductStateModel> | undefined;

  //#endregion

  //#region Option 2,Use funtion

  // Select a state slice from storage directly and select specific slice
  //If no state selector is passed i.e ProductState,then it will return all states of Application
  // @Select((state: any) => state.product.allProducts) allProducts$:
  //    | Observable<ProductDTO[]>
  //    | undefined;

  //#endregion

  //#region Option 3,Use Selector

  // Select State Slice from Memoized Selectors
  @Select(ProductState.getAllProductsBySelector) allProducts$:
    | Observable<ProductDTO[]>
    | undefined;
  //#endregion

  //#endregion

  constructor(private store: Store) {}

  ngOnInit() {
    console.log('App Component initialized...');
  }

  //#region ADD PRODUCT

  addProduct() {
    this.product.id = -1;
    console.log('Add Product Button Clicked');
    this.store
      .dispatch(
        new Product.AddProduct({
          id: ++this.itemCount,
          name: this.product.name,
        })
      )
      .subscribe((updatedProductList) => {
        console.log('addProduct Subsciption result', updatedProductList);
       // this.allProducts = updatedProductList.product.allProducts;
         this.getAllProducts();
      });
  }
  //#endregion

  //#region UPDATE PRODUCT
  onUpdateProductClick(product: ProductDTO) {
    this.product = structuredClone(product);
  }

  updateProduct() {
    console.log('Update Product Button Clicked');
    this.store
      .dispatch(new Product.UpdateProduct(this.product))
      .subscribe((updatedProductList) => {
        console.log('updateProduct Subsciption result', updatedProductList);
        this.allProducts = updatedProductList.product.allProducts;
        //Reset Object
        this.product = {
          id: -1,
          name: 'sample product 1',
        };
      });
  }
  //#endregion

  //#region DELETE PRODUCT
  deleteProduct(product: ProductDTO) {
    console.log('Delete Product Button Clicked', product);
    this.store
      .dispatch(new Product.DeleteProduct(product.id))
      .subscribe((updatedProductList) => {
        console.log('deleteProduct Subsciption result', updatedProductList);
        this.allProducts = updatedProductList.product.allProducts;
      });
  }
  //#endregion

  //#region  GET All Products
  getAllProducts() {
    this.store.dispatch(new Product.GetAllProduct()).subscribe(
      //NOTE: The Subscription of all store dispatch event will ALWAYS return all/whole state(s) of application,though specific data / state OR no data is returned in event handler
      (allProducts) => {
        console.log('getAllProducts subsciption result', allProducts);
        this.allProducts = allProducts.product.allProducts;
      }
    );
  }
  //#endregion
}
