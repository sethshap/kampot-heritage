import List "mo:core/List";
import ProductTypes "../types/product";
import CommonTypes "../types/common";
import Time "mo:core/Time";

module {
  public type Product = ProductTypes.Product;
  public type ProductInput = ProductTypes.ProductInput;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  public func getAll(products : List.List<Product>) : [Product] {
    products.toArray();
  };

  public func getActive(products : List.List<Product>) : [Product] {
    products.filter(func(p) { p.isActive }).toArray();
  };

  public func add(
    products : List.List<Product>,
    state : { var nextProductId : Nat },
    input : ProductInput,
  ) : Result<Nat, Text> {
    let id = state.nextProductId;
    state.nextProductId += 1;
    let now = Time.now();
    let product : Product = {
      id;
      skuCode = input.skuCode;
      nameEn = input.nameEn;
      nameKm = input.nameKm;
      nameFr = input.nameFr;
      descriptionEn = input.descriptionEn;
      descriptionKm = input.descriptionKm;
      descriptionFr = input.descriptionFr;
      unitMeasurement = input.unitMeasurement;
      unitSize = input.unitSize;
      baseCostKhr = input.baseCostKhr;
      wholesalePriceKhr = input.wholesalePriceKhr;
      retailPriceKhr = input.retailPriceKhr;
      referralPriceKhr = input.referralPriceKhr;
      championCommissionKhr = input.championCommissionKhr;
      wholesalePriceUsd = input.wholesalePriceUsd;
      retailPriceUsd = input.retailPriceUsd;
      referralPriceUsd = input.referralPriceUsd;
      championCommissionUsd = input.championCommissionUsd;
      commissionRatePercentage = input.commissionRatePercentage;
      isActive = input.isActive;
      createdAt = now;
      updatedAt = now;
    };
    products.add(product);
    #ok id;
  };
};
