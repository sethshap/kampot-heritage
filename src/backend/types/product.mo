import CommonTypes "common";

module {
  public type Product = {
    id : Nat;
    skuCode : Text;
    nameEn : Text;
    nameKm : Text;
    nameFr : Text;
    descriptionEn : ?Text;
    descriptionKm : ?Text;
    descriptionFr : ?Text;
    unitMeasurement : Text;
    unitSize : Float;
    baseCostKhr : Nat;
    wholesalePriceKhr : Nat;
    retailPriceKhr : Nat;
    referralPriceKhr : ?Nat;
    championCommissionKhr : Nat;
    wholesalePriceUsd : Float;
    retailPriceUsd : Float;
    referralPriceUsd : ?Float;
    championCommissionUsd : Float;
    commissionRatePercentage : Float;
    isActive : Bool;
    createdAt : Int;
    updatedAt : Int;
  };

  public type ProductInput = {
    skuCode : Text;
    nameEn : Text;
    nameKm : Text;
    nameFr : Text;
    descriptionEn : ?Text;
    descriptionKm : ?Text;
    descriptionFr : ?Text;
    unitMeasurement : Text;
    unitSize : Float;
    baseCostKhr : Nat;
    wholesalePriceKhr : Nat;
    retailPriceKhr : Nat;
    referralPriceKhr : ?Nat;
    championCommissionKhr : Nat;
    wholesalePriceUsd : Float;
    retailPriceUsd : Float;
    referralPriceUsd : ?Float;
    championCommissionUsd : Float;
    commissionRatePercentage : Float;
    isActive : Bool;
  };
};
