// Re-export backend types with convenient aliases
export type {
  Product,
  User,
  ChampionCode,
  Order,
  OrderItem,
  OrderItemInput,
  OrderInput,
  PayoutLedger,
  ConsignmentCheckout,
  Translation,
  ImpactStats,
  UserRegistrationInput,
  UserUpdateInput,
  ApproveChampionInput,
  ConsignmentInput,
} from "@/backend";

export {
  UserRole,
  OnboardingStatus,
  PayoutStatus,
  PayoutMethod,
  ConsignmentStatus,
  ChampionSelectionMethod,
  PreferredLanguage,
} from "@/backend";

// ── Currency display helpers ──────────────────────────────────────────────────

/**
 * Formats a KHR amount as "4,000 ៛"
 */
export function formatKhr(amount: number): string {
  return `${amount.toLocaleString("en-US")} ៛`;
}

/**
 * Formats a USD amount as "($1.00)"
 */
export function formatUsd(amount: number): string {
  return `($${amount.toFixed(2)})`;
}

/**
 * Formats dual currency as "4,000 ៛ ($1.00)"
 */
export function formatCurrency(khr: number, usd: number): string {
  return `${formatKhr(khr)} ${formatUsd(usd)}`;
}

/** Convert bigint to number safely for display purposes */
export function bigintToNumber(value: bigint): number {
  return Number(value);
}
