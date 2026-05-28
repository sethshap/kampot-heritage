import List "mo:core/List";
import Map "mo:core/Map";
import UserTypes "../types/user";
import ChampionTypes "../types/champion";
import CommonTypes "../types/common";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

module {
  public type User = UserTypes.User;
  public type UserRegistrationInput = UserTypes.UserRegistrationInput;
  public type ApproveChampionInput = UserTypes.ApproveChampionInput;
  public type UserUpdateInput = UserTypes.UserUpdateInput;
  public type ChampionCode = ChampionTypes.ChampionCode;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  public func register(
    users : List.List<User>,
    phoneIndex : Map.Map<Text, Nat>,
    championCodes : List.List<ChampionCode>,
    state : { var nextUserId : Nat },
    input : UserRegistrationInput,
  ) : Result<Nat, Text> {
    // Validate phone uniqueness
    switch (phoneIndex.get(input.phoneNumber)) {
      case (?_) { return #err "Phone number already registered" };
      case null {};
    };
    // Validate referral code if provided
    var referredById : ?Nat = null;
    var referredByCode : ?Text = null;
    switch (input.referredByCode) {
      case (?code) {
        switch (championCodes.find(func(c) { c.referralCode == code and c.isActive })) {
          case null { return #err "Invalid referral code" };
          case (?cc) {
            referredById := ?cc.championId;
            referredByCode := ?code;
          };
        };
      };
      case null {};
    };
    let id = state.nextUserId;
    state.nextUserId += 1;
    let now = Time.now();
    let onboardingStatus : UserTypes.OnboardingStatus = switch (input.role) {
      case (#champion) { #pending };
      case (_) { #approved };
    };
    let user : User = {
      id;
      role = input.role;
      fullNameEn = input.fullNameEn;
      fullNameKm = input.fullNameKm;
      fullNameFr = input.fullNameFr;
      phoneNumber = input.phoneNumber;
      avatarUrl = input.avatarUrl;
      bioEn = input.bioEn;
      bioKm = input.bioKm;
      bioFr = input.bioFr;
      referredById;
      referredByCode;
      physicalQrCodeId = null;
      personalReferralCode = null;
      referralCodeActivatedAt = null;
      qrCodeActivatedAt = null;
      consignmentInventoryHeld = 0;
      targetMonthlyIncomeKhr = 600000;
      targetMonthlyIncomeUsd = 150;
      onboardingStatus;
      onboardingNotesEn = null;
      onboardingNotesKm = null;
      onboardingNotesFr = null;
      approvedByStaffId = null;
      approvedAt = null;
      hasPaidForward = false;
      preferredLanguage = input.preferredLanguage;
      isActive = true;
      createdAt = now;
      updatedAt = now;
    };
    users.add(user);
    phoneIndex.add(input.phoneNumber, id);
    #ok id;
  };

  public func getByPhone(users : List.List<User>, phone : Text) : ?User {
    users.find(func(u) { u.phoneNumber == phone });
  };

  public func getById(users : List.List<User>, id : Nat) : ?User {
    users.find(func(u) { u.id == id });
  };

  public func getPending(users : List.List<User>) : [User] {
    users.filter(func(u) { u.role == #champion and u.onboardingStatus == #pending }).toArray();
  };

  public func getApproved(users : List.List<User>) : [User] {
    users.filter(func(u) { u.role == #champion and u.onboardingStatus == #approved and u.isActive }).toArray();
  };

  public func approve(
    users : List.List<User>,
    championCodes : List.List<ChampionCode>,
    state : { var nextChampionCodeId : Nat },
    userId : Nat,
    staffId : Nat,
    input : ApproveChampionInput,
  ) : Result<(), Text> {
    switch (users.find(func(u) { u.id == userId })) {
      case null { #err "User not found" };
      case (?user) {
        // Generate unique codes
        let now = Time.now();
        let hash = (userId * 31337 + Int.abs(now % 1000000).toNat()) % 1000000;
        let qrCodeId = "KH-CHAMPION-" # now.toText() # "-" # hash.toText();
        // Get first name from fullNameEn
        let firstName = switch (user.fullNameEn.split(#char ' ').next()) {
          case (?fn) { fn };
          case null { user.fullNameEn };
        };
        let refHash = (userId * 7919 + Int.abs(now % 10000).toNat()) % 10000;
        let referralCode = "CHAMP-" # firstName # "-" # refHash.toText();
        // Insert champion code record
        let codeId = state.nextChampionCodeId;
        state.nextChampionCodeId += 1;
        let code : ChampionCode = {
          id = codeId;
          championId = userId;
          referralCode;
          qrCodeId;
          qrCodeImageUrl = input.qrCodeImageUrl;
          timesUsedForHotelOrders = 0;
          timesUsedForChampionReferrals = 0;
          isActive = true;
          createdAt = now;
        };
        championCodes.add(code);
        // Update user
        users.mapInPlace(
          func(u) {
            if (u.id == userId) {
              { u with
                onboardingStatus = #approved;
                physicalQrCodeId = ?qrCodeId;
                personalReferralCode = ?referralCode;
                qrCodeActivatedAt = ?now;
                referralCodeActivatedAt = ?now;
                approvedByStaffId = ?staffId;
                approvedAt = ?now;
                onboardingNotesEn = input.notesEn;
                onboardingNotesKm = input.notesKm;
                onboardingNotesFr = input.notesFr;
                updatedAt = now;
              };
            } else { u };
          }
        );
        #ok ();
      };
    };
  };

  public func reject(
    users : List.List<User>,
    userId : Nat,
    staffId : Nat,
    reason : Text,
  ) : Result<(), Text> {
    ignore staffId;
    switch (users.find(func(u) { u.id == userId })) {
      case null { #err "User not found" };
      case (?_) {
        let now = Time.now();
        users.mapInPlace(
          func(u) {
            if (u.id == userId) {
              { u with onboardingStatus = #rejected; onboardingNotesEn = ?reason; updatedAt = now };
            } else { u };
          }
        );
        #ok ();
      };
    };
  };

  public func update(
    users : List.List<User>,
    userId : Nat,
    input : UserUpdateInput,
  ) : Result<(), Text> {
    switch (users.find(func(u) { u.id == userId })) {
      case null { #err "User not found" };
      case (?_) {
        let now = Time.now();
        users.mapInPlace(
          func(u) {
            if (u.id == userId) {
              {
                u with
                fullNameEn = switch (input.fullNameEn) { case (?v) { v }; case null { u.fullNameEn } };
                fullNameKm = switch (input.fullNameKm) { case (?v) { ?v }; case null { u.fullNameKm } };
                fullNameFr = switch (input.fullNameFr) { case (?v) { ?v }; case null { u.fullNameFr } };
                avatarUrl = switch (input.avatarUrl) { case (?v) { ?v }; case null { u.avatarUrl } };
                bioEn = switch (input.bioEn) { case (?v) { ?v }; case null { u.bioEn } };
                bioKm = switch (input.bioKm) { case (?v) { ?v }; case null { u.bioKm } };
                bioFr = switch (input.bioFr) { case (?v) { ?v }; case null { u.bioFr } };
                preferredLanguage = switch (input.preferredLanguage) { case (?v) { v }; case null { u.preferredLanguage } };
                hasPaidForward = switch (input.hasPaidForward) { case (?v) { v }; case null { u.hasPaidForward } };
                targetMonthlyIncomeKhr = switch (input.targetMonthlyIncomeKhr) { case (?v) { v }; case null { u.targetMonthlyIncomeKhr } };
                targetMonthlyIncomeUsd = switch (input.targetMonthlyIncomeUsd) { case (?v) { v }; case null { u.targetMonthlyIncomeUsd } };
                isActive = switch (input.isActive) { case (?v) { v }; case null { u.isActive } };
                updatedAt = now;
              };
            } else { u };
          }
        );
        #ok ();
      };
    };
  };
};
