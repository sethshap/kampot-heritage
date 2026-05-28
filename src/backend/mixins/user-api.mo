import List "mo:core/List";
import Map "mo:core/Map";
import UserLib "../lib/user";
import UserTypes "../types/user";
import ChampionTypes "../types/champion";
import CommonTypes "../types/common";

mixin (
  users : List.List<UserTypes.User>,
  phoneIndex : Map.Map<Text, Nat>,
  championCodes : List.List<ChampionTypes.ChampionCode>,
  userState : { var nextUserId : Nat; var nextChampionCodeId : Nat },
) {
  public func registerUser(input : UserTypes.UserRegistrationInput) : async CommonTypes.Result<Nat, Text> {
    UserLib.register(users, phoneIndex, championCodes, userState, input);
  };

  public func getUserByPhone(phone : Text) : async ?UserTypes.User {
    UserLib.getByPhone(users, phone);
  };

  public func getUserById(id : Nat) : async ?UserTypes.User {
    UserLib.getById(users, id);
  };

  public func getPendingChampions() : async [UserTypes.User] {
    UserLib.getPending(users);
  };

  public func getApprovedChampions() : async [UserTypes.User] {
    UserLib.getApproved(users);
  };

  public shared ({ caller }) func approveChampion(userId : Nat, input : UserTypes.ApproveChampionInput) : async CommonTypes.Result<(), Text> {
    ignore caller;
    UserLib.approve(users, championCodes, userState, userId, 0, input);
  };

  public shared ({ caller }) func rejectChampion(userId : Nat, reason : Text) : async CommonTypes.Result<(), Text> {
    ignore caller;
    UserLib.reject(users, userId, 0, reason);
  };

  public func updateUser(userId : Nat, input : UserTypes.UserUpdateInput) : async CommonTypes.Result<(), Text> {
    UserLib.update(users, userId, input);
  };

  public shared ({ caller }) func getCallerPrincipal() : async Text {
    caller.toText();
  };
};
