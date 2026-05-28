module {
  public type ConsignmentStatus = { #out; #returned; #sold };

  public type ConsignmentCheckout = {
    id : Nat;
    championId : Nat;
    staffId : Nat;
    productId : Nat;
    quantity : Nat;
    status : ConsignmentStatus;
    checkedOutAt : Int;
    returnedAt : ?Int;
    notesEn : ?Text;
    notesKm : ?Text;
    notesFr : ?Text;
  };

  public type ConsignmentInput = {
    championId : Nat;
    staffId : Nat;
    productId : Nat;
    quantity : Nat;
    notesEn : ?Text;
    notesKm : ?Text;
    notesFr : ?Text;
  };
};
