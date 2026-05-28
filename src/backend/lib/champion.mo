import List "mo:core/List";
import Map "mo:core/Map";
import ChampionTypes "../types/champion";
import CommonTypes "../types/common";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";

module {
  public type ChampionCode = ChampionTypes.ChampionCode;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  public func getCodes(championCodes : List.List<ChampionCode>, championId : Nat) : [ChampionCode] {
    championCodes.filter(func(c) { c.championId == championId }).toArray();
  };

  public func validateReferralCode(championCodes : List.List<ChampionCode>, code : Text) : ?ChampionCode {
    championCodes.find(func(c) { c.referralCode == code and c.isActive });
  };

  public func regenerateQR(
    championCodes : List.List<ChampionCode>,
    qrIndex : Map.Map<Text, Nat>,
    championId : Nat,
  ) : Result<Text, Text> {
    // Find existing active code for this champion
    switch (championCodes.find(func(c) { c.championId == championId and c.isActive })) {
      case null { #err "No active champion code found" };
      case (?code) {
        let newQrId = "KH-CHAMPION-" # Time.now().toText() # "-" # Int.abs(Time.now() % 1000000).toText();
        // Remove old qr from index
        qrIndex.remove(code.qrCodeId);
        // Update the code record in place
        championCodes.mapInPlace(
          func(c) {
            if (c.id == code.id) {
              { c with qrCodeId = newQrId; qrCodeImageUrl = null };
            } else { c };
          }
        );
        qrIndex.add(newQrId, code.id);
        #ok newQrId;
      };
    };
  };
};
