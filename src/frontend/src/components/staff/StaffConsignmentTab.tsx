import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { makeApi } from "@/lib/api";
import type { ConsignmentCheckout, Product, User } from "@/types/index";
import { bigintToNumber, formatKhr } from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRightLeft, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  champions: User[];
  products: Product[];
  api: ReturnType<typeof makeApi> | null;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const statusConfig: Record<string, { label: string; className: string }> = {
  out: { label: "Out", className: "border-amber-500 text-amber-600" },
  returned: { label: "Returned", className: "border-accent text-accent" },
  sold: { label: "Sold", className: "border-primary text-primary" },
};

export function StaffConsignmentTab({ champions, products, api }: Props) {
  const qc = useQueryClient();
  const [viewChampId, setViewChampId] = useState<string>("");
  const [checkoutChampId, setCheckoutChampId] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");

  const viewId = viewChampId ? BigInt(viewChampId) : null;

  const { data: history = [], isLoading: histLoading } = useQuery<
    ConsignmentCheckout[]
  >({
    queryKey: ["consignment", viewId],
    queryFn: () => api!.getConsignmentByChampion(viewId!),
    enabled: !!api && !!viewId,
  });

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!api) throw new Error("Not connected");
      await api.checkoutConsignment({
        championId: BigInt(checkoutChampId),
        productId: BigInt(productId),
        quantity: BigInt(quantity),
        staffId: BigInt(1),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["consignment"] });
      qc.invalidateQueries({ queryKey: ["approvedChampions"] });
      toast.success("Consignment checked out!");
      setCheckoutChampId("");
      setProductId("");
      setQuantity("1");
    },
    onError: (e: Error) =>
      toast.error("Checkout failed", { description: e.message }),
  });

  const selectedProduct = products.find((p) => String(p.id) === productId);
  const selectedChampion = champions.find(
    (c) => String(c.id) === checkoutChampId,
  );
  const canCheckout =
    !!checkoutChampId && !!productId && Number.parseInt(quantity) > 0;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-primary" />
            Check Out Consignment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Champion</Label>
            <Select value={checkoutChampId} onValueChange={setCheckoutChampId}>
              <SelectTrigger data-ocid="staff.consignment.champion_select">
                <SelectValue placeholder="Select a champion…" />
              </SelectTrigger>
              <SelectContent>
                {champions.map((c) => (
                  <SelectItem key={String(c.id)} value={String(c.id)}>
                    {c.fullNameEn} — {c.phoneNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Product</Label>
            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger data-ocid="staff.consignment.product_select">
                <SelectValue placeholder="Select a product…" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={String(p.id)} value={String(p.id)}>
                    {p.nameEn} —{" "}
                    {formatKhr(bigintToNumber(p.wholesalePriceKhr))}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quantity</Label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              data-ocid="staff.consignment.quantity_input"
            />
          </div>

          {selectedChampion && selectedProduct && (
            <div className="bg-muted/40 rounded-lg p-3 space-y-1 text-sm">
              <p className="font-medium text-foreground">Checkout Summary</p>
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">
                  {selectedChampion.fullNameEn}
                </span>
                {" gets "}
                <span className="text-foreground font-medium">
                  {quantity}x {selectedProduct.nameEn}
                </span>
              </p>
              <p className="text-muted-foreground">
                Wholesale value:{" "}
                <span className="text-foreground">
                  {formatKhr(
                    bigintToNumber(selectedProduct.wholesalePriceKhr) *
                      Number.parseInt(quantity || "0"),
                  )}
                </span>
              </p>
            </div>
          )}

          <Button
            type="button"
            className="w-full"
            disabled={!canCheckout || checkoutMutation.isPending}
            onClick={() => checkoutMutation.mutate()}
            data-ocid="staff.consignment.submit_button"
          >
            {checkoutMutation.isPending
              ? "Processing…"
              : "Check Out Consignment"}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Consignment History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>View history for champion</Label>
            <Select value={viewChampId} onValueChange={setViewChampId}>
              <SelectTrigger data-ocid="staff.consignment.history_select">
                <SelectValue placeholder="Select champion…" />
              </SelectTrigger>
              <SelectContent>
                {champions.map((c) => (
                  <SelectItem key={String(c.id)} value={String(c.id)}>
                    {c.fullNameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {histLoading && (
            <div
              className="space-y-2"
              data-ocid="staff.consignment.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 bg-muted animate-pulse rounded-md"
                />
              ))}
            </div>
          )}

          {!histLoading && viewId && history.length === 0 && (
            <div
              className="text-center py-8"
              data-ocid="staff.consignment.empty_state"
            >
              <Package className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">
                No consignment history.
              </p>
            </div>
          )}

          {!histLoading && history.length > 0 && (
            <div
              className="space-y-2"
              data-ocid="staff.consignment.history_list"
            >
              {history.map((item, idx) => {
                const cfg = statusConfig[item.status] ?? {
                  label: item.status,
                  className: "",
                };
                return (
                  <div
                    key={String(item.id)}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                    data-ocid={`staff.consignment.item.${idx + 1}`}
                  >
                    <Package className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        Product #{String(item.productId)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {bigintToNumber(item.quantity)} units ·{" "}
                        {formatDate(item.checkedOutAt)}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${cfg.className}`}
                    >
                      {cfg.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
