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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { makeApi } from "@/lib/api";
import type { ApproveChampionInput, User } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  CheckCircle,
  Clock,
  Phone,
  QrCode,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  pending: User[];
  api: ReturnType<typeof makeApi> | null;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function StaffPendingTab({ pending, api }: Props) {
  const qc = useQueryClient();
  const [approveTarget, setApproveTarget] = useState<User | null>(null);
  const [rejectTarget, setRejectTarget] = useState<User | null>(null);
  const [notesEn, setNotesEn] = useState("");
  const [notesKm, setNotesKm] = useState("");
  const [notesFr, setNotesFr] = useState("");
  const [qrImageUrl, setQrImageUrl] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [expandedId, setExpandedId] = useState<bigint | null>(null);

  const approveMutation = useMutation({
    mutationFn: async ({
      userId,
      input,
    }: { userId: bigint; input: ApproveChampionInput }) => {
      if (!api) throw new Error("Not connected");
      await api.approveChampion(userId, input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingChampions"] });
      qc.invalidateQueries({ queryKey: ["approvedChampions"] });
      toast.success("Champion approved!", {
        description: "QR and referral codes have been generated.",
      });
      setApproveTarget(null);
      setNotesEn("");
      setNotesKm("");
      setNotesFr("");
      setQrImageUrl("");
    },
    onError: (e: Error) =>
      toast.error("Approval failed", { description: e.message }),
  });

  const rejectMutation = useMutation({
    mutationFn: async ({
      userId,
      reason,
    }: { userId: bigint; reason: string }) => {
      if (!api) throw new Error("Not connected");
      await api.rejectChampion(userId, reason);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingChampions"] });
      toast.success("Application rejected");
      setRejectTarget(null);
      setRejectReason("");
    },
    onError: (e: Error) =>
      toast.error("Rejection failed", { description: e.message }),
  });

  if (pending.length === 0) {
    return (
      <div className="text-center py-20" data-ocid="staff.pending.empty_state">
        <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4 opacity-60" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          All caught up!
        </h3>
        <p className="text-muted-foreground text-sm">
          No pending champion applications to review.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="staff.pending.list">
      <p className="text-sm text-muted-foreground">
        {pending.length} application{pending.length !== 1 ? "s" : ""} awaiting
        review
      </p>

      {pending.map((champion, idx) => (
        <Card
          key={String(champion.id)}
          className="border-border"
          data-ocid={`staff.pending.item.${idx + 1}`}
        >
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {champion.avatarUrl ? (
                  <img
                    src={champion.avatarUrl}
                    alt={champion.fullNameEn}
                    loading="lazy"
                    className="w-14 h-14 rounded-full object-cover border-2 border-border"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                    <span className="text-xl font-display text-muted-foreground">
                      {champion.fullNameEn.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground font-display">
                    {champion.fullNameEn}
                  </h3>
                  {champion.fullNameKm && (
                    <span className="text-sm text-muted-foreground">
                      {champion.fullNameKm}
                    </span>
                  )}
                  <Badge
                    variant="outline"
                    className="text-xs border-amber-500 text-amber-600"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {champion.phoneNumber}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Applied {formatDate(champion.createdAt)}
                  </span>
                  {champion.referredByCode && (
                    <Badge variant="secondary" className="text-xs">
                      Ref: {champion.referredByCode}
                    </Badge>
                  )}
                </div>

                {champion.bioEn && (
                  <div className="mt-2">
                    <button
                      type="button"
                      className="text-xs text-primary hover:underline"
                      onClick={() =>
                        setExpandedId(
                          expandedId === champion.id ? null : champion.id,
                        )
                      }
                      data-ocid={`staff.pending.expand_bio.${idx + 1}`}
                    >
                      {expandedId === champion.id
                        ? "Hide story \u25b2"
                        : "Read story \u25bc"}
                    </button>
                    {expandedId === champion.id ? (
                      <p className="mt-2 text-sm text-foreground bg-muted/40 rounded-md p-3 leading-relaxed">
                        {champion.bioEn}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {champion.bioEn}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 flex flex-col gap-2">
                <Button
                  type="button"
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
                  onClick={() => setApproveTarget(champion)}
                  data-ocid={`staff.pending.approve_button.${idx + 1}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="gap-1.5"
                  onClick={() => setRejectTarget(champion)}
                  data-ocid={`staff.pending.reject_button.${idx + 1}`}
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Approve Dialog */}
      <Dialog
        open={!!approveTarget}
        onOpenChange={(o) => !o && setApproveTarget(null)}
      >
        <DialogContent className="max-w-lg" data-ocid="staff.approve.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">Approve Champion</DialogTitle>
          </DialogHeader>
          {approveTarget && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg">
                {approveTarget.avatarUrl ? (
                  <img
                    src={approveTarget.avatarUrl}
                    alt=""
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="font-display text-muted-foreground">
                      {approveTarget.fullNameEn.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {approveTarget.fullNameEn}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {approveTarget.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <QrCode className="w-4 h-4" />
                  QR Code Image URL (optional)
                </Label>
                <Input
                  placeholder="https://... or leave blank to auto-generate"
                  value={qrImageUrl}
                  onChange={(e) => setQrImageUrl(e.target.value)}
                  data-ocid="staff.approve.qr_input"
                />
                <p className="text-xs text-muted-foreground">
                  A QR code ID will be auto-generated on approval.
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Staff Notes</Label>
                <Tabs defaultValue="en">
                  <TabsList className="h-8">
                    <TabsTrigger value="en" className="text-xs h-6">
                      English
                    </TabsTrigger>
                    <TabsTrigger value="km" className="text-xs h-6">
                      ខ្មែរ
                    </TabsTrigger>
                    <TabsTrigger value="fr" className="text-xs h-6">
                      Français
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="en">
                    <Textarea
                      rows={2}
                      placeholder="Notes in English..."
                      value={notesEn}
                      onChange={(e) => setNotesEn(e.target.value)}
                      data-ocid="staff.approve.notes_en"
                    />
                  </TabsContent>
                  <TabsContent value="km">
                    <Textarea
                      rows={2}
                      placeholder="ចំណាំជាភាសាខ្មែរ..."
                      value={notesKm}
                      onChange={(e) => setNotesKm(e.target.value)}
                      data-ocid="staff.approve.notes_km"
                    />
                  </TabsContent>
                  <TabsContent value="fr">
                    <Textarea
                      rows={2}
                      placeholder="Notes en français..."
                      value={notesFr}
                      onChange={(e) => setNotesFr(e.target.value)}
                      data-ocid="staff.approve.notes_fr"
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setApproveTarget(null)}
              data-ocid="staff.approve.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={approveMutation.isPending}
              onClick={() => {
                if (!approveTarget) return;
                const input: ApproveChampionInput = {
                  ...(notesEn && { notesEn }),
                  ...(notesKm && { notesKm }),
                  ...(notesFr && { notesFr }),
                  ...(qrImageUrl && { qrCodeImageUrl: qrImageUrl }),
                };
                approveMutation.mutate({ userId: approveTarget.id, input });
              }}
              data-ocid="staff.approve.confirm_button"
            >
              {approveMutation.isPending ? "Approving…" : "Confirm Approval"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog
        open={!!rejectTarget}
        onOpenChange={(o) => !o && setRejectTarget(null)}
      >
        <DialogContent className="max-w-md" data-ocid="staff.reject.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-destructive">
              Reject Application
            </DialogTitle>
          </DialogHeader>
          {rejectTarget && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You are about to reject{" "}
                <span className="font-semibold text-foreground">
                  {rejectTarget.fullNameEn}
                </span>
                's application.
              </p>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Reason for rejection
                </Label>
                <Textarea
                  rows={3}
                  placeholder="Provide a reason (optional)..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  data-ocid="staff.reject.reason_input"
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setRejectTarget(null)}
              data-ocid="staff.reject.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={rejectMutation.isPending}
              onClick={() => {
                if (!rejectTarget) return;
                rejectMutation.mutate({
                  userId: rejectTarget.id,
                  reason: rejectReason,
                });
              }}
              data-ocid="staff.reject.confirm_button"
            >
              {rejectMutation.isPending ? "Rejecting…" : "Confirm Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
