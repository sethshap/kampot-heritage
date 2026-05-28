import List "mo:core/List";
import PayoutTypes "../types/payout";
import OrderTypes "../types/order";
import CommonTypes "../types/common";
import Time "mo:core/Time";
import Map "mo:core/Map";

module {
  public type PayoutLedger = PayoutTypes.PayoutLedger;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  public func getPending(payouts : List.List<PayoutLedger>) : [PayoutLedger] {
    payouts.filter(func(p) { p.payoutStatus == #pending }).toArray();
  };

  public func markProcessed(
    payouts : List.List<PayoutLedger>,
    payoutId : Nat,
    staffId : Nat,
  ) : Result<(), Text> {
    switch (payouts.find(func(p) { p.id == payoutId })) {
      case null { #err "Payout not found" };
      case (?_) {
        payouts.mapInPlace(
          func(p) {
            if (p.id == payoutId) {
              { p with payoutStatus = #processed; processedByStaffId = ?staffId; processedAt = ?Time.now() };
            } else { p };
          }
        );
        #ok ();
      };
    };
  };

  public func generate(
    payouts : List.List<PayoutLedger>,
    orders : List.List<OrderTypes.Order>,
    orderItems : List.List<OrderTypes.OrderItem>,
    state : { var nextPayoutId : Nat },
    cycleStart : Text,
    cycleEnd : Text,
  ) : Result<(), Text> {
    // Aggregate commissions per champion for orders in the cycle
    let champMap = Map.empty<Nat, { var khr : Nat; var usd : Float; var count : Nat }>();
    for (order in orders.values()) {
      if (order.payoutCycleStartDate == cycleStart and order.payoutCycleEndDate == cycleEnd and not order.biweeklyPayoutProcessed) {
        let championId = order.championId;
        let entry = switch (champMap.get(championId)) {
          case (?e) { e };
          case null {
            let e = { var khr = 0; var usd : Float = 0.0; var count = 0 };
            champMap.add(championId, e);
            e;
          };
        };
        entry.count += 1;
        for (item in orderItems.filter(func(i) { i.orderId == order.id }).values()) {
          entry.khr += item.championCommissionKhr;
          entry.usd += item.championCommissionUsd;
        };
      };
    };
    let now = Time.now();
    for ((championId, agg) in champMap.entries()) {
      let id = state.nextPayoutId;
      state.nextPayoutId += 1;
      let payout : PayoutLedger = {
        id;
        championId;
        payoutCycleStart = cycleStart;
        payoutCycleEnd = cycleEnd;
        totalCommissionKhr = agg.khr;
        totalCommissionUsd = agg.usd;
        totalOrdersCount = agg.count;
        payoutStatus = #pending;
        payoutMethod = #cash;
        notesEn = null;
        notesKm = null;
        notesFr = null;
        processedByStaffId = null;
        processedAt = null;
        createdAt = now;
      };
      payouts.add(payout);
    };
    #ok ();
  };
};
