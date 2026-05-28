import List "mo:core/List";
import Map "mo:core/Map";
import ProductTypes "types/product";
import UserTypes "types/user";
import ChampionTypes "types/champion";
import OrderTypes "types/order";
import PayoutTypes "types/payout";
import ConsignmentTypes "types/consignment";
import TranslationTypes "types/translation";
import ProductApi "mixins/product-api";
import UserApi "mixins/user-api";
import ChampionApi "mixins/champion-api";
import OrderApi "mixins/order-api";
import ConsignmentApi "mixins/consignment-api";
import PayoutApi "mixins/payout-api";
import TranslationApi "mixins/translation-api";
import ImpactApi "mixins/impact-api";
import MetricsApi "mixins/metrics-api";

actor {
  // Stable state — types only, initial values supplied by migration chain
  let products : List.List<ProductTypes.Product>;
  let users : List.List<UserTypes.User>;
  let championCodes : List.List<ChampionTypes.ChampionCode>;
  let orders : List.List<OrderTypes.Order>;
  let orderItems : List.List<OrderTypes.OrderItem>;
  let payouts : List.List<PayoutTypes.PayoutLedger>;
  let checkouts : List.List<ConsignmentTypes.ConsignmentCheckout>;
  let translations : List.List<TranslationTypes.Translation>;

  // Indexes for fast lookup
  let phoneIndex : Map.Map<Text, Nat>;
  let qrIndex : Map.Map<Text, Nat>;
  let referralIndex : Map.Map<Text, Nat>;

  // ID counters wrapped in a record so mixins share state by reference
  let idState : {
    var nextProductId : Nat;
    var nextUserId : Nat;
    var nextChampionCodeId : Nat;
    var nextOrderId : Nat;
    var nextOrderItemId : Nat;
    var nextPayoutId : Nat;
    var nextConsignmentId : Nat;
    var nextTranslationId : Nat;
  };

  // Mixin composition
  include ProductApi(products, idState);
  include UserApi(users, phoneIndex, championCodes, idState);
  include ChampionApi(championCodes, qrIndex);
  include OrderApi(orders, orderItems, idState);
  include ConsignmentApi(checkouts, idState);
  include PayoutApi(payouts, orders, orderItems, idState);
  include TranslationApi(translations);
  include ImpactApi(users, orders, orderItems, products);
  include MetricsApi(orders, orderItems);
};

