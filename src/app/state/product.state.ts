import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ProductDTO } from './product.model';
import { Product } from './product.action';

export interface ProductStateModel {
  allProducts: Array<ProductDTO>;
}

@State<ProductStateModel>({
  name: 'product',
  defaults: { allProducts: [] },
})
export class ProductState {
  //#region ADD Product
  @Action(Product.AddProduct)
  addProduct(
    ctx: StateContext<ProductStateModel>,
    { payload }: Product.AddProduct
  ) {
    const state = ctx.getState();
    console.log('Add Product action Handler...');
    console.log('Current state', state);
    console.log('New Add Product action data', payload);

    //setState: Reset the state to a new value.
    //patchState: Patch the existing state with the provided value.

    ctx.setState({
      allProducts: [
        ...state.allProducts,
        { id: payload.id, name: payload.name },
      ],
    });
    console.log('Product Successfully Added');
  }
  //#endregion

  //#region UPDATE Product
  @Action(Product.UpdateProduct)
  updateProduct(
    ctx: StateContext<ProductStateModel>,
    action: Product.UpdateProduct
  ) {
    const state = ctx.getState();
    console.log('Update Product action Handler...');
    console.log('Current state', state);
    console.log('New Update Product action data', action);

    const allProducts = [...state.allProducts];
    const idOfProduct = allProducts.findIndex(
      (p) => p.id === action.payload.id
    );
    allProducts[idOfProduct] = action.payload;
    ctx.setState({
      ...state,
      allProducts: allProducts,
    });
    console.log('Product Successfully Updated');
  }
  //#endregion

  //#region DELETE Product
  @Action(Product.DeleteProduct)
  deleteProduct(
    ctx: StateContext<ProductStateModel>,
    { id }: Product.DeleteProduct
  ) {
    const currentState = ctx.getState();
    console.log('Delete Product action Handler...');
    console.log('Current state', currentState);
    console.log('New Delete Product action data', id);

    ctx.setState({
      ...ctx.getState(),
      allProducts: currentState.allProducts.filter((t) => t.id != id),
    });
    console.log('Product Successfully Deleted');
  }
  //#endregion

  //#region GET All Products
  @Action(Product.GetAllProduct)
  getAllProductsByAction(ctx: StateContext<ProductStateModel>) {
    // return ctx.getState().allProducts; //No Data Retuned,Still Subscription will have whole state of Application
    // return [];
  }

  //Memoized Selectors
  @Selector() //Selectors are calculated when state changes
  static getAllProductsBySelector(state: ProductStateModel) {
    console.log('Selector response:', state);
    // return state.allProducts;
     return state.allProducts.filter((t) => t.name.includes('test'));
  }
  //#endregion
}
