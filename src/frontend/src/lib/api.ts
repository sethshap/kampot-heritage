import { type ChampionMetrics, createActor } from "@/backend";
import type {
  ApproveChampionInput,
  ChampionCode,
  ConsignmentCheckout,
  ConsignmentInput,
  ImpactStats,
  Order,
  OrderInput,
  OrderItem,
  PayoutLedger,
  Product,
  Translation,
  User,
  UserRegistrationInput,
  UserUpdateInput,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";

// Re-export useActor for convenience
export { useActor, createActor };

// ── Result helpers ────────────────────────────────────────────────────────────

type OkResult<T> = { __kind__: "ok"; ok: T };
type ErrResult = { __kind__: "err"; err: string };
type AnyResult<T> = OkResult<T> | ErrResult;

function unwrapResult<T>(result: AnyResult<T>): T {
  if (result.__kind__ === "ok") return result.ok;
  throw new Error(result.err);
}

// ── API factory — creates typed callers bound to an actor ─────────────────────
// Usage: const api = makeApi(actor); const products = await api.getActiveProducts();

export function makeApi(actor: ReturnType<typeof createActor>) {
  return {
    // Translations
    getTranslations: (): Promise<Translation[]> => actor.getTranslations(),

    getTranslationByKey: (key: string): Promise<Translation | null> =>
      actor.getTranslationByKey(key),

    // Products
    getActiveProducts: (): Promise<Product[]> => actor.getActiveProducts(),

    getProducts: (): Promise<Product[]> => actor.getProducts(),

    // Impact
    getImpactStats: (): Promise<ImpactStats> => actor.getImpactStats(),

    // Champions / Users
    getApprovedChampions: (): Promise<User[]> => actor.getApprovedChampions(),

    getPendingChampions: (): Promise<User[]> => actor.getPendingChampions(),

    getUserByPhone: (phone: string): Promise<User | null> =>
      actor.getUserByPhone(phone),

    getUserById: (id: bigint): Promise<User | null> => actor.getUserById(id),

    registerUser: async (input: UserRegistrationInput): Promise<bigint> => {
      const res = await actor.registerUser(input);
      return unwrapResult(res);
    },

    approveChampion: async (
      userId: bigint,
      input: ApproveChampionInput,
    ): Promise<void> => {
      const res = await actor.approveChampion(userId, input);
      unwrapResult(res);
    },

    rejectChampion: async (userId: bigint, reason: string): Promise<void> => {
      const res = await actor.rejectChampion(userId, reason);
      unwrapResult(res);
    },

    updateUser: async (
      userId: bigint,
      input: UserUpdateInput,
    ): Promise<void> => {
      const res = await actor.updateUser(userId, input);
      unwrapResult(res);
    },

    validateReferralCode: (code: string): Promise<ChampionCode | null> =>
      actor.validateReferralCode(code),

    getCallerPrincipal: (): Promise<string> => actor.getCallerPrincipal(),

    // Champion Codes
    getChampionCodes: (championId: bigint): Promise<ChampionCode[]> =>
      actor.getChampionCodes(championId),

    regenerateChampionQR: async (championId: bigint): Promise<string> => {
      const res = await actor.regenerateChampionQR(championId);
      return unwrapResult(res);
    },

    // Orders
    createOrder: async (input: OrderInput): Promise<bigint> => {
      const res = await actor.createOrder(input);
      return unwrapResult(res);
    },

    getOrdersByHotel: (hotelId: bigint): Promise<Order[]> =>
      actor.getOrdersByHotel(hotelId),

    getOrdersByChampion: (championId: bigint): Promise<Order[]> =>
      actor.getOrdersByChampion(championId),

    confirmPayment: async (orderId: bigint): Promise<void> => {
      const res = await actor.confirmPayment(orderId);
      unwrapResult(res);
    },

    getOrderItems: (orderId: bigint): Promise<OrderItem[]> =>
      actor.getOrderItems(orderId),

    // Consignment
    checkoutConsignment: async (input: ConsignmentInput): Promise<bigint> => {
      const res = await actor.checkoutConsignment(input);
      return unwrapResult(res);
    },

    getConsignmentByChampion: (
      championId: bigint,
    ): Promise<ConsignmentCheckout[]> =>
      actor.getConsignmentByChampion(championId),

    // Champion Metrics
    getAllChampionMetrics: (): Promise<ChampionMetrics[]> =>
      actor.getAllChampionMetrics(),

    getChampionMetrics: (championId: bigint): Promise<ChampionMetrics> =>
      actor.getChampionMetrics(championId),

    // Payouts
    getPendingPayouts: (): Promise<PayoutLedger[]> => actor.getPendingPayouts(),

    markPayoutProcessed: async (
      payoutId: bigint,
      staffId: bigint,
    ): Promise<void> => {
      const res = await actor.markPayoutProcessed(payoutId, staffId);
      unwrapResult(res);
    },

    generatePayoutLedger: async (
      cycleStart: string,
      cycleEnd: string,
    ): Promise<void> => {
      const res = await actor.generatePayoutLedger(cycleStart, cycleEnd);
      unwrapResult(res);
    },
  };
}
