import List "mo:core/List";
import OrderTypes "../types/order";
import CommonTypes "../types/common";
import Time "mo:core/Time";
import Float "mo:core/Float";

module {
  public type Order = OrderTypes.Order;
  public type OrderItem = OrderTypes.OrderItem;
  public type OrderInput = OrderTypes.OrderInput;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  public func create(
    orders : List.List<Order>,
    orderItems : List.List<OrderItem>,
    state : { var nextOrderId : Nat; var nextOrderItemId : Nat },
    input : OrderInput,
  ) : Result<Nat, Text> {
    if (input.items.size() == 0) { return #err "Order must have at least one item" };
    let orderId = state.nextOrderId;
    state.nextOrderId += 1;
    var totalKhr : Nat = 0;
    var totalUsd : Float = 0.0;
    let now = Time.now();
    for (item in input.items.vals()) {
      let itemId = state.nextOrderItemId;
      state.nextOrderItemId += 1;
      let commission = item.championCommissionKhr * item.quantity;
      let commissionUsd = item.championCommissionUsd * Float.fromInt(item.quantity);
      totalKhr += item.unitPriceKhr * item.quantity;
      totalUsd += item.unitPriceUsd * Float.fromInt(item.quantity);
      let orderItem : OrderItem = {
        id = itemId;
        orderId;
        productId = item.productId;
        quantity = item.quantity;
        unitPriceKhr = item.unitPriceKhr;
        unitPriceUsd = item.unitPriceUsd;
        championCommissionKhr = commission;
        championCommissionUsd = commissionUsd;
      };
      orderItems.add(orderItem);
    };
    let order : Order = {
      id = orderId;
      hotelId = input.hotelId;
      staffProxyId = input.staffProxyId;
      championId = input.championId;
      orderDate = now;
      totalAmountKhr = totalKhr;
      totalAmountUsd = totalUsd;
      khqrPaymentConfirmed = false;
      khqrReceiptHash = null;
      biweeklyPayoutProcessed = false;
      payoutCycleStartDate = input.payoutCycleStartDate;
      payoutCycleEndDate = input.payoutCycleEndDate;
      payoutProcessedDate = null;
      hotelSelectedChampionMethod = input.hotelSelectedChampionMethod;
      qrCodeUsed = input.qrCodeUsed;
      referralCodeUsed = input.referralCodeUsed;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(order);
    #ok orderId;
  };

  public func getByHotel(orders : List.List<Order>, hotelId : Nat) : [Order] {
    orders.filter(func(o) { o.hotelId == hotelId }).toArray();
  };

  public func getByChampion(orders : List.List<Order>, championId : Nat) : [Order] {
    orders.filter(func(o) { o.championId == championId }).toArray();
  };

  public func confirmPayment(orders : List.List<Order>, orderId : Nat) : Result<(), Text> {
    switch (orders.find(func(o) { o.id == orderId })) {
      case null { #err "Order not found" };
      case (?_) {
        orders.mapInPlace(
          func(o) {
            if (o.id == orderId) { { o with khqrPaymentConfirmed = true; updatedAt = Time.now() } }
            else { o };
          }
        );
        #ok ();
      };
    };
  };

  public func getItems(orderItems : List.List<OrderItem>, orderId : Nat) : [OrderItem] {
    orderItems.filter(func(i) { i.orderId == orderId }).toArray();
  };
};
