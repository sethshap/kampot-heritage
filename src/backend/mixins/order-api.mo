import List "mo:core/List";
import OrderLib "../lib/order";
import OrderTypes "../types/order";
import CommonTypes "../types/common";

mixin (
  orders : List.List<OrderTypes.Order>,
  orderItems : List.List<OrderTypes.OrderItem>,
  orderState : { var nextOrderId : Nat; var nextOrderItemId : Nat },
) {
  public func createOrder(input : OrderTypes.OrderInput) : async CommonTypes.Result<Nat, Text> {
    OrderLib.create(orders, orderItems, orderState, input);
  };

  public func getOrdersByHotel(hotelId : Nat) : async [OrderTypes.Order] {
    OrderLib.getByHotel(orders, hotelId);
  };

  public func getOrdersByChampion(championId : Nat) : async [OrderTypes.Order] {
    OrderLib.getByChampion(orders, championId);
  };

  public func confirmPayment(orderId : Nat) : async CommonTypes.Result<(), Text> {
    OrderLib.confirmPayment(orders, orderId);
  };

  public func getOrderItems(orderId : Nat) : async [OrderTypes.OrderItem] {
    OrderLib.getItems(orderItems, orderId);
  };
};
