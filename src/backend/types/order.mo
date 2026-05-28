module {
  public type ChampionSelectionMethod = {
    #qr_scan;
    #remembered;
    #browsed_list;
    #staff_assigned;
  };

  public type Order = {
    id : Nat;
    hotelId : Nat;
    staffProxyId : ?Nat;
    championId : Nat;
    orderDate : Int;
    totalAmountKhr : Nat;
    totalAmountUsd : Float;
    khqrPaymentConfirmed : Bool;
    khqrReceiptHash : ?Text;
    biweeklyPayoutProcessed : Bool;
    payoutCycleStartDate : Text;
    payoutCycleEndDate : Text;
    payoutProcessedDate : ?Text;
    hotelSelectedChampionMethod : ChampionSelectionMethod;
    qrCodeUsed : ?Text;
    referralCodeUsed : ?Text;
    createdAt : Int;
    updatedAt : Int;
  };

  public type OrderItem = {
    id : Nat;
    orderId : Nat;
    productId : Nat;
    quantity : Nat;
    unitPriceKhr : Nat;
    unitPriceUsd : Float;
    championCommissionKhr : Nat;
    championCommissionUsd : Float;
  };

  public type OrderItemInput = {
    productId : Nat;
    quantity : Nat;
    unitPriceKhr : Nat;
    unitPriceUsd : Float;
    championCommissionKhr : Nat;
    championCommissionUsd : Float;
  };

  public type OrderInput = {
    hotelId : Nat;
    staffProxyId : ?Nat;
    championId : Nat;
    payoutCycleStartDate : Text;
    payoutCycleEndDate : Text;
    hotelSelectedChampionMethod : ChampionSelectionMethod;
    qrCodeUsed : ?Text;
    referralCodeUsed : ?Text;
    items : [OrderItemInput];
  };
};
