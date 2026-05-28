import List "mo:core/List";
import MetricsLib "../lib/metrics";
import MetricsTypes "../types/metrics";
import OrderTypes "../types/order";

mixin (
  orders : List.List<OrderTypes.Order>,
  orderItems : List.List<OrderTypes.OrderItem>,
) {
  public query func getChampionMetrics(championId : Nat) : async MetricsTypes.ChampionMetrics {
    MetricsLib.forChampion(orders, orderItems, championId);
  };

  public query func getAllChampionMetrics() : async [MetricsTypes.ChampionMetrics] {
    MetricsLib.forAll(orders, orderItems);
  };
};
