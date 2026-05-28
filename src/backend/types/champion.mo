module {
  public type ChampionCode = {
    id : Nat;
    championId : Nat;
    referralCode : Text;
    qrCodeId : Text;
    qrCodeImageUrl : ?Text;
    timesUsedForHotelOrders : Nat;
    timesUsedForChampionReferrals : Nat;
    isActive : Bool;
    createdAt : Int;
  };
};
