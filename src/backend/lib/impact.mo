import List "mo:core/List";
import UserTypes "../types/user";
import OrderTypes "../types/order";
import ProductTypes "../types/product";
import CommonTypes "../types/common";
import Set "mo:core/Set";

module {
  public type ImpactStats = CommonTypes.ImpactStats;

  public func getStats(
    users : List.List<UserTypes.User>,
    orders : List.List<OrderTypes.Order>,
    orderItems : List.List<OrderTypes.OrderItem>,
    products : List.List<ProductTypes.Product>,
  ) : ImpactStats {
    // Count distinct championIds that have orders
    let champSet = Set.empty<Nat>();
    var totalEarningsKhr : Nat = 0;
    var totalOrdersKhr : Nat = 0;
    for (order in orders.values()) {
      champSet.add(order.championId);
      totalOrdersKhr += order.totalAmountKhr;
    };
    for (item in orderItems.values()) {
      totalEarningsKhr += item.championCommissionKhr;
    };
    // localValueCirculated = sum(order total) - sum(base_cost * quantity)
    var totalBaseCost : Nat = 0;
    for (item in orderItems.values()) {
      switch (products.find(func(p) { p.id == item.productId })) {
        case (?product) { totalBaseCost += product.baseCostKhr * item.quantity };
        case null {};
      };
    };
    let localValueCirculatedKhr = if (totalOrdersKhr >= totalBaseCost) { totalOrdersKhr - totalBaseCost } else { 0 };
    ignore users;
    {
      championsEmpowered = champSet.size();
      totalCommunityEarningsKhr = totalEarningsKhr;
      localValueCirculatedKhr;
    };
  };
};
