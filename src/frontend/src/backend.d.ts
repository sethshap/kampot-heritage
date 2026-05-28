import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductInput {
    skuCode: string;
    nameEn: string;
    nameFr: string;
    nameKm: string;
    descriptionEn?: string;
    descriptionFr?: string;
    descriptionKm?: string;
    baseCostKhr: bigint;
    retailPriceKhr: bigint;
    retailPriceUsd: number;
    commissionRatePercentage: number;
    championCommissionKhr: bigint;
    championCommissionUsd: number;
    wholesalePriceKhr: bigint;
    wholesalePriceUsd: number;
    unitMeasurement: string;
    isActive: boolean;
    referralPriceKhr?: bigint;
    referralPriceUsd?: number;
    unitSize: number;
}
export type Result_2 = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface Translation {
    en: string;
    fr: string;
    id: bigint;
    km: string;
    key: string;
    createdAt: bigint;
}
export interface User {
    id: bigint;
    fullNameEn: string;
    fullNameFr?: string;
    fullNameKm?: string;
    referralCodeActivatedAt?: bigint;
    referredById?: bigint;
    preferredLanguage: PreferredLanguage;
    qrCodeActivatedAt?: bigint;
    physicalQrCodeId?: string;
    personalReferralCode?: string;
    approvedAt?: bigint;
    createdAt: bigint;
    role: UserRole;
    isActive: boolean;
    onboardingNotesEn?: string;
    onboardingNotesFr?: string;
    onboardingNotesKm?: string;
    updatedAt: bigint;
    approvedByStaffId?: bigint;
    avatarUrl?: string;
    onboardingStatus: OnboardingStatus;
    bioEn?: string;
    bioFr?: string;
    bioKm?: string;
    hasPaidForward: boolean;
    phoneNumber: string;
    consignmentInventoryHeld: bigint;
    referredByCode?: string;
    targetMonthlyIncomeKhr: bigint;
    targetMonthlyIncomeUsd: bigint;
}
export interface PayoutLedger {
    id: bigint;
    payoutStatus: PayoutStatus;
    payoutMethod: PayoutMethod;
    createdAt: bigint;
    notesEn?: string;
    notesFr?: string;
    notesKm?: string;
    processedByStaffId?: bigint;
    processedAt?: bigint;
    payoutCycleStart: string;
    totalCommissionKhr: bigint;
    totalCommissionUsd: number;
    payoutCycleEnd: string;
    totalOrdersCount: bigint;
    championId: bigint;
}
export interface OrderItem {
    id: bigint;
    championCommissionKhr: bigint;
    championCommissionUsd: number;
    productId: bigint;
    orderId: bigint;
    unitPriceKhr: bigint;
    unitPriceUsd: number;
    quantity: bigint;
}
export interface OrderItemInput {
    championCommissionKhr: bigint;
    championCommissionUsd: number;
    productId: bigint;
    unitPriceKhr: bigint;
    unitPriceUsd: number;
    quantity: bigint;
}
export interface OrderInput {
    hotelSelectedChampionMethod: ChampionSelectionMethod;
    qrCodeUsed?: string;
    hotelId: bigint;
    staffProxyId?: bigint;
    referralCodeUsed?: string;
    items: Array<OrderItemInput>;
    payoutCycleStartDate: string;
    championId: bigint;
    payoutCycleEndDate: string;
}
export type Result_1 = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export interface Order {
    id: bigint;
    hotelSelectedChampionMethod: ChampionSelectionMethod;
    qrCodeUsed?: string;
    createdAt: bigint;
    hotelId: bigint;
    orderDate: bigint;
    staffProxyId?: bigint;
    referralCodeUsed?: string;
    updatedAt: bigint;
    khqrReceiptHash?: string;
    khqrPaymentConfirmed: boolean;
    totalAmountKhr: bigint;
    totalAmountUsd: number;
    payoutProcessedDate?: string;
    payoutCycleStartDate: string;
    biweeklyPayoutProcessed: boolean;
    championId: bigint;
    payoutCycleEndDate: string;
}
export interface UserUpdateInput {
    fullNameEn?: string;
    fullNameFr?: string;
    fullNameKm?: string;
    preferredLanguage?: PreferredLanguage;
    isActive?: boolean;
    avatarUrl?: string;
    bioEn?: string;
    bioFr?: string;
    bioKm?: string;
    hasPaidForward?: boolean;
    targetMonthlyIncomeKhr?: bigint;
    targetMonthlyIncomeUsd?: bigint;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export interface ChampionMetrics {
    sponsorCount: bigint;
    orderCount: bigint;
    bottlesSold: bigint;
    championId: bigint;
    totalEarningsKhr: bigint;
    totalEarningsUsd: number;
}
export interface ApproveChampionInput {
    notesEn?: string;
    notesFr?: string;
    notesKm?: string;
    qrCodeImageUrl?: string;
}
export interface UserRegistrationInput {
    fullNameEn: string;
    fullNameFr?: string;
    fullNameKm?: string;
    preferredLanguage: PreferredLanguage;
    role: UserRole;
    avatarUrl?: string;
    bioEn?: string;
    bioFr?: string;
    bioKm?: string;
    phoneNumber: string;
    referredByCode?: string;
}
export interface ConsignmentInput {
    staffId: bigint;
    notesEn?: string;
    notesFr?: string;
    notesKm?: string;
    productId: bigint;
    quantity: bigint;
    championId: bigint;
}
export interface ImpactStats {
    totalCommunityEarningsKhr: bigint;
    localValueCirculatedKhr: bigint;
    championsEmpowered: bigint;
}
export interface ChampionCode {
    id: bigint;
    referralCode: string;
    timesUsedForHotelOrders: bigint;
    createdAt: bigint;
    isActive: boolean;
    timesUsedForChampionReferrals: bigint;
    qrCodeId: string;
    qrCodeImageUrl?: string;
    championId: bigint;
}
export interface Product {
    id: bigint;
    skuCode: string;
    nameEn: string;
    nameFr: string;
    nameKm: string;
    descriptionEn?: string;
    descriptionFr?: string;
    descriptionKm?: string;
    createdAt: bigint;
    baseCostKhr: bigint;
    retailPriceKhr: bigint;
    retailPriceUsd: number;
    commissionRatePercentage: number;
    championCommissionKhr: bigint;
    championCommissionUsd: number;
    wholesalePriceKhr: bigint;
    wholesalePriceUsd: number;
    unitMeasurement: string;
    isActive: boolean;
    updatedAt: bigint;
    referralPriceKhr?: bigint;
    referralPriceUsd?: number;
    unitSize: number;
}
export interface ConsignmentCheckout {
    id: bigint;
    status: ConsignmentStatus;
    staffId: bigint;
    notesEn?: string;
    notesFr?: string;
    notesKm?: string;
    checkedOutAt: bigint;
    productId: bigint;
    quantity: bigint;
    returnedAt?: bigint;
    championId: bigint;
}
export enum ChampionSelectionMethod {
    browsed_list = "browsed_list",
    staff_assigned = "staff_assigned",
    remembered = "remembered",
    qr_scan = "qr_scan"
}
export enum ConsignmentStatus {
    out = "out",
    sold = "sold",
    returned = "returned"
}
export enum OnboardingStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum PayoutMethod {
    cash = "cash",
    wing = "wing",
    bank_transfer = "bank_transfer"
}
export enum PayoutStatus {
    pending = "pending",
    processed = "processed",
    failed = "failed"
}
export enum PreferredLanguage {
    en = "en",
    fr = "fr",
    km = "km"
}
export enum UserRole {
    hotel = "hotel",
    staff = "staff",
    champion = "champion"
}
export interface backendInterface {
    addProduct(input: ProductInput): Promise<Result_1>;
    approveChampion(userId: bigint, input: ApproveChampionInput): Promise<Result>;
    checkoutConsignment(input: ConsignmentInput): Promise<Result_1>;
    confirmPayment(orderId: bigint): Promise<Result>;
    createOrder(input: OrderInput): Promise<Result_1>;
    generatePayoutLedger(cycleStart: string, cycleEnd: string): Promise<Result>;
    getActiveProducts(): Promise<Array<Product>>;
    getAllChampionMetrics(): Promise<Array<ChampionMetrics>>;
    getApprovedChampions(): Promise<Array<User>>;
    getCallerPrincipal(): Promise<string>;
    getChampionCodes(championId: bigint): Promise<Array<ChampionCode>>;
    getChampionMetrics(championId: bigint): Promise<ChampionMetrics>;
    getConsignmentByChampion(championId: bigint): Promise<Array<ConsignmentCheckout>>;
    getImpactStats(): Promise<ImpactStats>;
    getOrderItems(orderId: bigint): Promise<Array<OrderItem>>;
    getOrdersByChampion(championId: bigint): Promise<Array<Order>>;
    getOrdersByHotel(hotelId: bigint): Promise<Array<Order>>;
    getPendingChampions(): Promise<Array<User>>;
    getPendingPayouts(): Promise<Array<PayoutLedger>>;
    getProducts(): Promise<Array<Product>>;
    getTranslationByKey(key: string): Promise<Translation | null>;
    getTranslations(): Promise<Array<Translation>>;
    getUserById(id: bigint): Promise<User | null>;
    getUserByPhone(phone: string): Promise<User | null>;
    markPayoutProcessed(payoutId: bigint, staffId: bigint): Promise<Result>;
    regenerateChampionQR(championId: bigint): Promise<Result_2>;
    registerUser(input: UserRegistrationInput): Promise<Result_1>;
    rejectChampion(userId: bigint, reason: string): Promise<Result>;
    updateUser(userId: bigint, input: UserUpdateInput): Promise<Result>;
    validateReferralCode(code: string): Promise<ChampionCode | null>;
}
