import Map "mo:core/Map";

module {
  public type UserId = Nat;
  public type Timestamp = Int;

  // Result alias for convenience
  public type Result<T, E> = { #ok : T; #err : E };

  // Shared impact stats returned by the impact dashboard endpoint
  public type ImpactStats = {
    championsEmpowered : Nat;
    totalCommunityEarningsKhr : Nat;
    localValueCirculatedKhr : Nat;
  };
};
