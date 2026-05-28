import List "mo:core/List";
import ProductLib "../lib/product";
import ProductTypes "../types/product";
import CommonTypes "../types/common";

mixin (
  products : List.List<ProductTypes.Product>,
  productState : { var nextProductId : Nat },
) {
  public func getProducts() : async [ProductTypes.Product] {
    ProductLib.getAll(products);
  };

  public func getActiveProducts() : async [ProductTypes.Product] {
    ProductLib.getActive(products);
  };

  public func addProduct(input : ProductTypes.ProductInput) : async CommonTypes.Result<Nat, Text> {
    ProductLib.add(products, productState, input);
  };
};
