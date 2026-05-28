module {
  public type PayoutStatus = { #pending; #processed; #failed };
  public type PayoutMethod = { #cash; #bank_transfer; #wing };

  public type PayoutLedger = {
    id : Nat;
    championId : Nat;
    payoutCycleStart : Text;
    payoutCycleEnd : Text;
    totalCommissionKhr : Nat;
    totalCommissionUsd : Float;
    totalOrdersCount : Nat;
    payoutStatus : PayoutStatus;
    payoutMethod : PayoutMethod;
    notesEn : ?Text;
    notesKm : ?Text;
    notesFr : ?Text;
    processedByStaffId : ?Nat;
    processedAt : ?Int;
    createdAt : Int;
  };
};
