import List "mo:core/List";
import ConsignmentLib "../lib/consignment";
import ConsignmentTypes "../types/consignment";
import CommonTypes "../types/common";

mixin (
  checkouts : List.List<ConsignmentTypes.ConsignmentCheckout>,
  consignmentState : { var nextConsignmentId : Nat },
) {
  public func checkoutConsignment(input : ConsignmentTypes.ConsignmentInput) : async CommonTypes.Result<Nat, Text> {
    ConsignmentLib.checkout(checkouts, consignmentState, input);
  };

  public func getConsignmentByChampion(championId : Nat) : async [ConsignmentTypes.ConsignmentCheckout] {
    ConsignmentLib.getByChampion(checkouts, championId);
  };
};
