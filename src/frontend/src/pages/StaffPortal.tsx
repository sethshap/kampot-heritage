import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { StaffChampionsTab } from "@/components/staff/StaffChampionsTab";
import { StaffConsignmentTab } from "@/components/staff/StaffConsignmentTab";
import { StaffPayoutsTab } from "@/components/staff/StaffPayoutsTab";
import { StaffPendingTab } from "@/components/staff/StaffPendingTab";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// StaffPortal — implemented in Phase 3
import { createActor, makeApi, useActor } from "@/lib/api";
import type { PayoutLedger, Product, User } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { User as UserIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StaffPortal() {
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const api = actor ? makeApi(actor) : null;

  const { data: pendingChampions = [] } = useQuery<User[]>({
    queryKey: ["pendingChampions"],
    queryFn: () => api!.getPendingChampions(),
    enabled: !!api && !isFetching,
  });

  const { data: approvedChampions = [] } = useQuery<User[]>({
    queryKey: ["approvedChampions"],
    queryFn: () => api!.getApprovedChampions(),
    enabled: !!api && !isFetching,
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["activeProducts"],
    queryFn: () => api!.getActiveProducts(),
    enabled: !!api && !isFetching,
  });

  const { data: pendingPayouts = [] } = useQuery<PayoutLedger[]>({
    queryKey: ["pendingPayouts"],
    queryFn: () => api!.getPendingPayouts(),
    enabled: !!api && !isFetching,
  });

  if (isFetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          <p className="text-muted-foreground text-sm">
            Connecting to backend…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-display font-semibold text-foreground">
                Staff Portal
              </h1>
              <p className="text-xs text-muted-foreground">
                Kampot Heritage Impact Network
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Badge
              variant="outline"
              className="border-accent text-accent font-body text-xs"
            >
              Staff Access
            </Badge>
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Back to home"
              data-ocid="staff.portal.close_button"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList
            className="grid w-full grid-cols-4 mb-6 bg-muted/60"
            data-ocid="staff.tabs"
          >
            <TabsTrigger
              value="pending"
              className="gap-2"
              data-ocid="staff.pending_tab"
            >
              Pending
              {pendingChampions.length > 0 && (
                <Badge className="ml-1 h-5 min-w-5 text-xs px-1.5 bg-destructive text-destructive-foreground">
                  {pendingChampions.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="champions" data-ocid="staff.champions_tab">
              Champions
            </TabsTrigger>
            <TabsTrigger value="consignment" data-ocid="staff.consignment_tab">
              Consignment
            </TabsTrigger>
            <TabsTrigger value="payouts" data-ocid="staff.payouts_tab">
              Payouts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <StaffPendingTab pending={pendingChampions} api={api} />
          </TabsContent>
          <TabsContent value="champions">
            <StaffChampionsTab champions={approvedChampions} api={api} />
          </TabsContent>
          <TabsContent value="consignment">
            <StaffConsignmentTab
              champions={approvedChampions}
              products={products}
              api={api}
            />
          </TabsContent>
          <TabsContent value="payouts">
            <StaffPayoutsTab
              payouts={pendingPayouts}
              champions={approvedChampions}
              api={api}
            />
          </TabsContent>
        </Tabs>
      </main>
      <FloatingContactButtons />
    </div>
  );
}
