import List "mo:core/List";
import Set "mo:core/Set";
import OrderTypes "../types/order";
import MetricsTypes "../types/metrics";

module {
  public type ChampionMetrics = MetricsTypes.ChampionMetrics;

  public func forChampion(
    orders : List.List<OrderTypes.Order>,
    orderItems : List.List<OrderTypes.OrderItem>,
    championId : Nat,
  ) : ChampionMetrics {
    let sponsorSet = Set.empty<Nat>();
    var bottlesSold : Nat = 0;
    var totalEarningsKhr : Nat = 0;
    var totalEarningsUsd : Float = 0.0;
    var orderCount : Nat = 0;

    for (order in orders.values()) {
      if (order.championId == championId) {
        sponsorSet.add(order.hotelId);
        orderCount += 1;
        for (item in orderItems.values()) {
          if (item.orderId == order.id) {
            bottlesSold += item.quantity;
            totalEarningsKhr += item.championCommissionKhr;
            totalEarningsUsd += item.championCommissionUsd;
          };
        };
      };
    };

    {
      championId;
      sponsorCount = sponsorSet.size();
      bottlesSold;
      totalEarningsKhr;
      totalEarningsUsd;
      orderCount;
    };
  };

  public func forAll(
    orders : List.List<OrderTypes.Order>,
    orderItems : List.List<OrderTypes.OrderItem>,
  ) : [ChampionMetrics] {
    // Collect distinct champion IDs from orders
    let champSet = Set.empty<Nat>();
    for (order in orders.values()) {
      champSet.add(order.championId);
    };
    champSet.toArray().map<Nat, ChampionMetrics>(
      func(championId) {
        forChampion(orders, orderItems, championId);
      }
    );
  };
};
