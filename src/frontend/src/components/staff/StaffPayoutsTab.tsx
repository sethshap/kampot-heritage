import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { makeApi } from "@/lib/api";
import type { PayoutLedger, User } from "@/types/index";
import { PayoutStatus } from "@/types/index";
import { bigintToNumber } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  CheckCircle,
  Download,
  RefreshCw,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  payouts: PayoutLedger[];
  champions: User[];
  api: ReturnType<typeof makeApi> | null;
}

const methodLabel: Record<string, string> = {
  cash: "Cash",
  bank_transfer: "Bank Transfer",
  wing: "Wing",
};

export function StaffPayoutsTab({ payouts, champions, api }: Props) {
  const qc = useQueryClient();
  const [cycleStart, setCycleStart] = useState("");
  const [cycleEnd, setCycleEnd] = useState("");

  const championMap = new Map(champions.map((c) => [String(c.id), c]));

  const generateMutation = useMutation({
    mutationFn: async () => {
      if (!api) throw new Error("Not connected");
      await api.generatePayoutLedger(cycleStart, cycleEnd);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingPayouts"] });
      toast.success("Payout ledger generated!");
    },
    onError: (e: Error) =>
      toast.error("Failed to generate ledger", { description: e.message }),
  });

  const markPaidMutation = useMutation({
    mutationFn: async (payoutId: bigint) => {
      if (!api) throw new Error("Not connected");
      await api.markPayoutProcessed(payoutId, BigInt(1));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingPayouts"] });
      toast.success("Payout marked as paid!");
    },
    onError: (e: Error) =>
      toast.error("Failed to mark paid", { description: e.message }),
  });

  function exportCsv() {
    const headers = [
      "Champion Name",
      "Phone",
      "Cycle Start",
      "Cycle End",
      "Total KHR",
      "Total USD",
      "Orders",
      "Method",
      "Status",
    ];
    const rows = payouts.map((p) => {
      const c = championMap.get(String(p.championId));
      return [
        c?.fullNameEn ?? String(p.championId),
        c?.phoneNumber ?? "",
        p.payoutCycleStart,
        p.payoutCycleEnd,
        bigintToNumber(p.totalCommissionKhr),
        p.totalCommissionUsd.toFixed(2),
        bigintToNumber(p.totalOrdersCount),
        methodLabel[p.payoutMethod] ?? p.payoutMethod,
        p.payoutStatus,
      ];
    });
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payouts-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported!");
  }

  const pending = payouts.filter(
    (p) => p.payoutStatus === PayoutStatus.pending,
  );
  const totalKhr = pending.reduce(
    (s, p) => s + bigintToNumber(p.totalCommissionKhr),
    0,
  );
  const totalUsd = pending.reduce((s, p) => s + p.totalCommissionUsd, 0);

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Generate Payout Ledger
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-2 flex-1 min-w-[140px]">
              <Label>Cycle Start</Label>
              <Input
                type="date"
                value={cycleStart}
                onChange={(e) => setCycleStart(e.target.value)}
                data-ocid="staff.payouts.cycle_start_input"
              />
            </div>
            <div className="space-y-2 flex-1 min-w-[140px]">
              <Label>Cycle End</Label>
              <Input
                type="date"
                value={cycleEnd}
                onChange={(e) => setCycleEnd(e.target.value)}
                data-ocid="staff.payouts.cycle_end_input"
              />
            </div>
            <Button
              type="button"
              disabled={!cycleStart || !cycleEnd || generateMutation.isPending}
              onClick={() => generateMutation.mutate()}
              className="gap-2"
              data-ocid="staff.payouts.generate_button"
            >
              <RefreshCw className="w-4 h-4" />
              {generateMutation.isPending ? "Generating…" : "Generate"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="bg-card border border-border rounded-lg px-4 py-3">
            <p className="text-xs text-muted-foreground">Pending Payouts</p>
            <p className="font-display font-bold text-xl text-foreground">
              {pending.length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg px-4 py-3">
            <p className="text-xs text-muted-foreground">Total Pending (KHR)</p>
            <p className="font-display font-bold text-xl text-primary">
              {totalKhr.toLocaleString()} ល
            </p>
            <p className="text-xs text-muted-foreground">
              (${totalUsd.toFixed(2)} USD)
            </p>
          </div>
        </div>
        {payouts.length > 0 && (
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={exportCsv}
            data-ocid="staff.payouts.export_button"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        )}
      </div>

      {pending.length === 0 ? (
        <div
          className="text-center py-16 bg-muted/20 rounded-xl border border-border"
          data-ocid="staff.payouts.empty_state"
        >
          <Wallet className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="font-semibold text-foreground">No pending payouts</p>
          <p className="text-sm text-muted-foreground mt-1">
            Generate a payout ledger to see results here.
          </p>
        </div>
      ) : (
        <Card className="border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="staff.payouts.table">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Champion
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Cycle
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                    Commission (KHR)
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                    Orders
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">
                    Method
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pending.map((payout, idx) => {
                  const champ = championMap.get(String(payout.championId));
                  return (
                    <tr
                      key={String(payout.id)}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid={`staff.payouts.item.${idx + 1}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {champ?.avatarUrl ? (
                            <img
                              src={champ.avatarUrl}
                              alt=""
                              loading="lazy"
                              className="w-7 h-7 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-display text-muted-foreground">
                              {champ?.fullNameEn.charAt(0) ?? "?"}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-foreground">
                              {champ?.fullNameEn ??
                                `#${String(payout.championId)}`}
                            </p>
                            {champ?.phoneNumber && (
                              <p className="text-xs text-muted-foreground">
                                {champ.phoneNumber}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        <p className="text-xs">{payout.payoutCycleStart}</p>
                        <p className="text-xs">→ {payout.payoutCycleEnd}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-semibold text-primary text-base">
                          {bigintToNumber(
                            payout.totalCommissionKhr,
                          ).toLocaleString()}{" "}
                          ល
                        </p>
                        <p className="text-xs text-muted-foreground">
                          (${payout.totalCommissionUsd.toFixed(2)})
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-foreground">
                        {bigintToNumber(payout.totalOrdersCount)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant="outline" className="text-xs">
                          {methodLabel[payout.payoutMethod] ??
                            payout.payoutMethod}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          type="button"
                          size="sm"
                          className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 text-xs"
                          disabled={markPaidMutation.isPending}
                          onClick={() => markPaidMutation.mutate(payout.id)}
                          data-ocid={`staff.payouts.mark_paid_button.${idx + 1}`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Mark Paid
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
