import List "mo:core/List";
import Map "mo:core/Map";

module {
  // No prior stable state — fresh install
  type OldActor = {};

  // Inline stable types to keep migration self-contained
  type Product = {
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

  type UserRole = { #staff; #champion; #hotel };
  type OnboardingStatus = { #pending; #approved; #rejected };
  type PreferredLanguage = { #en; #km; #fr };

  type User = {
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

  type ChampionCode = {
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

  type ChampionSelectionMethod = {
    #qr_scan;
    #remembered;
    #browsed_list;
    #staff_assigned;
  };

  type Order = {
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

  type OrderItem = {
    id : Nat;
    orderId : Nat;
    productId : Nat;
    quantity : Nat;
    unitPriceKhr : Nat;
    unitPriceUsd : Float;
    championCommissionKhr : Nat;
    championCommissionUsd : Float;
  };

  type PayoutStatus = { #pending; #processed; #failed };
  type PayoutMethod = { #cash; #bank_transfer; #wing };

  type PayoutLedger = {
    id : Nat;
    championId : Nat;
    payoutCycleStart : Text;
    payoutCycleEnd : Text;
    totalCommissionKhr : Nat;
    totalCommissionUsd : Float;
    totalOrdersCount : Nat;
    payoutStatus : PayoutStatus;
    payoutMethod : PayoutMethod;
    notesEn : ?Text;
    notesKm : ?Text;
    notesFr : ?Text;
    processedByStaffId : ?Nat;
    processedAt : ?Int;
    createdAt : Int;
  };

  type ConsignmentStatus = { #out; #returned; #sold };

  type ConsignmentCheckout = {
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

  type Translation = {
    id : Nat;
    key : Text;
    en : Text;
    km : Text;
    fr : Text;
    createdAt : Int;
  };

  type NewActor = {
    products : List.List<Product>;
    users : List.List<User>;
    championCodes : List.List<ChampionCode>;
    orders : List.List<Order>;
    orderItems : List.List<OrderItem>;
    payouts : List.List<PayoutLedger>;
    checkouts : List.List<ConsignmentCheckout>;
    translations : List.List<Translation>;
    phoneIndex : Map.Map<Text, Nat>;
    qrIndex : Map.Map<Text, Nat>;
    referralIndex : Map.Map<Text, Nat>;
    idState : { var nextProductId : Nat; var nextUserId : Nat; var nextChampionCodeId : Nat; var nextOrderId : Nat; var nextOrderItemId : Nat; var nextPayoutId : Nat; var nextConsignmentId : Nat; var nextTranslationId : Nat };
  };

  public func migration(_ : OldActor) : NewActor {
    let products = List.empty<Product>();
    let translations = List.empty<Translation>();

    // Seed products
    products.add({
      id = 0;
      skuCode = "KMPT-SOAP-630ML";
      nameEn = "Kampot Heritage Refill Bottle Bag";
      nameKm = "ថង់សាប៊ូកម្ពុជា ៦៣០មីលីលីត្រ";
      nameFr = "Sac de bouteille de recharge Kampot Heritage 630ml";
      descriptionEn = ?"Perfect for restaurants, cafes, and bathrooms. Natural lemongrass oil repels flies.";
      descriptionKm = ?"ល្អសម្រាប់ភោជនីយដ្ឋាន ហាងកាហ្វេ និងបន្ទប់ទឹក";
      descriptionFr = ?"Parfait pour les restaurants, cafés et salles de bains";
      unitMeasurement = "ml";
      unitSize = 630.0;
      baseCostKhr = 2000;
      wholesalePriceKhr = 3000;
      retailPriceKhr = 4000;
      referralPriceKhr = ?2500;
      championCommissionKhr = 1500;
      wholesalePriceUsd = 0.75;
      retailPriceUsd = 1.00;
      referralPriceUsd = ?0.62;
      championCommissionUsd = 0.37;
      commissionRatePercentage = 50.0;
      isActive = true;
      createdAt = 0;
      updatedAt = 0;
    });
    products.add({
      id = 1;
      skuCode = "KMPT-SOAP-3L";
      nameEn = "Kampot Heritage Bulk Container Bag";
      nameKm = "ថង់សាប៊ូកម្ពុជា ៣លីត្រ";
      nameFr = "Sac de récipient en vrac Kampot Heritage 3L";
      descriptionEn = ?"Perfect for hotel kitchens and heavy use. Bulk economy size.";
      descriptionKm = ?"ល្អសម្រាប់ផ្ទះបាយសណ្ឋាគារ និងប្រើប្រាស់ច្រើន";
      descriptionFr = ?"Parfait pour les cuisines d'hôtel et une utilisation intensive";
      unitMeasurement = "Liters";
      unitSize = 3.0;
      baseCostKhr = 8000;
      wholesalePriceKhr = 12000;
      retailPriceKhr = 17500;
      referralPriceKhr = ?10000;
      championCommissionKhr = 5000;
      wholesalePriceUsd = 3.00;
      retailPriceUsd = 4.38;
      referralPriceUsd = ?2.50;
      championCommissionUsd = 1.25;
      commissionRatePercentage = 42.0;
      isActive = true;
      createdAt = 0;
      updatedAt = 0;
    });

    // Seed translations
    let tSeeds : [(Text, Text, Text, Text)] = [
      ("hero_headline", "Kampot Heritage Soap", "សាប៊ូកម្ពុជា", "Savon Kampot Heritage"),
      ("hero_subheadline", "Every restaurant, hotel, or resort that switches to Kampot Heritage Soap redirects that spending back into Cambodia — into the hands of champions rebuilding their lives.", "រាល់ភោជនីយដ្ឋាន សណ្ឋាគារ ឬរមណីយដ្ឋានដែលប្តូរមកប្រើសាប៊ូកម្ពុជា ប្តូរទិសការចំណាយនោះត្រឡប់មកកម្ពុជាវិញ — ទៅកាន់ដៃអ្នកជើងឯកដែលកំពុងស្ថាបនាជីវិតឡើងវិញ។", "Chaque restaurant, hôtel ou complexe hôtelier qui passe au savon Kampot Heritage redirige ces dépenses vers le Cambodge — entre les mains des champions qui reconstruisent leur vie."),
      ("economic_loss_title", "CAMBODIA SENDS THIS MUCH AWAY EVERY YEAR — ON SOAP & CLEANING PRODUCTS ALONE", "កម្ពុជាបញ្ជូនហ្ខ្មែរចេញទៅក្រៅ — សម្រាប់តែសាប៊ូ និងផលិតផលស្អាតប្ណ្ណោះ", "LE CAMBODGE ENVOIE CETTE SOMME À L'ÉTRANGER CHAQUE ANNÉE — UNIQUEMENT POUR LE SAVON ET LES PRODUITS DE NETTOYAGE"),
      ("to_thailand", "TO THAILAND", "ទៅកាន់ថៃ", "VERS LA THAÏLANDE"),
      ("to_vietnam", "TO VIETNAM", "ទៅកាន់វៀតណាម", "VERS LE VIETNAM"),
      ("total_loss", "TOTAL COMBINED LOSS", "ការបាត់បង់សរុប", "PERTE TOTALE COMBINÉE"),
      ("social_mission", "DEVELOPING CHAMPIONS", "បង្កើតអ្នកជើងឯក", "DÉVELOPPER DES CHAMPIONS"),
      ("mission_statement", "Behind every bottle is a champion getting back on their feet.", "នៅពីក្រោយដបនីមួយៗគឺជាអ្នកជើងឯកម្នាក់កំពុងងើបឈរឡើងវិញ។", "Derrière chaque bouteille se cache un champion qui se remet sur pied."),
      ("income_goal", "Accumulated daily supply orders empower transitioning individuals to reliably build up their baseline income to $150 - $200 a month (600,000 - 800,000 Riel).", "ការបញ្ជាទិញស្តុកប្រចាំថ្ងៃជួយឲ្យអ្នកអាចកសាងប្រាក់ចំណូលប្រចាំខែ ១៥០ ទៅ ២០០ ដុល្លារ (៦០០,០០០ - ៨០០,០០០ រៀល)។", "Les commandes quotidiennes d'approvisionnement permettent aux personnes en transition de construire de manière fiable leur revenu de base entre 150 et 200 dollars par mois (600 000 - 800 000 Riels)."),
      ("pay_forward", "Once they establish financial independence, they pay it forward—sponsoring and training the next champion off the streets.", "នៅពេលដែលមានស្ថិរភាព ពួកគេជួយអ្នកបន្ទាប់ — ឧបត្ថម្ភ និងបណ្តុះបណ្តាលអ្នកជើងឯកបន្ទាប់ពីផ្លូវវិញ។", "Une fois qu'ils ont atteint l'indépendance financière, ils transmettent l'aide — en parrainant et en formant le prochain champion à sortir de la rue."),
      ("size_630ml", "630ml Refill Bottle Bag", "ថង់សាប៊ូ ៦៣០មីលីលីត្រ", "Sac de recharge 630ml"),
      ("size_3l", "3L Bulk Container Bag", "ថង់សាប៊ូ ៣លីត្រ", "Sac en vrac 3L"),
      ("earns_champion", "Earns champion", "អ្នកជើងឯកទទួលបាន", "Le champion gagne"),
      ("champion_onboarding_title", "Become a Kampot Heritage Champion", "ក្លាយជាអ្នកជើងឯកសាប៊ូកម្ពុជា", "Devenez un champion Kampot Heritage"),
      ("champion_upload_photo", "Upload your photo", "ទាញយករូបថតរបស់អ្នក", "Téléchargez votre photo"),
      ("champion_tell_story", "Tell your story", "ប្រាប់រឿងរ៉ាវរបស់អ្នក", "Racontez votre histoire"),
      ("champion_phone", "Your phone number", "លេខទូរស័ព្ទរបស់អ្នក", "Votre numéro de téléphone"),
      ("champion_submit", "Submit for approval", "ដាក់ពាក្យសុំអនុម័ត", "Soumettre pour approbation"),
      ("champion_pending", "Your application is pending staff approval", "ពាក្យសុំរបស់អ្នកកំពុងរង់ចាំការអនុម័ត", "Votre demande est en attente d'approbation"),
      ("hotel_no_champion", "I don't have a specific champion", "ខ្ញុំមិនមានអ្នកជើងឯកជាក់លាក់ទេ", "Je n'ai pas de champion spécifique"),
      ("hotel_browse_champions", "Browse all champions to support", "រកមើលអ្នកជើងឯកទាំងអស់ដើម្បីគាំទ្រ", "Parcourir tous les champions à soutenir"),
      ("hotel_select_champion", "Select a champion to support", "ជ្រើសរើសអ្នកជើងឯកដើម្បីគាំទ្រ", "Sélectionnez un champion à soutenir"),
      ("hotel_remember_champion", "I remember my champion's name/QR", "ខ្ញុំចាំឈ្មោះ/កូដអ្នកជើងឯករបស់ខ្ញុំ", "Je me souviens du nom/QR de mon champion"),
      ("meet_our_champions", "Meet Our Champions", "ជួបអ្នកជើងឯករបស់យើង", "Rencontrez Nos Champions"),
      ("my_referral_code", "My Referral Code", "កូដអញ្ជើញរបស់ខ្ញុំ", "Mon code de parrainage"),
      ("my_qr_code", "My QR Code", "កូដ QR របស់ខ្ញុំ", "Mon code QR"),
      ("refer_a_champion", "Refer a new champion", "សូមអញ្ជើញអ្នកជើងឯកថ្មី", "Parrainer un nouveau champion"),
    ];
    var tId = 0;
    for ((key, en, km, fr) in tSeeds.vals()) {
      translations.add({ id = tId; key; en; km; fr; createdAt = 0 });
      tId += 1;
    };

    {
      products;
      users = List.empty<User>();
      championCodes = List.empty<ChampionCode>();
      orders = List.empty<Order>();
      orderItems = List.empty<OrderItem>();
      payouts = List.empty<PayoutLedger>();
      checkouts = List.empty<ConsignmentCheckout>();
      translations;
      phoneIndex = Map.empty<Text, Nat>();
      qrIndex = Map.empty<Text, Nat>();
      referralIndex = Map.empty<Text, Nat>();
      idState = {
        var nextProductId = 2;
        var nextUserId = 1;
        var nextChampionCodeId = 1;
        var nextOrderId = 1;
        var nextOrderItemId = 1;
        var nextPayoutId = 1;
        var nextConsignmentId = 1;
        var nextTranslationId = tId;
      };
    };
  };
};
