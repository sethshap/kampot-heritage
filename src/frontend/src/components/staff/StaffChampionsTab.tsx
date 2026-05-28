import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { makeApi } from "@/lib/api";
import type { User, UserUpdateInput } from "@/types/index";
import type { PreferredLanguage } from "@/types/index";
import { bigintToNumber } from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Package, Phone, QrCode, RefreshCw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Props {
  champions: User[];
  api: ReturnType<typeof makeApi> | null;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function StaffChampionsTab({ champions, api }: Props) {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [regenConfirm, setRegenConfirm] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBioEn, setEditBioEn] = useState("");
  const [editLang, setEditLang] = useState<string>("en");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return champions.filter(
      (c) =>
        c.fullNameEn.toLowerCase().includes(q) ||
        c.phoneNumber.includes(q) ||
        (c.physicalQrCodeId ?? "").toLowerCase().includes(q) ||
        (c.personalReferralCode ?? "").toLowerCase().includes(q),
    );
  }, [champions, search]);

  const { data: codes = [] } = useQuery({
    queryKey: ["championCodes", selected?.id],
    queryFn: () => api!.getChampionCodes(selected!.id),
    enabled: !!api && !!selected,
  });

  const updateMutation = useMutation({
    mutationFn: async (input: UserUpdateInput) => {
      if (!api || !selected) throw new Error("Not connected");
      await api.updateUser(selected.id, input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["approvedChampions"] });
      toast.success("Champion updated!");
      setEditMode(false);
    },
    onError: (e: Error) =>
      toast.error("Update failed", { description: e.message }),
  });

  const regenMutation = useMutation({
    mutationFn: async () => {
      if (!api || !selected) throw new Error("Not connected");
      return api.regenerateChampionQR(selected.id);
    },
    onSuccess: (newQrId: string) => {
      qc.invalidateQueries({ queryKey: ["approvedChampions"] });
      qc.invalidateQueries({ queryKey: ["championCodes", selected?.id] });
      toast.success("QR Code regenerated!", {
        description: `New ID: ${newQrId}`,
      });
      setRegenConfirm(false);
    },
    onError: (e: Error) =>
      toast.error("Regeneration failed", { description: e.message }),
  });

  function openEdit(c: User) {
    setEditName(c.fullNameEn);
    setEditBioEn(c.bioEn ?? "");
    setEditLang(c.preferredLanguage);
    setEditMode(true);
  }

  if (champions.length === 0) {
    return (
      <div
        className="text-center py-20"
        data-ocid="staff.champions.empty_state"
      >
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground">No approved champions yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search by name, phone, QR code, or referral code…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="staff.champions.search_input"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} champion{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className="grid gap-3" data-ocid="staff.champions.list">
        {filtered.map((champion, idx) => (
          <Card
            key={String(champion.id)}
            className="border-border cursor-pointer hover:border-primary/40 transition-colors"
            onClick={() => {
              setSelected(champion);
              setEditMode(false);
              setRegenConfirm(false);
            }}
            data-ocid={`staff.champions.item.${idx + 1}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {champion.avatarUrl ? (
                  <img
                    src={champion.avatarUrl}
                    alt=""
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover border border-border flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0 border border-border">
                    <span className="font-display text-muted-foreground font-semibold">
                      {champion.fullNameEn.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {champion.fullNameEn}
                    </span>
                    {champion.fullNameKm && (
                      <span className="text-sm text-muted-foreground">
                        {champion.fullNameKm}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {champion.phoneNumber}
                    </span>
                    {champion.personalReferralCode && (
                      <Badge variant="secondary" className="text-xs">
                        {champion.personalReferralCode}
                      </Badge>
                    )}
                    {champion.physicalQrCodeId && (
                      <span className="flex items-center gap-1">
                        <QrCode className="w-3 h-3" />
                        {champion.physicalQrCodeId}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-xs text-muted-foreground">
                    Inventory held
                  </p>
                  <p className="font-semibold text-foreground">
                    {bigintToNumber(champion.consignmentInventoryHeld)} units
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail / Edit Dialog */}
      <Dialog
        open={!!selected}
        onOpenChange={(o) => {
          if (!o) {
            setSelected(null);
            setEditMode(false);
            setRegenConfirm(false);
          }
        }}
      >
        <DialogContent
          className="max-w-xl max-h-[90vh] overflow-y-auto"
          data-ocid="staff.champion_detail.dialog"
        >
          {selected && !editMode && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">
                  Champion Details
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  {selected.avatarUrl ? (
                    <img
                      src={selected.avatarUrl}
                      alt=""
                      loading="lazy"
                      className="w-16 h-16 rounded-full object-cover border-2 border-border"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                      <span className="text-2xl font-display text-muted-foreground">
                        {selected.fullNameEn.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      {selected.fullNameEn}
                    </h3>
                    {selected.fullNameKm && (
                      <p className="text-muted-foreground">
                        {selected.fullNameKm}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Phone className="w-3.5 h-3.5" />
                      {selected.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/40 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      Target Monthly Income
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {bigintToNumber(
                        selected.targetMonthlyIncomeKhr,
                      ).toLocaleString()}{" "}
                      ល
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (${bigintToNumber(selected.targetMonthlyIncomeUsd)} USD)
                    </p>
                  </div>
                  <div className="bg-muted/40 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      Inventory Held
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {bigintToNumber(selected.consignmentInventoryHeld)} units
                    </p>
                  </div>
                  {selected.approvedAt && (
                    <div className="bg-muted/40 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Approved</p>
                      <p className="font-semibold text-foreground text-sm">
                        {formatDate(selected.approvedAt)}
                      </p>
                    </div>
                  )}
                  <div className="bg-muted/40 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Language</p>
                    <p className="font-semibold text-foreground text-sm uppercase">
                      {selected.preferredLanguage}
                    </p>
                  </div>
                </div>

                {selected.bioEn && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Story
                    </p>
                    <p className="text-sm text-foreground leading-relaxed bg-muted/30 rounded-md p-3">
                      {selected.bioEn}
                    </p>
                  </div>
                )}

                {codes.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Champion Codes
                    </p>
                    {codes.map((code) => (
                      <div
                        key={String(code.id)}
                        className="bg-muted/30 rounded-lg p-3 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Referral Code
                          </span>
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            {code.referralCode}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            QR Code ID
                          </span>
                          <span className="font-mono text-xs text-foreground">
                            {code.qrCodeId}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            Hotel orders via QR:{" "}
                            <strong>
                              {bigintToNumber(code.timesUsedForHotelOrders)}
                            </strong>
                          </span>
                          <span>
                            Referrals:{" "}
                            <strong>
                              {bigintToNumber(
                                code.timesUsedForChampionReferrals,
                              )}
                            </strong>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!regenConfirm ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5 w-full"
                    onClick={() => setRegenConfirm(true)}
                    data-ocid="staff.champion_detail.regen_qr_button"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate QR Code
                  </Button>
                ) : (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 space-y-3">
                    <p className="text-sm text-destructive font-medium">
                      ⚠ This will invalidate the current QR code. Are you sure?
                    </p>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setRegenConfirm(false)}
                        data-ocid="staff.regen_qr.cancel_button"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        disabled={regenMutation.isPending}
                        onClick={() => regenMutation.mutate()}
                        data-ocid="staff.regen_qr.confirm_button"
                      >
                        {regenMutation.isPending
                          ? "Regenerating…"
                          : "Yes, Regenerate"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelected(null)}
                  data-ocid="staff.champion_detail.close_button"
                >
                  Close
                </Button>
                <Button
                  type="button"
                  className="gap-1.5"
                  onClick={() => openEdit(selected)}
                  data-ocid="staff.champion_detail.edit_button"
                >
                  <Edit className="w-4 h-4" />
                  Edit Champion
                </Button>
              </DialogFooter>
            </>
          )}

          {selected && editMode && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">
                  Edit Champion — {selected.fullNameEn}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name (English) *</Label>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    data-ocid="staff.edit_champion.name_input"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Story (English)</Label>
                  <Textarea
                    rows={3}
                    value={editBioEn}
                    onChange={(e) => setEditBioEn(e.target.value)}
                    data-ocid="staff.edit_champion.bio_input"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Preferred Language</Label>
                  <Select value={editLang} onValueChange={setEditLang}>
                    <SelectTrigger data-ocid="staff.edit_champion.lang_select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="km">ភាសាខ្មែរ</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditMode(false)}
                  data-ocid="staff.edit_champion.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={updateMutation.isPending || !editName.trim()}
                  onClick={() =>
                    updateMutation.mutate({
                      fullNameEn: editName,
                      bioEn: editBioEn || undefined,
                      preferredLanguage: editLang as PreferredLanguage,
                    })
                  }
                  data-ocid="staff.edit_champion.save_button"
                >
                  {updateMutation.isPending ? "Saving…" : "Save Changes"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
