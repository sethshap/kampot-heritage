import List "mo:core/List";
import ImpactLib "../lib/impact";
import UserTypes "../types/user";
import OrderTypes "../types/order";
import ProductTypes "../types/product";
import CommonTypes "../types/common";

mixin (
  users : List.List<UserTypes.User>,
  orders : List.List<OrderTypes.Order>,
  orderItems : List.List<OrderTypes.OrderItem>,
  products : List.List<ProductTypes.Product>,
) {
  public func getImpactStats() : async CommonTypes.ImpactStats {
    ImpactLib.getStats(users, orders, orderItems, products);
  };
};
