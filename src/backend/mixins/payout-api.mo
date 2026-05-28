import List "mo:core/List";
import PayoutLib "../lib/payout";
import PayoutTypes "../types/payout";
import OrderTypes "../types/order";
import CommonTypes "../types/common";

mixin (
  payouts : List.List<PayoutTypes.PayoutLedger>,
  orders : List.List<OrderTypes.Order>,
  orderItems : List.List<OrderTypes.OrderItem>,
  payoutState : { var nextPayoutId : Nat },
) {
  public func getPendingPayouts() : async [PayoutTypes.PayoutLedger] {
    PayoutLib.getPending(payouts);
  };

  public shared ({ caller }) func markPayoutProcessed(payoutId : Nat, staffId : Nat) : async CommonTypes.Result<(), Text> {
    ignore caller;
    PayoutLib.markProcessed(payouts, payoutId, staffId);
  };

  public func generatePayoutLedger(cycleStart : Text, cycleEnd : Text) : async CommonTypes.Result<(), Text> {
    PayoutLib.generate(payouts, orders, orderItems, payoutState, cycleStart, cycleEnd);
  };
};
