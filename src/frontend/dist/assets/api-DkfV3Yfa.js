import "./index-DzwzmQd8.js";
function unwrapResult(result) {
  if (result.__kind__ === "ok") return result.ok;
  throw new Error(result.err);
}
function makeApi(actor) {
  return {
    // Translations
    getTranslations: () => actor.getTranslations(),
    getTranslationByKey: (key) => actor.getTranslationByKey(key),
    // Products
    getActiveProducts: () => actor.getActiveProducts(),
    getProducts: () => actor.getProducts(),
    // Impact
    getImpactStats: () => actor.getImpactStats(),
    // Champions / Users
    getApprovedChampions: () => actor.getApprovedChampions(),
    getPendingChampions: () => actor.getPendingChampions(),
    getUserByPhone: (phone) => actor.getUserByPhone(phone),
    getUserById: (id) => actor.getUserById(id),
    registerUser: async (input) => {
      const res = await actor.registerUser(input);
      return unwrapResult(res);
    },
    approveChampion: async (userId, input) => {
      const res = await actor.approveChampion(userId, input);
      unwrapResult(res);
    },
    rejectChampion: async (userId, reason) => {
      const res = await actor.rejectChampion(userId, reason);
      unwrapResult(res);
    },
    updateUser: async (userId, input) => {
      const res = await actor.updateUser(userId, input);
      unwrapResult(res);
    },
    validateReferralCode: (code) => actor.validateReferralCode(code),
    getCallerPrincipal: () => actor.getCallerPrincipal(),
    // Champion Codes
    getChampionCodes: (championId) => actor.getChampionCodes(championId),
    regenerateChampionQR: async (championId) => {
      const res = await actor.regenerateChampionQR(championId);
      return unwrapResult(res);
    },
    // Orders
    createOrder: async (input) => {
      const res = await actor.createOrder(input);
      return unwrapResult(res);
    },
    getOrdersByHotel: (hotelId) => actor.getOrdersByHotel(hotelId),
    getOrdersByChampion: (championId) => actor.getOrdersByChampion(championId),
    confirmPayment: async (orderId) => {
      const res = await actor.confirmPayment(orderId);
      unwrapResult(res);
    },
    getOrderItems: (orderId) => actor.getOrderItems(orderId),
    // Consignment
    checkoutConsignment: async (input) => {
      const res = await actor.checkoutConsignment(input);
      return unwrapResult(res);
    },
    getConsignmentByChampion: (championId) => actor.getConsignmentByChampion(championId),
    // Champion Metrics
    getAllChampionMetrics: () => actor.getAllChampionMetrics(),
    getChampionMetrics: (championId) => actor.getChampionMetrics(championId),
    // Payouts
    getPendingPayouts: () => actor.getPendingPayouts(),
    markPayoutProcessed: async (payoutId, staffId) => {
      const res = await actor.markPayoutProcessed(payoutId, staffId);
      unwrapResult(res);
    },
    generatePayoutLedger: async (cycleStart, cycleEnd) => {
      const res = await actor.generatePayoutLedger(cycleStart, cycleEnd);
      unwrapResult(res);
    }
  };
}
export {
  makeApi as m
};
