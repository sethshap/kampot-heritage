import List "mo:core/List";
import ConsignmentTypes "../types/consignment";
import CommonTypes "../types/common";
import Time "mo:core/Time";

module {
  public type ConsignmentCheckout = ConsignmentTypes.ConsignmentCheckout;
  public type ConsignmentInput = ConsignmentTypes.ConsignmentInput;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  public func checkout(
    checkouts : List.List<ConsignmentCheckout>,
    state : { var nextConsignmentId : Nat },
    input : ConsignmentInput,
  ) : Result<Nat, Text> {
    if (input.quantity == 0) { return #err "Quantity must be greater than zero" };
    let id = state.nextConsignmentId;
    state.nextConsignmentId += 1;
    let record : ConsignmentCheckout = {
      id;
      championId = input.championId;
      staffId = input.staffId;
      productId = input.productId;
      quantity = input.quantity;
      status = #out;
      checkedOutAt = Time.now();
      returnedAt = null;
      notesEn = input.notesEn;
      notesKm = input.notesKm;
      notesFr = input.notesFr;
    };
    checkouts.add(record);
    #ok id;
  };

  public func getByChampion(checkouts : List.List<ConsignmentCheckout>, championId : Nat) : [ConsignmentCheckout] {
    checkouts.filter(func(c) { c.championId == championId }).toArray();
  };
};
