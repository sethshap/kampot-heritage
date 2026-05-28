module {
  public type UserRole = { #staff; #champion; #hotel };
  public type OnboardingStatus = { #pending; #approved; #rejected };
  public type PreferredLanguage = { #en; #km; #fr };

  public type User = {
    id : Nat;
    role : UserRole;
    fullNameEn : Text;
    fullNameKm : ?Text;
    fullNameFr : ?Text;
    phoneNumber : Text;
    avatarUrl : ?Text;
    bioEn : ?Text;
    bioKm : ?Text;
    bioFr : ?Text;
    referredById : ?Nat;
    referredByCode : ?Text;
    physicalQrCodeId : ?Text;
    personalReferralCode : ?Text;
    referralCodeActivatedAt : ?Int;
    qrCodeActivatedAt : ?Int;
    consignmentInventoryHeld : Nat;
    targetMonthlyIncomeKhr : Nat;
    targetMonthlyIncomeUsd : Nat;
    onboardingStatus : OnboardingStatus;
    onboardingNotesEn : ?Text;
    onboardingNotesKm : ?Text;
    onboardingNotesFr : ?Text;
    approvedByStaffId : ?Nat;
    approvedAt : ?Int;
    hasPaidForward : Bool;
    preferredLanguage : PreferredLanguage;
    isActive : Bool;
    createdAt : Int;
    updatedAt : Int;
  };

  public type UserRegistrationInput = {
    role : UserRole;
    fullNameEn : Text;
    fullNameKm : ?Text;
    fullNameFr : ?Text;
    phoneNumber : Text;
    avatarUrl : ?Text;
    bioEn : ?Text;
    bioKm : ?Text;
    bioFr : ?Text;
    referredByCode : ?Text;
    preferredLanguage : PreferredLanguage;
  };

  public type ApproveChampionInput = {
    notesEn : ?Text;
    notesKm : ?Text;
    notesFr : ?Text;
    qrCodeImageUrl : ?Text;
  };

  public type UserUpdateInput = {
    fullNameEn : ?Text;
    fullNameKm : ?Text;
    fullNameFr : ?Text;
    avatarUrl : ?Text;
    bioEn : ?Text;
    bioKm : ?Text;
    bioFr : ?Text;
    preferredLanguage : ?PreferredLanguage;
    hasPaidForward : ?Bool;
    targetMonthlyIncomeKhr : ?Nat;
    targetMonthlyIncomeUsd : ?Nat;
    isActive : ?Bool;
  };
};
