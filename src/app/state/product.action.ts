import { ProductDTO } from './product.model';

export namespace Product {
  export class GetAllProduct {
    static readonly type = '[Product] Get All Product';
  }

  export class AddProduct {
    static readonly type = '[Product] Add Product';
    constructor(public payload: ProductDTO) {} //Make sure all Parameters are PUBLIC,else in Action handler it can't be accessed
  }

  export class UpdateProduct {
    static readonly type = '[Product] Update Product';
    constructor(public payload: ProductDTO) {}
  }

  export class DeleteProduct {
    static readonly type = '[Product] Delete Product';
    constructor(public id: number) {}
  }
}
