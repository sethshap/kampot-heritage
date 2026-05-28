import List "mo:core/List";
import Map "mo:core/Map";
import ChampionLib "../lib/champion";
import ChampionTypes "../types/champion";
import CommonTypes "../types/common";

mixin (
  championCodes : List.List<ChampionTypes.ChampionCode>,
  qrIndex : Map.Map<Text, Nat>,
) {
  public func getChampionCodes(championId : Nat) : async [ChampionTypes.ChampionCode] {
    ChampionLib.getCodes(championCodes, championId);
  };

  public func validateReferralCode(code : Text) : async ?ChampionTypes.ChampionCode {
    ChampionLib.validateReferralCode(championCodes, code);
  };

  public func regenerateChampionQR(championId : Nat) : async CommonTypes.Result<Text, Text> {
    ChampionLib.regenerateQR(championCodes, qrIndex, championId);
  };
};
